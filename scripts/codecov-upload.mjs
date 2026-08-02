import fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import https from 'node:https';
import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

function resolveSlug() {
  // Azure Pipelines exposes the full owner/repo slug for GitHub repos.
  const buildRepo = process.env.BUILD_REPOSITORY_NAME;
  if (buildRepo && buildRepo.includes('/')) {
    process.stdout.write(`Using slug from BUILD_REPOSITORY_NAME: ${buildRepo}\n`);
    return buildRepo;
  }

  // Fall back to parsing the git remote.
  return undefined;
}

async function resolveSlugFromGit() {
  try {
    const { stdout } = await execFileAsync('git', ['config', '--get', 'remote.origin.url']);
    const remote = stdout.trim();
    const match = remote.match(/[:\/]([^/]+\/[^/]+?)(?:\.git)?$/);
    if (match) {
      const slug = match[1];
      process.stdout.write(`Using slug from git remote: ${slug}\n`);
      return slug;
    }
  } catch {
    // ignore
  }
  return undefined;
}

const token = process.env.CODECOV_API_KEY || process.env.CODECOV_TOKEN;
if (!token) {
  process.stderr.write('Missing CODECOV_API_KEY / CODECOV_TOKEN\n');
  process.exit(1);
}

const file = process.env.CODECOV_FILE || 'coverage/datariomj/clover.xml';

const platform = os.platform();
const arch = os.arch();

/**
 * Reuse a Codecov CLI that's already on PATH (e.g. preinstalled in the
 * self-hosted agent image). Falls back to downloading the latest binary when
 * nothing is available.
 */
async function resolveCodecovBinary() {
  const searchCommands = platform === 'win32' ? [['where', 'codecov']] : [['which', 'codecov']];

  for (const [cmd, arg] of searchCommands) {
    try {
      const { stdout } = await execFileAsync(cmd, [arg]);
      const candidate = stdout.split('\n')[0].trim();
      if (candidate) {
        process.stdout.write(`Using preinstalled Codecov CLI: ${candidate}\n`);
        return candidate;
      }
    } catch {
      // Not found via this lookup – keep trying / fall through to download.
    }
  }

  process.stdout.write('No preinstalled Codecov CLI found; downloading...\n');

  let codecovPlatform = platform === 'darwin' ? 'macos' : platform === 'win32' ? 'windows' : 'linux';
  if ((platform === 'darwin' || platform === 'linux') && arch === 'arm64') {
    codecovPlatform = `${codecovPlatform}-arm64`;
  }

  const url = `https://cli.codecov.io/latest/${codecovPlatform}/codecov`;
  const binDir = path.join(process.cwd(), '.codecov');
  const binPath = path.join(binDir, platform === 'win32' ? 'codecov.exe' : 'codecov');

  await fs.mkdir(binDir, { recursive: true });

  await new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (!res.statusCode || res.statusCode >= 300) {
        reject(new Error(`Failed to download Codecov CLI (${res.statusCode})`));
        return;
      }
      const fileStream = createWriteStream(binPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });

  if (platform !== 'win32') {
    await fs.chmod(binPath, 0o755);
  }

  return binPath;
}

const binPath = await resolveCodecovBinary();
const slug = resolveSlug() || await resolveSlugFromGit();

try {
  await fs.access(path.resolve(process.cwd(), file));
} catch {
  process.stderr.write(`Coverage file not found: ${file}\n`);
  process.exit(1);
}

await new Promise((resolve, reject) => {
  const args = [
    'upload-process',
    '--disable-search',
    '-t',
    token,
    '-f',
    file,
    '--fail-on-error',
  ];

  if (slug) {
    args.push('--slug', slug);
  }

  const child = spawn(
    binPath,
    args,
    { stdio: 'inherit' },
  );
  child.on('exit', (code) => {
    if (code === 0) resolve();
    else reject(new Error(`Codecov upload failed (${code})`));
  });
  child.on('error', reject);
});

import fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import https from 'node:https';
import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const token = process.env.CODECOV_TOKEN || process.env.CODECOV_API_KEY;
if (!token) {
  process.stderr.write('Missing CODECOV_TOKEN / CODECOV_API_KEY\n');
  process.exit(1);
}

const file = process.env.CODECOV_FILE || 'coverage/datariomj/clover.xml';
const resolvedFile = path.resolve(process.cwd(), file);

function resolveSlug() {
  const buildRepo = process.env.BUILD_REPOSITORY_NAME;
  if (buildRepo && buildRepo.includes('/')) {
    process.stdout.write(`Using slug from BUILD_REPOSITORY_NAME: ${buildRepo}\n`);
    return buildRepo;
  }
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

/**
 * Return possible Codecov CLI platform names for this OS/arch, ordered from
 * most to least likely. This makes the script resilient when Codecov changes
 * URL naming (e.g. "macos" vs "macos-x86_64").
 */
function getCodecovPlatforms() {
  const platform = os.platform();
  const arch = os.arch();

  if (platform === 'linux') {
    return arch === 'arm64' ? ['linux-arm64', 'linux'] : ['linux'];
  }

  if (platform === 'darwin') {
    if (arch === 'arm64') {
      return ['macos-arm64', 'macos'];
    }
    return ['macos', 'macos-x86_64', 'macosx'];
  }

  if (platform === 'win32') {
    return ['windows', 'windows-x86_64'];
  }

  return ['linux'];
}

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function resolveCodecovBinary() {
  // 1. Prefer a preinstalled binary on PATH (e.g. agent image).
  const lookup = platform === 'win32' ? ['where', 'codecov'] : ['which', 'codecov'];
  try {
    const { stdout } = await execFileAsync(lookup[0], [lookup[1]]);
    const candidate = stdout.split('\n')[0].trim();
    if (candidate) {
      process.stdout.write(`Using preinstalled Codecov CLI: ${candidate}\n`);
      return candidate;
    }
  } catch {
    // fall through to download
  }

  // 2. Download the correct binary for this platform.
  const platforms = getCodecovPlatforms();
  let chosenUrl;
  for (const platformName of platforms) {
    const url = `https://cli.codecov.io/latest/${platformName}/codecov`;
    process.stdout.write(`Checking ${url}...\n`);
    if (await checkUrl(url)) {
      chosenUrl = url;
      break;
    }
  }

  if (!chosenUrl) {
    throw new Error(`Could not find a Codecov CLI download for platforms: ${platforms.join(', ')}`);
  }

  process.stdout.write(`Downloading Codecov CLI from ${chosenUrl}\n`);

  const binDir = path.join(process.cwd(), '.codecov');
  const binPath = path.join(binDir, os.platform() === 'win32' ? 'codecov.exe' : 'codecov');
  await fs.mkdir(binDir, { recursive: true });

  await new Promise((resolve, reject) => {
    https.get(chosenUrl, (res) => {
      if (!res.statusCode || res.statusCode >= 300) {
        reject(new Error(`Failed to download Codecov CLI (${res.statusCode})`));
        return;
      }
      const fileStream = createWriteStream(binPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close(resolve));
      fileStream.on('error', reject);
    }).on('error', reject);
  });

  if (os.platform() !== 'win32') {
    await fs.chmod(binPath, 0o755);
  }

  return binPath;
}

const platform = os.platform();
const binPath = await resolveCodecovBinary();
const slug = resolveSlug() || await resolveSlugFromGit();

process.stdout.write(`Working directory: ${process.cwd()}\n`);
process.stdout.write(`Looking for coverage file: ${resolvedFile}\n`);

let coverageFile = resolvedFile;
try {
  await fs.access(resolvedFile);
} catch {
  // Try a few common fallback paths relative to cwd.
  const fallbacks = [
    'coverage/datariomj/clover.xml',
    'coverage/datariomj/lcov.info',
    'coverage/lcov.info',
    'coverage/clover.xml',
  ];
  let found = false;
  for (const fallback of fallbacks) {
    const fallbackPath = path.resolve(process.cwd(), fallback);
    try {
      await fs.access(fallbackPath);
      coverageFile = fallbackPath;
      process.stdout.write(`Found fallback coverage file: ${fallbackPath}\n`);
      found = true;
      break;
    } catch {
      // continue
    }
  }

  if (!found) {
    process.stderr.write(`Coverage file not found: ${file}\n`);
    process.stderr.write(`Tried: ${[resolvedFile, ...fallbacks.map((f) => path.resolve(process.cwd(), f))].join('\n      ')}\n`);
    try {
      const coverageDir = path.join(process.cwd(), 'coverage');
      const entries = await fs.readdir(coverageDir, { withFileTypes: true, recursive: true });
      process.stderr.write(`\nContents of ${coverageDir}:\n`);
      for (const entry of entries) {
        const relativePath = path.relative(coverageDir, path.join(entry.parentPath, entry.name));
        process.stderr.write(`  ${relativePath}\n`);
      }
    } catch {
      process.stderr.write(`\nCould not list coverage directory.\n`);
    }
    process.exit(1);
  }
}

await new Promise((resolve, reject) => {
  const args = [
    'upload-process',
    '--disable-search',
    '-t',
    token,
    '-f',
    coverageFile,
    '--git-service',
    'github',
    '--fail-on-error',
  ];

  if (slug) {
    args.push('--slug', slug);
  }

  if (process.env.CODECOV_VERBOSE) {
    args.push('--verbose');
  }

  const child = spawn(binPath, args, { stdio: 'inherit' });
  child.on('exit', (code) => {
    if (code === 0) {
      resolve();
    } else {
      let message = `Codecov upload failed (${code})`;
      if (code === 1) {
        message += `\n\nCommon causes for "Repository not found":\n`;
        message += `- CODECOV_TOKEN is an API token instead of a repository upload token.\n`;
        message += `- The token does not belong to ${slug || 'this repository'}.\n`;
        message += `- The repository is not activated in Codecov.\n`;
        message += `Get a new upload token at https://app.codecov.io/gh/${slug || 'OWNER/REPO'}/settings`;
      }
      reject(new Error(message));
    }
  });
  child.on('error', reject);
});

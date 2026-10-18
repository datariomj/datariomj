import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function resolveGitCliff() {
  const localBin = path.join(projectRoot, 'node_modules', '.bin', 'git-cliff');
  if (process.platform === 'win32') {
    return localBin + '.cmd';
  }
  return localBin;
}

const gitCliffPath = resolveGitCliff();

let version;
try {
  version = execFileSync(gitCliffPath, ['--bumped-version'], {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
    .trim()
    .split('\n')
    .pop()
    .trim();
} catch (error) {
  process.stderr.write(`Failed to resolve version from git-cliff: ${error.message}\n`);
  process.exit(1);
}

if (!version) {
  process.stderr.write('git-cliff did not return a version\n');
  process.exit(1);
}

const generatedDir = path.join(projectRoot, 'generated');
const versionFile = path.join(generatedDir, 'version.txt');

await fs.mkdir(generatedDir, { recursive: true });
await fs.writeFile(versionFile, version, 'utf8');

process.stdout.write(`App version: ${version}\n`);

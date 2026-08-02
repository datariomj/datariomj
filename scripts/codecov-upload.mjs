import fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import https from 'node:https';
import { spawn } from 'node:child_process';

const token = process.env.CODECOV_API_KEY || process.env.CODECOV_TOKEN;
if (!token) {
  process.stderr.write('Missing CODECOV_API_KEY / CODECOV_TOKEN\n');
  process.exit(1);
}

const file = process.env.CODECOV_FILE || 'coverage/datariomj/clover.xml';

const platform = os.platform();
const arch = os.arch();

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

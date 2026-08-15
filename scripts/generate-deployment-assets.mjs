import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const environmentsDir = path.join(projectRoot, 'src/environments');
const outputRoot = path.join(projectRoot, 'generated');

const environments = {
  production: {
    baseUrl: 'https://datariomj.dev',
    robotsDirective: 'Allow: /',
    sourceFile: 'environment.prod.ts',
  },
  staging: {
    baseUrl: 'https://staging.datariomj.dev',
    robotsDirective: 'Disallow: /',
    sourceFile: 'environment.ts',
  },
};

const alwaysIncludedPaths = ['', 'terms', 'privacy'];

function getPriority(routePath) {
  if (routePath === '') return '1.0';
  if (['privacy', 'terms'].includes(routePath)) return '0.3';
  return '0.5';
}

function generateSitemapXml(baseUrl, routes) {
  const urls = routes
    .map((route) => {
      const loc = route === '' ? baseUrl : `${baseUrl}/${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <priority>${getPriority(route)}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function generateRobotsTxt(directive, sitemapUrl) {
  return `User-agent: *\n\n${directive}\n\nSitemap: ${sitemapUrl}\n`;
}

async function extractNavigationPaths(filePath) {
  const content = await fs.readFile(filePath, 'utf8');

  const navigationMatch = content.match(/navigation\s*:\s*\[([\s\S]*?)\]\s*as\s+NavigationLink\[\]/);
  if (!navigationMatch) {
    throw new Error(`Could not find navigation array in ${filePath}`);
  }

  const navigationBlock = navigationMatch[1];

  const routePaths = [];
  const pathRegex = /path\s*:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = pathRegex.exec(navigationBlock)) !== null) {
    routePaths.push(match[1].replace(/^\//, ''));
  }

  return routePaths;
}

async function writeAssets(environmentName) {
  const config = environments[environmentName];
  if (!config) {
    throw new Error(`Unknown environment: ${environmentName}`);
  }

  const outputDir = path.join(outputRoot, environmentName);
  await fs.mkdir(outputDir, { recursive: true });

  const sitemapUrl = `${config.baseUrl}/sitemap.xml`;

  await fs.writeFile(
    path.join(outputDir, 'robots.txt'),
    generateRobotsTxt(config.robotsDirective, sitemapUrl),
    'utf8',
  );

  const navigationPaths = await extractNavigationPaths(path.join(environmentsDir, config.sourceFile));
  const routes = [...alwaysIncludedPaths, ...navigationPaths];
  await fs.writeFile(
    path.join(outputDir, 'sitemap.xml'),
    generateSitemapXml(config.baseUrl, routes),
    'utf8',
  );

  process.stdout.write(`Generated deployment assets for ${environmentName}\n`);
}

await Promise.all([
  writeAssets('production'),
  writeAssets('staging'),
]);

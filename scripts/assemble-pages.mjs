#!/usr/bin/env node
/**
 * Assemble GitHub Pages output:
 *   /           → redirect to /calara/docs/
 *   /docs/      → VitePress site
 *   /showcase/  → interactive demo
 */
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = resolve(root, 'pages-dist');

rmSync(pages, { recursive: true, force: true });
mkdirSync(resolve(pages, 'docs'), { recursive: true });
mkdirSync(resolve(pages, 'showcase'), { recursive: true });

cpSync(resolve(root, 'docs-dist'), resolve(pages, 'docs'), { recursive: true });
cpSync(resolve(root, 'showcase-dist'), resolve(pages, 'showcase'), { recursive: true });

const logo = resolve(root, 'docs/public/logo.svg');
const favicon = resolve(root, 'docs/public/favicon.svg');
const robots = resolve(root, 'docs/public/robots.txt');
if (existsSync(logo)) cpSync(logo, resolve(pages, 'logo.svg'));
if (existsSync(favicon)) cpSync(favicon, resolve(pages, 'favicon.svg'));
if (existsSync(robots)) cpSync(robots, resolve(pages, 'robots.txt'));

writeFileSync(
  resolve(pages, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://persianstudio.github.io/calara/docs/</loc></url>
  <url><loc>https://persianstudio.github.io/calara/showcase/</loc></url>
</urlset>
`,
);

writeFileSync(
  resolve(pages, 'index.html'),
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>calara — React calendar docs</title>
    <meta name="description" content="calara documentation and live showcase. Zero-dependency React calendar &amp; date picker." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://persianstudio.github.io/calara/docs/" />
    <meta http-equiv="refresh" content="0; url=/calara/docs/" />
    <script>location.replace('/calara/docs/');</script>
  </head>
  <body>
    <p>Redirecting to <a href="/calara/docs/">calara documentation</a>…</p>
    <p><a href="/calara/showcase/">Open live showcase</a></p>
  </body>
</html>
`,
);

console.log('Assembled pages-dist/ (docs + showcase + root redirect)');

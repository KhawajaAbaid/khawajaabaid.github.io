import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { gzipSync } from "node:zlib";

const root = "dist";
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}
const files = walk(root);
const fail = [];
const html = files.filter((path) => path.endsWith(".html"));
const origin = "https://khawajaabaid.github.io";
const required = [
  "index.html",
  "research/index.html",
  "research/ads-c/index.html",
  "research/fontus/index.html",
  "publications/index.html",
  "projects/index.html",
  "about/index.html",
  "404.html",
  "cv.pdf",
  "og/default.png",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "robots.txt",
];
for (const path of required)
  if (!existsSync(join(root, path))) fail.push(`Missing ${path}`);
const forbidden = [
  /CONFIDENTIAL_CANARY_[A-Z_]+/i,
  /private-canary/i,
  /anonymous.review.manuscript/i,
  /3D\s*(?:→|&rarr;|to|[-–])\s*2D/i,
  /lazy.agent.failure.mode/i,
];
for (const path of files) {
  if (
    /\.(?:md|zip|map|ts)$/.test(path) ||
    /website-revamp-spec|old_work_in_progress|random_stuff/.test(path)
  )
    fail.push(`Source file shipped: ${path}`);
  const text = readFileSync(path).toString("utf8");
  for (const pattern of forbidden)
    if (pattern.test(text) || pattern.test(path))
      fail.push(`Excluded material found: ${path} (${pattern})`);
}
const decode = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"');
function outputPath(pathname) {
  return join(
    root,
    decodeURIComponent(pathname),
    pathname.endsWith("/") ? "index.html" : "",
  );
}
const titles = new Set();
for (const file of html) {
  const source = readFileSync(file, "utf8");
  const relative = file.slice(root.length);
  const route = relative.replace(/index\.html$/, "");
  const base = new URL(route, origin);
  const title = source.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title || titles.has(title))
    fail.push(`Missing/duplicate title: ${file}`);
  titles.add(title);
  if ((source.match(/<h1(?:\s|>)/g) || []).length !== 1)
    fail.push(`Expected one h1: ${file}`);
  for (const marker of [
    'name="description"',
    'rel="canonical"',
    'property="og:image"',
    'id="main-content"',
    "Skip to content",
  ])
    if (!source.includes(marker)) fail.push(`Missing ${marker}: ${file}`);
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = decode(match[1]);
    if (/^(mailto:|data:)/.test(value)) continue;
    const url = new URL(value, base);
    if (url.origin !== origin) continue;
    const path = outputPath(url.pathname);
    if (!existsSync(path) || statSync(path).isDirectory()) {
      fail.push(`Broken link ${value} in ${file}`);
      continue;
    }
    if (url.hash && extname(path) === ".html") {
      const target = readFileSync(path, "utf8");
      const id = decodeURIComponent(url.hash.slice(1));
      if (!target.includes(`id="${id}"`))
        fail.push(`Broken fragment ${value} in ${file}`);
    }
  }
  for (const script of source.matchAll(/<script[^>]*src="([^"]+)"/g))
    if (/^https?:/.test(script[1])) fail.push(`Third-party JS: ${file}`);
}
const sitemap = readFileSync(join(root, "sitemap-0.xml"), "utf8");
if (/404|private|draft/.test(sitemap)) fail.push("Excluded URL in sitemap");
for (const url of sitemap.matchAll(/<loc>(.*?)<\/loc>/g))
  if (!existsSync(outputPath(new URL(url[1]).pathname)))
    fail.push(`Sitemap target missing: ${url[1]}`);
for (const path of ["cv.pdf", "data/Web-Resume-KhawajaAbaidUllah.pdf"])
  if (readFileSync(join(root, path)).subarray(0, 5).toString() !== "%PDF-")
    fail.push(`Invalid PDF: ${path}`);
const js = files.filter((path) => path.endsWith(".js"));
const homeHTML = readFileSync(join(root, "index.html"), "utf8");
const inlineJS = [...homeHTML.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
  .filter((match) => !match[1].includes("application/ld+json"))
  .map((match) => match[2])
  .join("\n");
const compressedJS =
  js.reduce((sum, path) => sum + gzipSync(readFileSync(path)).length, 0) +
  gzipSync(inlineJS).length;
if (compressedJS > 30 * 1024)
  fail.push(`JS budget exceeded: ${compressedJS} bytes gzipped`);
if (fail.length) throw new Error(fail.join("\n"));
console.log(
  `Verified ${html.length} pages: local links, anchors, metadata, sitemap, CV, excluded content, and assets. JS: ${compressedJS} bytes gzipped.`,
);

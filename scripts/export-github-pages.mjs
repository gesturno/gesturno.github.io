import assert from "node:assert/strict";
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(projectRoot, "dist", "client");
const outputDir = path.join(projectRoot, "github-pages");
const workerUrl = pathToFileURL(path.join(projectRoot, "dist", "server", "index.js"));

await mkdir(outputDir, { recursive: true });
for (const entry of await readdir(clientDir)) {
  await cp(path.join(clientDir, entry), path.join(outputDir, entry), { recursive: true, force: true });
}

async function render(pathname) {
  const url = new URL(workerUrl);
  url.searchParams.set("export", `${pathname}-${Date.now()}`);
  const { default: worker } = await import(url.href);
  const response = await worker.fetch(
    new Request(`https://gesturno.eu${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, `Could not render ${pathname}`);
  return response.text();
}

const routes = [
  ["/", "index.html"],
  ["/guide", "guide/index.html"],
  ["/privacy", "privacy/index.html"],
  ["/terms", "terms/index.html"],
  ["/data-deletion", "data-deletion/index.html"],
  ...["es", "en", "ca", "de", "eu", "fr", "gl", "it", "pt"].flatMap((lang) => [
    [`/${lang}`, `${lang}/index.html`],
    [`/${lang}/guide`, `${lang}/guide/index.html`],
    ...["guardia-civil", "policia", "sanitarios", "turnos"].map((profession) => [`/${lang}/${profession}`, `${lang}/${profession}/index.html`]),
  ]),
];

for (const [route, relativeFile] of routes) {
  const destination = path.join(outputDir, relativeFile);
  await mkdir(path.dirname(destination), { recursive: true });
  let html = await render(route);
  if (route === "/") {
    html = html.replace(/<head>/i, '<head><meta name="google-site-verification" content="JLunHgAzGgExBldn1HR2rDUBuvFRs5YSvKKvM--JJvs" />');
  }
  await writeFile(destination, html, "utf8");
}

const sitemapEntries = routes.map(([route]) => {
  const canonicalRoute = route === "/" ? "/" : `${route}/`;
  return `  <url><loc>https://gesturno.eu${canonicalRoute}</loc><changefreq>${route === "/" || /^\/(?:[a-z]{2})\/?$/.test(route) ? "weekly" : "monthly"}</changefreq><priority>${route === "/" ? "1.0" : route.includes("/") && route.split("/").length === 3 ? "0.8" : "0.9"}</priority></url>`;
}).join("\n");
await writeFile(path.join(outputDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`, "utf8");

await writeFile(path.join(outputDir, ".nojekyll"), "# Disable Jekyll processing\n", "utf8");

const home = await readFile(path.join(outputDir, "index.html"), "utf8");
assert.match(home, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.gesturno\.app/i);
assert.match(home, /Descargar en Google Play/i);
assert.match(home, /\/_next\/static\/css\//i);
assert.doesNotMatch(home, /localhost/i);

const robots = await readFile(path.join(outputDir, "robots.txt"), "utf8");
assert.match(robots, /Sitemap: https:\/\/gesturno\.eu\/sitemap\.xml/i);

const sitemap = await readFile(path.join(outputDir, "sitemap.xml"), "utf8");
for (const [route] of routes) {
  const canonicalRoute = route === "/" ? "/" : `${route}/`;
  assert.match(sitemap, new RegExp(`https://gesturno\\.eu${canonicalRoute.replaceAll("/", "\\/")}`));
}

console.log(`GitHub Pages export ready: ${outputDir}`);

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
async function render(pathname) {
  const url = new URL(workerUrl);
  url.searchParams.set("test", `${pathname}-${Date.now()}`);
  const { default: worker } = await import(url.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

for (const [file, target] of [["privacy.html", "/privacy/"], ["terms.html", "/terms/"], ["data-deletion.html", "/data-deletion/"]]) {
  test(`${file} redirects to the canonical directory route`, async () => {
    const html = await readFile(new URL(`../public/${file}`, import.meta.url), "utf8");
    assert.match(html, new RegExp(`url=${target.replaceAll("/", "\\/")}`));
    assert.match(html, new RegExp(`href=\\"${target.replaceAll("/", "\\/")}\\"`));
  });
}

test("static SEO files expose the public site structure", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(robots, /Sitemap: https:\/\/gesturno\.github\.io\/sitemap\.xml/i);
  for (const path of ["/", "/guide/", "/privacy/", "/terms/", "/data-deletion/"]) {
    assert.match(sitemap, new RegExp(`https://gesturno\\.github\\.io${path.replaceAll("/", "\\/")}`));
  }
});

for (const [path, expected] of [["/", "GesTurno"], ["/guide", "Instrucciones completas"], ["/privacy", "Política de privacidad"], ["/terms", "Condiciones de uso"], ["/data-deletion", "Eliminación de datos"]]) {
  test(`renders ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(expected, "i"));
    assert.match(html, /gesturnoapk@gmail\.com/i);
    assert.doesNotMatch(html, /Your site is taking shape/i);
  });
}

test("home presents the app and links directly to Google Play", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /Descargar en Google Play/i);
  assert.match(html, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.gesturno\.app/i);
  assert.match(html, /Lleva tu cuadrante siempre contigo/i);
  assert.match(html, /Grupos de cuadrantes/i);
  assert.match(html, /Identificador de llamadas/i);
});

const path = require("node:path");
const { createRequire } = require("node:module");
const qaRequire = createRequire(
  path.join(process.env.QA_PACKAGE_DIR || process.cwd(), "package.json"),
);
const { chromium, firefox, webkit } = qaRequire("playwright");
const { default: AxeBuilder } = qaRequire("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("fs");
const origin = process.env.QA_URL || "http://127.0.0.1:4322";
fs.mkdirSync("artifacts", { recursive: true });
const routes = [
  "/",
  "/research/",
  "/research/ads-c/",
  "/research/fontus/",
  "/publications/",
  "/projects/",
  "/about/",
  "/404.html",
];
(async () => {
  const results = [];
  for (const engine of [chromium, firefox, webkit]) {
    const browser = await engine.launch();
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      colorScheme: "light",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    for (const route of routes) {
      const response = await page.goto(origin + route);
      assert.ok(response.status() < 400 || route === "/404.html");
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1);
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((i) =>
          i.complete
            ? Promise.resolve()
            : new Promise((resolve, reject) => {
                i.onload = resolve;
                i.onerror = reject;
              }),
        );
        assert.ok(await img.evaluate((i) => i.naturalWidth > 0));
      }
      if (engine === chromium) {
        const axe = await new AxeBuilder({ page }).analyze();
        assert.deepEqual(
          axe.violations.map((v) => v.id),
          [],
          `axe ${route}`,
        );
      }
      for (const width of [1440, 1280, 1024, 768, 430, 390, 360]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          true,
          `${engine.name()} overflow ${route} ${width}`,
        );
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(origin);
    assert.equal(await page.locator(".metric-value").textContent(), "−29.6 pp");
    assert.equal(await page.locator(".direction .number").count(), 3);
    await page.keyboard.press(engine === webkit ? "Alt+Tab" : "Tab");
    assert.equal(await page.locator(":focus").textContent(), "Skip to content");
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator(":focus").getAttribute("id"),
      "main-content",
    );
    await page.getByRole("button", { name: "Use dark theme" }).click();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.reload();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    if (engine === chromium) {
      await page.screenshot({
        path: "artifacts/home-dark-desktop.png",
        fullPage: true,
      });
      assert.deepEqual(
        (await new AxeBuilder({ page }).analyze()).violations.map((v) => v.id),
        [],
      );
    }
    await page.getByRole("button", { name: "Use light theme" }).click();
    await page.setViewportSize({ width: 390, height: 844 });
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.focus();
    await page.keyboard.press("Enter");
    assert.equal(await menu.getAttribute("aria-expanded"), "true");
    assert.equal(
      await page.getByRole("navigation", { name: "Primary" }).isVisible(),
      true,
    );
    await page.keyboard.press(engine === webkit ? "Alt+Tab" : "Tab");
    assert.equal(await page.locator(":focus").textContent(), "Research");
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-expanded"), "false");
    assert.equal(
      await page.locator(":focus").textContent(),
      await menu.textContent(),
    );
    await page.goto(origin + "/publications/");
    const bib = page.locator("summary").first();
    await bib.focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("details").first().getAttribute("open"),
      "",
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("details").first().getAttribute("open"),
      null,
    );
    await page.goto(origin);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator(".accent-path")
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    await page.emulateMedia({ media: "print" });
    assert.equal(
      await page
        .locator("body")
        .evaluate((e) => getComputedStyle(e).backgroundColor),
      "rgb(255, 255, 255)",
    );
    assert.equal(await page.locator(".site-header").isVisible(), false);
    await page.emulateMedia({ media: "screen" });
    await page.evaluate(() => (document.documentElement.style.zoom = "2"));
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      true,
    );
    await page.evaluate(() => (document.documentElement.style.zoom = ""));
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
      colorScheme: "dark",
    });
    const plain = await nojs.newPage();
    await plain.goto(origin);
    assert.equal(
      await plain.getByRole("navigation", { name: "Primary" }).isVisible(),
      true,
    );
    assert.equal(
      await plain.getByRole("button", { name: "Menu" }).isVisible(),
      false,
    );
    assert.equal(
      await plain
        .locator("body")
        .evaluate((e) => getComputedStyle(e).backgroundColor),
      "rgb(17, 17, 15)",
    );
    await nojs.close();
    const system = await browser.newContext({ colorScheme: "dark" });
    const sys = await system.newPage();
    await sys.goto(origin);
    assert.equal(
      await sys.getByRole("button", { name: "Use light theme" }).isVisible(),
      true,
    );
    await sys.emulateMedia({ colorScheme: "light" });
    await sys.getByRole("button", { name: "Use dark theme" }).waitFor();
    assert.equal(
      await sys.getByRole("button", { name: "Use dark theme" }).isVisible(),
      true,
    );
    await system.close();
    if (engine === chromium) {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(origin);
      await page.screenshot({
        path: "artifacts/home-desktop.png",
        fullPage: true,
      });
      await page.screenshot({ path: "artifacts/home-viewport.png" });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({
        path: "artifacts/home-mobile.png",
        fullPage: true,
      });
      await page.screenshot({ path: "artifacts/mobile-viewport.png" });
      await menu.click();
      await page.screenshot({ path: "artifacts/mobile-menu.png" });
      await page.goto(origin + "/research/ads-c/");
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.screenshot({
        path: "artifacts/ads-c-desktop.png",
        fullPage: true,
      });
    }
    assert.deepEqual(errors, [], `${engine.name()} console errors`);
    results.push({
      browser: engine.name(),
      routes: routes.length,
      widths: 7,
      checks:
        "overflow, images, console, keyboard, menu Escape, BibTeX, theme persistence/system, reduced motion, print, 200% zoom, no-JS",
      passed: true,
    });
    await browser.close();
    console.log(results.at(-1));
  }
  fs.writeFileSync(
    "artifacts/browser-qa.json",
    JSON.stringify(results, null, 2),
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

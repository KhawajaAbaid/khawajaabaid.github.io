// Run against the production build: QA_PACKAGE_DIR=/path/to/qa/deps node scripts/browser-qa.cjs
const path = require("node:path");
const { createRequire } = require("node:module");
const qaRequire = createRequire(
  path.join(process.env.QA_PACKAGE_DIR || process.cwd(), "package.json"),
);
const playwright = qaRequire("playwright");
const { default: AxeBuilder } = qaRequire("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const origin = process.env.QA_URL || "http://127.0.0.1:4322";
const engines = (process.env.QA_BROWSERS || "chromium").split(",");
const routes = [
  "/",
  "/research/",
  "/research/coordination/",
  "/research/ads-c/",
  "/research/fontus/",
  "/publications/",
  "/projects/",
  "/about/",
  "/404.html",
];
fs.mkdirSync("artifacts", { recursive: true });
(async () => {
  const results = [];
  for (const name of engines) {
    const browser = await playwright[name].launch(
      name === "chromium" ? { channel: "chrome" } : {},
    );
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const checkOverflow = async (route, width) => {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 800 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${name} overflow ${route}, ${width}px`,
      );
    };
    for (const route of routes) {
      const response = await page.goto(origin + route);
      assert.ok(response.status() < 400 || route === "/404.html", route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, route);
      const navName = route === "/" ? "Study Room Bookcase" : "Primary";
      assert.ok(await page.getByRole("navigation", { name: navName, exact: true }).isVisible());
      for (const scheme of ["light", "dark"]) {
        await page.evaluate((value) => {
          document.documentElement.dataset.theme = value;
          document.querySelector('meta[name="color-scheme"]').content = value;
        }, scheme);
        for (const width of [1440, 1280, 1024, 768, 430, 390, 360])
          await checkOverflow(route, width);
        for (const width of [1280, 390]) {
          await checkOverflow(route, width);
          const axe = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          assert.deepEqual(
            axe.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => n.target),
            })),
            [],
            `axe ${name} ${route} ${scheme} ${width}`,
          );
          if (
            route === "/" ||
            route === "/research/" ||
            route === "/projects/"
          ) {
            await page.screenshot({
              path: `artifacts/${name}-${route === "/" ? "home" : route.split("/")[1]}-${scheme}-${width}.png`,
              fullPage: true,
            });
          }
        }
      }
    }
    await page.goto(origin);
    await page.setViewportSize({ width: 1280, height: 800 });
    // Preserve the live site's room-first landing layout and existing tabs.
    assert.equal(await page.locator(".site-header").count(), 0);
    assert.ok(await page.locator(".study-hero").evaluate((el) => el.firstElementChild.matches(".study-room-stage")));
    const scene = await page.locator(".study-room-stage").boundingBox();
    const consoleBox = await page.locator(".desk-blotter-console").boundingBox();
    assert.ok(scene && consoleBox && Math.abs(scene.width - consoleBox.width) < 1);
    assert.ok(consoleBox.y >= scene.y + scene.height - 1);
    assert.equal(await page.getByRole("tab").count(), 4);
    for (const selector of ['.blotter-footer a[href="/cv.pdf"]', '.blotter-footer a[href^="https://github.com/"]', '.blotter-footer a[href^="mailto:"]'])
      assert.ok(await page.locator(selector).isVisible());
    // Keyboard skip link, illustrated hotspots and the original four-tab controls.
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").textContent(), "Skip to content");
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator(":focus").getAttribute("id"),
      "main-content",
    );
    const portrait = page.locator('[data-room-hotspot="fulbright"]');
    await portrait.focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#tab-fulbright").getAttribute("aria-selected"), "true");
    assert.ok(await page.locator("#panel-fulbright").isVisible());
    await page.locator("#tab-fulbright").focus();
    await page.keyboard.press("ArrowRight");
    assert.equal(await page.locator("#tab-aws").getAttribute("aria-selected"), "true");
    await page.keyboard.press("End");
    assert.equal(await page.locator("#tab-kaslab").getAttribute("aria-selected"), "true");
    await page.keyboard.press("Home");
    assert.ok(await page.locator("h1").isVisible());
    const lamp = page.locator("[data-lamp-toggle]");
    await lamp.click();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.reload();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.locator("[data-lamp-toggle]").click();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.getByRole("button", { name: "Pause motion" }).click();
    assert.equal(
      await page
        .locator("[data-study-scene]")
        .getAttribute("data-study-paused"),
      "",
    );
    await page.getByRole("button", { name: "Play motion" }).click();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() =>
      document
        .querySelector("[data-study-scene]")
        ?.hasAttribute("data-study-paused"),
    );
    assert.equal(
      await page
        .locator("[data-study-scene]")
        .getAttribute("data-study-paused"),
      "",
    );
    assert.equal(await page.locator(".motion-toggle").isVisible(), false);
    const before = await page
      .locator("[data-sar-uav-relay]")
      .getAttribute("transform");
    await page.waitForTimeout(100);
    assert.equal(
      await page.locator("[data-sar-uav-relay]").getAttribute("transform"),
      before,
    );
    await page.goto(origin + "/publications/");
    const bib = page.locator(".citation-details summary").first();
    await bib.focus();
    await page.keyboard.press("Enter");
    assert.ok(
      await page
        .locator(".citation-details")
        .first()
        .evaluate((el) => el.open),
    );
    await page.goto(origin + "/projects/");
    const archive = page.locator("details summary");
    await archive.focus();
    await page.keyboard.press("Enter");
    assert.ok(await page.locator("details").evaluate((el) => el.open));
    await page.goto(origin);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => (document.documentElement.style.zoom = "2"));
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "200% zoom overflow",
    );
    await page.evaluate(() => (document.documentElement.style.zoom = ""));
    await page.emulateMedia({ media: "print" });
    assert.equal(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(255, 255, 255)",
    );
    assert.equal(await page.locator(".site-header").isVisible(), false);
    assert.ok(await page.locator("h1").isVisible());
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
      colorScheme: "dark",
    });
    const plain = await nojs.newPage();
    await plain.goto(origin);
    assert.ok(await plain.locator("h1").isVisible());
    assert.ok(
      await plain
        .getByRole("navigation", { name: "Study Room Bookcase", exact: true })
        .isVisible(),
    );
    assert.ok(
      await plain.locator('.blotter-footer a[href="/cv.pdf"]').isVisible(),
    );
    assert.equal(
      await plain
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(24, 25, 36)",
    );
    await nojs.close();
    const system = await browser.newContext({ colorScheme: "dark", reducedMotion: "reduce" });
    const sys = await system.newPage();
    await sys.goto(origin);
    assert.equal(await sys.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor), "rgb(24, 25, 36)");
    await sys.emulateMedia({ colorScheme: "light" });
    await sys.waitForFunction(() => getComputedStyle(document.body).backgroundColor === "rgb(244, 241, 222)");
    assert.equal(await sys.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor), "rgb(244, 241, 222)");
    await system.close();
    assert.deepEqual(errors, [], `${name} console errors`);
    results.push({
      browser: name,
      routes: routes.length,
      widths: 7,
      themes: 2,
      passed: true,
      checks:
        "WCAG A/AA axe desktop/mobile, overflow, room-first landing layout, keyboard, room tabs/hotspots, theme persistence/system, reduced motion, motion pause, BibTeX, archive, print, 200% zoom, no-JS, console",
    });
    await browser.close();
    console.log(results.at(-1));
  }
  fs.writeFileSync(
    "artifacts/browser-qa.json",
    JSON.stringify(results, null, 2),
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

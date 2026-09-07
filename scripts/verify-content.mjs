// Synthetic fixtures only. Never add real confidential manuscript content to this repository.
import { writeFileSync, rmSync, existsSync } from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
const files = [];
function fixture(path, data, body = "") {
  if (existsSync(path)) throw new Error(`Refusing to overwrite ${path}`);
  writeFileSync(path, `---\n${JSON.stringify(data, null, 2)}\n---\n${body}`);
  files.push(path);
}
function build() {
  execFileSync(
    process.execPath,
    ["node_modules/astro/bin/astro.mjs", "build"],
    { stdio: "pipe" },
  );
}
const common = {
  title: "CONFIDENTIAL_CANARY_TITLE",
  summary: "CONFIDENTIAL_CANARY_SUMMARY",
  date: "2026-01-01",
  authors: ["CONFIDENTIAL_CANARY_AUTHOR"],
  status: "under-review",
  tags: ["CONFIDENTIAL_CANARY_TAG"],
  selected: true,
  links: [{ label: "Private", href: "https://example.com/private-canary" }],
};
try {
  const asset = "src/assets/research/private-canary.svg";
  if (existsSync(asset)) throw new Error("Fixture asset already exists");
  writeFileSync(
    asset,
    '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><text>CONFIDENTIAL_CANARY_IMAGE</text></svg>',
  );
  files.push(asset);
  for (const collection of ["research", "publications", "projects", "news"]) {
    for (const visibility of [
      { public: false, draft: false },
      { public: true, draft: true },
    ]) {
      const data = {
        ...common,
        ...visibility,
        category: collection === "projects" ? "engineering" : "Private",
        text: "CONFIDENTIAL_CANARY_NEWS",
      };
      if (collection !== "news") {
        data.image = "../../assets/research/private-canary.svg";
        data.imageAlt = "CONFIDENTIAL_CANARY_ALT";
      }
      fixture(
        `src/content/${collection}/private-canary-${visibility.public}.md`,
        data,
        "CONFIDENTIAL_CANARY_BODY",
      );
    }
  }
  build();
  execFileSync(process.execPath, ["scripts/verify-output.mjs"], {
    stdio: "inherit",
  });
  console.log(
    "Private and draft canaries excluded from all production output.",
  );
  const transitionPath = "src/content/research/private-canary-false.md";
  const transition = {
    ...common,
    category: "Test",
    public: true,
    draft: false,
    image: "../../assets/research/private-canary.svg",
    imageAlt: "CONFIDENTIAL_CANARY_ALT",
  };
  writeFileSync(
    transitionPath,
    `---\n${JSON.stringify(transition)}\n---\nCONFIDENTIAL_CANARY_BODY`,
  );
  build();
  transition.public = false;
  writeFileSync(
    transitionPath,
    `---\n${JSON.stringify(transition)}\n---\nCONFIDENTIAL_CANARY_BODY`,
  );
  build();
  execFileSync(process.execPath, ["scripts/verify-output.mjs"], {
    stdio: "inherit",
  });
  console.log(
    "Previously public text, routes, and images disappear when visibility is revoked.",
  );
  fixture("src/content/publications/invalid-canary.md", {
    ...common,
    public: true,
    draft: false,
    authors: [],
    date: "not-a-date",
  });
  const invalid = spawnSync(
    process.execPath,
    ["node_modules/astro/bin/astro.mjs", "build"],
    { encoding: "utf8" },
  );
  if (
    invalid.status === 0 ||
    !/InvalidContentEntryDataError|does not match|invalid/i.test(
      invalid.stdout + invalid.stderr,
    )
  )
    throw new Error("Invalid metadata did not fail validation");
  console.log("Invalid author/date metadata correctly fails the build.");
} finally {
  for (const path of files) rmSync(path, { force: true });
  build();
  execFileSync(process.execPath, ["scripts/verify-output.mjs"], {
    stdio: "inherit",
  });
}

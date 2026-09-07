import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse } from "yaml";
import type { Loader } from "astro/loaders";

/** Gate before rendering/schema image processing: a page-level filter is too late for assets. */
export function publicContentLoader(base: string): Loader {
  return {
    name: "public-markdown-loader",
    async load(context) {
      const root = fileURLToPath(context.config.root);
      const directory = fileURLToPath(new URL(base, context.config.root));
      const idFor = (file: string) =>
        relative(directory, file).split(sep).join("/").replace(/\.md$/, "");
      async function sync(file: string) {
        const id = idFor(file);
        const source = await readFile(file, "utf8");
        const match = source.match(
          /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/,
        );
        if (!match)
          throw new Error(`Missing YAML frontmatter: ${relative(root, file)}`);
        const frontmatter = parse(match[1]);
        if (
          !frontmatter ||
          typeof frontmatter !== "object" ||
          Array.isArray(frontmatter)
        )
          throw new Error(`Invalid frontmatter: ${relative(root, file)}`);
        for (const key of ["public", "draft"]) {
          if (key in frontmatter && typeof frontmatter[key] !== "boolean")
            throw new Error(
              `${key} must be a boolean: ${relative(root, file)}`,
            );
        }
        // Fail closed. Nonpublic files never enter Astro's render or asset pipeline.
        if (frontmatter.public !== true || frontmatter.draft !== false) {
          context.store.delete(id);
          return;
        }
        const data = await context.parseData({
          id,
          data: frontmatter,
          filePath: file,
        });
        if (!context.renderMarkdown)
          throw new Error("Markdown rendering is unavailable");
        const body = match[2];
        const rendered = await context.renderMarkdown(body, {
          fileURL: pathToFileURL(file),
        });
        context.store.set({
          id,
          data,
          body,
          filePath: relative(root, file),
          digest: context.generateDigest(source),
          rendered,
          assetImports: rendered.metadata?.imagePaths,
        });
      }
      async function walk(dir: string): Promise<string[]> {
        const entries = await readdir(dir, { withFileTypes: true });
        const nested = await Promise.all(
          entries.map((entry) =>
            entry.isDirectory()
              ? walk(join(dir, entry.name))
              : entry.name.endsWith(".md")
                ? [join(dir, entry.name)]
                : [],
          ),
        );
        return nested.flat();
      }
      // Rebuild the store so a previously public entry cannot survive a visibility change.
      context.store.clear();
      for (const file of await walk(directory)) await sync(file);
      if (context.watcher) {
        context.watcher.add(directory);
        const belongs = (file: string) =>
          file.startsWith(directory + sep) && file.endsWith(".md");
        const update = async (file: string) => {
          if (!belongs(file)) return;
          try {
            await sync(file);
          } catch (error) {
            context.store.delete(idFor(file));
            context.logger.error(
              error instanceof Error ? error.message : String(error),
            );
          }
        };
        context.watcher
          .on("add", update)
          .on("change", update)
          .on("unlink", (file) => {
            if (belongs(file)) context.store.delete(idFor(file));
          });
      }
    },
  };
}

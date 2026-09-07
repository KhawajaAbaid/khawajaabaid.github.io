import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { publicContentLoader } from "./lib/public-content-loader";

const link = z.string().refine((value) => {
  if (/^\/(?!\/)/.test(value)) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}, "Links must be site-relative or HTTPS URLs");
const links = z
  .array(z.object({ label: z.string().min(1), href: link }))
  .default([]);
const visibility = {
  public: z.boolean().default(false),
  draft: z.boolean().default(true),
  selected: z.boolean().default(false),
};
const metric = z
  .object({
    value: z.string(),
    label: z.string(),
    context: z.string().optional(),
  })
  .optional();
const common = {
  title: z.string().min(1),
  summary: z.string().min(1),
  ...visibility,
  date: z.coerce.date(),
  authors: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string()).default([]),
  links,
  metric,
  status: z.string().min(1),
  venue: z.string().optional(),
  order: z.number().default(99),
};
const publications = defineCollection({
  loader: publicContentLoader("./src/content/publications"),
  schema: ({ image }) =>
    z
      .object({
        ...common,
        image: image().optional(),
        imageAlt: z.string().optional(),
        bibtex: z.string().optional(),
        arxiv: z
          .string()
          .regex(/^\d{4}\.\d{4,5}$/)
          .optional(),
        pdf: z.url().optional(),
      })
      .refine((d) => !d.image || !!d.imageAlt, "Images require alt text"),
});
const research = defineCollection({
  loader: publicContentLoader("./src/content/research"),
  schema: ({ image }) =>
    z
      .object({
        ...common,
        shortTitle: z.string().optional(),
        category: z.string(),
        image: image().optional(),
        imageAlt: z.string().optional(),
        figureCaption: z.string().optional(),
        relatedPublications: z.array(z.string()).default([]),
      })
      .refine((d) => !d.image || !!d.imageAlt, "Images require alt text"),
});
const projects = defineCollection({
  loader: publicContentLoader("./src/content/projects"),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        ...visibility,
        category: z.enum(["research-system", "engineering", "archive"]),
        tags: z.array(z.string()).default([]),
        links,
        order: z.number().default(99),
        image: image().optional(),
        imageAlt: z.string().optional(),
      })
      .refine((d) => !d.image || !!d.imageAlt, "Images require alt text"),
});
const news = defineCollection({
  loader: publicContentLoader("./src/content/news"),
  schema: z.object({
    ...visibility,
    date: z.coerce.date(),
    text: z.string().min(1),
    href: link.optional(),
  }),
});
export const collections = { publications, research, projects, news };

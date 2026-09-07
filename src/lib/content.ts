import { getCollection, type CollectionKey } from "astro:content";
// Every page and route generator uses this gate. Drafts remain excluded in dev too.
export async function publicEntries<C extends CollectionKey>(collection: C) {
  return getCollection(
    collection,
    ({ data }) => data.public === true && data.draft === false,
  );
}
export const byDate = (
  a: { data: { date: Date } },
  b: { data: { date: Date } },
) => b.data.date.valueOf() - a.data.date.valueOf();
export const byOrder = (
  a: { data: { order: number } },
  b: { data: { order: number } },
) => a.data.order - b.data.order;
export const monthYear = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

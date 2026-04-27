import type { APIRoute } from "astro";
import { registryEntries } from "../../../../registry/entries";
import {
  toRegistrySummary,
  type RegistryCategory,
  type RegistryIndex,
} from "../../../../lib/registry-types";

export const prerender = true;

export const GET: APIRoute = () => {
  const summaries = registryEntries.map(toRegistrySummary);

  const counts: Record<RegistryCategory, number> = {
    theme: 0,
    plugin: 0,
    model: 0,
  };
  for (const e of registryEntries) {
    counts[e.category]++;
  }

  const payload: RegistryIndex = {
    generatedAt: new Date().toISOString(),
    schemaVersion: 1,
    entries: summaries,
    counts,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=86400",
    },
  });
};

import type { APIRoute, GetStaticPaths } from "astro";
import { registryEntries } from "../../../../../registry/entries";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = () =>
  registryEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as (typeof registryEntries)[number];

  return new Response(JSON.stringify(entry, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=86400",
    },
  });
};

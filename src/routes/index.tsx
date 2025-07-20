import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect, url }) => {
  if (url.pathname === "/" || url.pathname === "")
    throw redirect(308, new URL("/blog/", url).toString());
};

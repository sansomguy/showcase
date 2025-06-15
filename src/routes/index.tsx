import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect, url }) => {
  console.log("Firing onGET");
  throw redirect(308, new URL("/blog/", url).toString());
};

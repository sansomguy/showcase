import { Resource } from "sst";
import type { RequestHandler } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik";

export const onGet: RequestHandler = async ({ redirect, url }) => {
  if (isDev) {
    // In development, redirect to the blog using the local URL
    redirect(308, new URL("/blog/", url).toString());
    return;
  }

  redirect(308, new URL("/blog/", Resource.showcaseRouter.url).toString());
};

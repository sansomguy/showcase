import type { RequestHandler } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase-client";
import type { DBBlogPost } from "~/utils/db/blog";
import { NotionUtils } from "~/utils/notion";

export const onPost: RequestHandler = async (event) => {
  const { json, env } = event;
  try {
    const notionUtils = new NotionUtils({ env });
    const pageIds = await notionUtils.getProjectsPosts();

    const pages = (
      await Promise.all(
        pageIds.map(async (page) => await notionUtils.getPage(page))
      )
    ).map(
      ([info, markdown]) =>
        ({
          ...info,
          category: info.category as DBBlogPost["category"],
          series: info.series as DBBlogPost["series"],
          status: info.status as DBBlogPost["status"],
          content: markdown,
        }) satisfies DBBlogPost
    );

    const client = createSupabaseClient(event);
    await client.from("notion_pages").upsert(pages).throwOnError();

    json(200, pages);
  } catch (e: any) {
    json(500, { error: e });
  }
};

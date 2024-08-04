import type { RequestHandler } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase-client";
import { NotionUtils } from "~/utils/notion";

export const onPost: RequestHandler = async (event) => {
  const { json, env } = event;
  try {
    const notionUtils = new NotionUtils({ env });
    const pageIds = await notionUtils.getProjectsPosts();

    const pages = await Promise.all(
      pageIds.map((page) => notionUtils.getNotionPageInfo(page))
    );

    const client = createSupabaseClient(event);
    await client.from("notion_pages").upsert(pages).throwOnError();

    json(200, pages);
  } catch (e: any) {
    json(500, { error: e });
  }
};

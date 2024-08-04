import type { RequestHandler } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase-client";
import { NotionUtils } from "~/utils/notion";

export const onPost: RequestHandler = async (event) => {
  const { json, env } = event;
  try {
    const notionUtils = new NotionUtils({ env });
    const pages = await notionUtils.getProjectsPosts();

    const pagesInfo = await Promise.all(
      pages.map((page) => notionUtils.getNotionPageInfo(page))
    );

    const formattedPages = pagesInfo.map((page: any) => {
      return {
        title: page.properties.Name.title
          .filter((t: any) => t.type === "text")
          .find((t: any) => t.text?.content)?.text?.content as string,
        id: page.id,
      } as const;
    });

    const client = createSupabaseClient(event);
    await client.from("notion_pages").upsert(formattedPages).throwOnError();

    json(200, formattedPages);
  } catch (e: any) {
    json(500, { error: e });
  }
};

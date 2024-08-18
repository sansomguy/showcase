import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { Client as NotionClient } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export type NotionPageList = Array<{
  id: string;
  title: string;
  summary: string;
  last_edited: string;
  created: string;
  status: "LIVE" | "DRAFT" | null;
  category: "Projects" | "Thoughts" | null;
}>;

export async function NotionUtils(context: { env: EnvGetter }) {
  const env = context.env;
  const notionClient = new NotionClient({
    auth: context.env.get("NOTION_API_KEY"),
  });

  const notionToMarkdown: NotionToMarkdown = new NotionToMarkdown({
    notionClient,
  });

  async function getProjectsPosts(): Promise<string[]> {
    const databaseResponse = await notionClient.databases.query({
      database_id: env.get("NOTION_BLOG_DATABASE")!,
      filter_properties: ["title"],
    });

    const pages = databaseResponse.results.map((page) => page.id);

    return pages;
  }

  async function getPage(pageId: string) {
    return await Promise.all([
      getNotionPageInfo(pageId),
      getPageAsMarkdown(pageId),
    ]);
  }

  async function getPageAsMarkdown(pageId: string) {
    const mdBlocks = await notionToMarkdown.pageToMarkdown(pageId);
    const markdownStr = notionToMarkdown.toMarkdownString(mdBlocks);
    return markdownStr.parent;
  }

  async function getNotionPageInfo(pageId: string) {
    const page = await notionClient.pages.retrieve({
      page_id: pageId,
    });

    const typedPage = page as unknown as {
      last_edited_time: string;
      created_time: string;
      properties: {
        Name: { title: Array<{ type: "text"; text: { content: string } }> };
        Summary: {
          id: string;
          rich_text: Array<{ type: "text"; text: { content: string } }>;
        };
        Status: {
          id: string;
          status?: { name: string };
        };
        Category: {
          id: string;
          select?: { name: string };
        };
        Series: {
          id: string;
          select?: { name: string };
        };
      };
    };

    return {
      last_edited: typedPage.last_edited_time,
      created: typedPage.created_time,
      series: typedPage.properties.Series.select?.name,
      category: typedPage.properties.Category.select?.name,
      status: typedPage.properties.Status.status?.name,
      summary: typedPage.properties.Summary.rich_text
        .map((t) => t.text.content)
        .join("\n"),
      title: (page as any).properties.Name?.title
        .filter((t: any) => t.type === "text")
        .find((t: any) => t.text?.content)?.text?.content as string,
      id: page.id,
    } as const;
  }

  return {
    getPage,
    getProjectsPosts,
    getNotionPageInfo,
    getPageAsMarkdown,
  };
}

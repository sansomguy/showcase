import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { Client as NotionClient } from "@notionhq/client";
import * as marked from "marked";
import { NotionToMarkdown } from "notion-to-md";
export type NotionPageList = Array<{
  id: string;
  title: string;
  summary: string;
}>;
export class NotionUtils {
  private notionClient: NotionClient;
  private notionToMarkdown: NotionToMarkdown;
  private env: EnvGetter;

  constructor(context: { env: EnvGetter }) {
    this.env = context.env;
    this.notionClient = new NotionClient({
      auth: context.env.get("NOTION_API_KEY"),
    });
    this.notionToMarkdown = new NotionToMarkdown({
      notionClient: this.notionClient,
    });
  }

  static notion_posts_kv_cache_key = "notion_posts_pages";
  async getProjectsPosts(): Promise<string[]> {
    // const cachedPages = await kv.get(NotionUtils.notion_posts_kv_cache_key);
    // if (cachedPages) {
    //   return cachedPages as string[];
    // }
    const databaseResponse = await this.notionClient.databases.query({
      database_id: this.env.get("NOTION_BLOG_DATABASE")!,
      filter_properties: ["title"],
    });

    const pages = databaseResponse.results.map((page) => page.id);
    // await kv.set(NotionUtils.notion_posts_kv_cache_key, JSON.stringify(pages));
    return pages;
  }

  static notion_page_kv_cache_key = "notion_posts_page_";
  async getNotionPageInfo(pageId: string) {
    // const cachedPage = await kv.get(
    //   NotionUtils.notion_page_kv_cache_key + pageId
    // );

    // if (cachedPage) {
    //   return cachedPage;
    // }
    const page = await this.notionClient.pages.retrieve({
      page_id: pageId,
    });

    const typedPage = page as unknown as {
      properties: {
        Name: { title: Array<{ type: "text"; text: { content: string } }> };
        Summary: {
          id: string;
          rich_text: Array<{ type: "text"; text: { content: string } }>;
        };
      };
    };

    return {
      summary: typedPage.properties.Summary.rich_text
        .map((t) => t.text.content)
        .join("\n"),
      title: (page as any).properties.Name.title
        .filter((t: any) => t.type === "text")
        .find((t: any) => t.text?.content)?.text?.content as string,
      id: page.id,
    } as const;
    // await kv.set(
    //   NotionUtils.notion_page_kv_cache_key + pageId,
    //   JSON.stringify(page)
    // );
  }

  static notion_page_html_kv_cache_key = "notion_posts_page_html_";
  async getNotionPageAsHtml(pageId: string) {
    // const cachedPage = await kv.get(
    //   NotionUtils.notion_page_html_kv_cache_key + pageId
    // );
    // if (cachedPage) {
    //   return cachedPage;
    // }
    const mdBlocks = await this.notionToMarkdown.pageToMarkdown(pageId);
    const markdownStr = this.notionToMarkdown.toMarkdownString(mdBlocks);
    const markdownHtml = await marked.parse(markdownStr.parent);
    // await kv.set(
    //   NotionUtils.notion_page_html_kv_cache_key + pageId,
    //   markdownHtml
    // );
    return markdownHtml;
  }
}

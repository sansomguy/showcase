import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { Client as NotionClient } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import * as marked from "marked";

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

  async getProjectsPosts() {
    const databaseResponse = await this.notionClient.databases.query({
      database_id: this.env.get("NOTION_BLOG_DATABASE")!,
      filter_properties: ["title"],
    });
    const pages = databaseResponse.results.map((page) => page.id);
    return pages;
  }

  async getNotionPageInfo(pageId: string) {
    const page = await this.notionClient.pages.retrieve({
      page_id: pageId,
    });
    return page;
  }

  async getNotionPageAsHtml(pageId: string) {
    const mdBlocks = await this.notionToMarkdown.pageToMarkdown(pageId);
    const markdownStr = this.notionToMarkdown.toMarkdownString(mdBlocks);
    return await marked.parse(markdownStr.parent);
  }
}

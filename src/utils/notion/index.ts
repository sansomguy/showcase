import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { Client as NotionClient } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
export type NotionPageList = Array<{
  id: string;
  title: string;
  summary: string;
  status: "LIVE" | "DRAFT" | null;
  category: "Projects" | "Thoughts" | null;
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

  async getProjectsPosts(): Promise<string[]> {
    const databaseResponse = await this.notionClient.databases.query({
      database_id: this.env.get("NOTION_BLOG_DATABASE")!,
      filter_properties: ["title"],
    });

    const pages = databaseResponse.results.map((page) => page.id);

    return pages;
  }

  getPage(pageId: string) {
    return Promise.all([
      this.getNotionPageInfo(pageId),
      this.getPageAsMarkdown(pageId),
    ]);
  }

  async getPageAsMarkdown(pageId: string) {
    const mdBlocks = await this.notionToMarkdown.pageToMarkdown(pageId);
    const markdownStr = this.notionToMarkdown.toMarkdownString(mdBlocks);
    return markdownStr.parent;
  }

  async getNotionPageInfo(pageId: string) {
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
        Status: {
          id: string;
          status?: { name: string };
        };
        Select: {
          id: string;
          select?: { name: string };
        };
      };
    };

    return {
      category: typedPage.properties.Select.select?.name,
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
}

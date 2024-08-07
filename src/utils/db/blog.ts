import type { RequestEvent } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase-client";
import type { NotionPageList } from "../notion";

export type BlogCategory = "Projects" | "Thoughts";
export class Blog {
  constructor(
    private readonly context: Pick<RequestEvent, "env" | "sharedMap">
  ) {}
  async getPosts(category?: BlogCategory): Promise<NotionPageList> {
    const db = createSupabaseClient(this.context);

    const request = db
      .from("notion_pages")
      .select("id, title, summary, category, status");
    if (category) {
      request.eq("category", category);
    }
    request.order("order", { ascending: false });
    request.throwOnError();

    const { data: pages } = await request;
    return pages! as NotionPageList;
  }

  async getPost(id: string) {
    const db = createSupabaseClient(this.context);
    const { data: page } = await db
      .from("notion_pages")
      .select("id, title, status, category, summary, content")
      .eq("id", id)
      .eq("status", "LIVE")
      .single()
      .throwOnError();

    return page!;
  }

  getCategories() {
    return Promise.resolve(["Projects", "Thoughts"]);
  }
}

import type { RequestEvent } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase-client";

type DBBlogPost = {
  id: string;
  title: string;
  summary: string;
  created: string;
  last_edited: string;
  status: "LIVE" | "DRAFT" | null;
  category: "Projects" | "Thoughts";
  content: string;
};
export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  created: string;
  last_edited: string;
  status: "LIVE" | "DRAFT" | null;
  category: "Projects" | "Thoughts";
  href: string;
  content: string;
};

export type BlogCategory = "Projects" | "Thoughts";
export class Blog {
  constructor(
    private readonly context: Pick<RequestEvent, "env" | "sharedMap">
  ) {}
  async getPosts(category?: BlogCategory): Promise<Array<BlogPost>> {
    const db = createSupabaseClient(this.context);

    const request = db
      .from("notion_pages")
      .select(
        "id, title, created, last_edited, category, status, summary, content"
      );
    if (category) {
      request.eq("category", category);
    }
    request.order("order", { ascending: false });
    request.throwOnError();

    const { data: pages } = await request;
    return pages?.map(this.mapToBlogPost) ?? [];
  }

  async getPost(id: string): Promise<BlogPost> {
    const db = createSupabaseClient(this.context);
    const { data: page } = await db
      .from("notion_pages")
      .select(
        "id, title, last_edited, created, status, category, summary, content"
      )
      .eq("id", id)
      .eq("status", "LIVE")
      .single()
      .throwOnError();

    return this.mapToBlogPost(page!);
  }

  getCategories() {
    return Promise.resolve(["Projects", "Thoughts"]);
  }

  private mapToBlogPost(post: DBBlogPost): BlogPost {
    return {
      ...post!,
      content: post.content || "",
      category: post.category!,
      href: `/blog/${post.category!.toLowerCase()}/posts/${post.id}`,
    };
  }
}

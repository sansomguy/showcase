import type { Database } from "~/supabase/types";
import type { RequestEvent } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";

export const categories = [
  "Projects",
  "Thoughts",
  "Tips",
  "Experiments",
] as const;
export type BlogCategory = (typeof categories)[number];
export type BlogStatus = "LIVE" | "DRAFT";

export type DBBlogPost = {
  id: string;
  title: string;
  summary: string;
  created: string;
  last_edited: string;
  status: BlogStatus;
  category: BlogCategory;
  series: string;
  content: string;
};
export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  series: string;
  created: string;
  last_edited: string;
  status: BlogStatus;
  category: BlogCategory;
  href: string;
  content: string;
};

export class Blog {
  constructor(
    private readonly context: Pick<RequestEvent, "env" | "sharedMap">,
  ) {}
  async getPosts(category?: BlogCategory): Promise<Array<BlogPost>> {
    const request = this.fetch();
    if (category) {
      request.eq("category", category);
    }
    request.order("order", { ascending: false });
    request.throwOnError();

    const { data: pages } = await request;
    return pages?.map(this.mapToBlogPost) ?? [];
  }

  async getPost(id: string): Promise<BlogPost> {
    const { data: page } = await this.fetch()
      .eq("id", id)
      .eq("status", "LIVE")
      .single()
      .throwOnError();

    return this.mapToBlogPost(page!);
  }

  getCategories() {
    return Promise.resolve(["Projects", "Thoughts"]);
  }

  private mapToBlogPost(
    post: Database["public"]["Tables"]["notion_pages"]["Row"],
  ): BlogPost {
    return {
      ...post!,
      status: post.status as BlogStatus,
      last_edited: post.last_edited || post.created,
      series: post.series || "",
      summary: post.summary || "",
      content: post.content || "",
      category: post.category! as BlogCategory,
      href: `/blog/${post.category!.toLowerCase()}/posts/${post.id}`,
    };
  }

  private fetch() {
    const db = createSupabaseClient();
    return db.from("notion_pages").select("*").throwOnError();
  }
}

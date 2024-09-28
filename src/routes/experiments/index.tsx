import { component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import PostsList from "~/components/posts-list";
import type { BlogPost } from "~/utils/db/blog";

export default component$(() => {
  const { menu } = useContent();

  const posts: BlogPost[] =
    menu?.items?.map((item) => ({
      id: item.text,
      title: item.text,
      href: item.items?.[0]?.href || "#",
      summary: item.items?.[0]?.text || "",
      created: new Date().toISOString(),
      series: "",
      last_edited: new Date().toISOString(),
      category: "Experiments",
      status: "LIVE",
      content: "",
    })) || [];

  return (
    <div>
      <h1>Experiments</h1>
      <PostsList posts={posts} />
    </div>
  );
});

export const head = {
  title: "Experiments",
  frontmatter: {
    breadcrumbs: false,
  },
};

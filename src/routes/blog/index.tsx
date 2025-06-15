import { component$, useComputed$, useStyles$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import PostsList from "~/components/theme/posts-list";
import { Blog } from "~/utils/db/blog";
import { groupBy } from "~/utils/groupBy";

export const usePostsLoader = routeLoader$(async (context) => {
  const blog = new Blog(context);

  const posts = await blog.getPosts();

  const categories = groupBy((post) => post.category, posts);
  const topEntries = Array.from(categories.entries()).map(
    ([category, posts]) => [category, posts.slice(0, 3)] as const,
  );
  const topPosts = Object.fromEntries(topEntries);

  return topPosts;
});

export default component$(() => {
  useStyles$(/*css*/ `
    accent {
      color: var(--accent);
    }
    `);
  const loader = usePostsLoader();

  const contentByCategory = useComputed$(() => {
    if (!loader.value) {
      return [];
    }

    return Object.entries(loader.value).map(([category, values]) => (
      <div key={category}>
        <h2>
          <accent class="accent">#&nbsp;</accent>
          <Link href={`/blog/${category.toLowerCase()}/`}>{category}</Link>
        </h2>
        <PostsList posts={values} />
      </div>
    ));
  });

  return (
    <div>
      <h1>Blog</h1>
      {contentByCategory}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Blog",
  frontmatter: {
    breadcrumbs: false,
  },
};

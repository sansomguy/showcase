import { component$, useStyles$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Link,
  type StaticGenerateHandler,
  routeLoader$,
} from "@builder.io/qwik-city";
import PostsList from "~/components/posts-list";
import { Blog } from "~/utils/db/blog";
import { groupBy } from "~/utils/groupBy";

export const onStaticGenerate: StaticGenerateHandler = async (context) => {
  const blog = new Blog({ env: context.env, sharedMap: new Map() });
  const categories = await blog.getCategories();
  return {
    params: categories.map((category) => ({ category })),
  };
};

export const usePostsLoader = routeLoader$(async (event) => {
  const blog = new Blog(event);

  const posts = await blog.getPosts();

  const categories = groupBy((post) => post.category, posts);
  const topEntries = Array.from(categories.entries()).map(
    ([category, posts]) => [category, posts.slice(0, 3)] as const
  );
  const topPosts = Object.fromEntries(topEntries);

  return topPosts;
});

export default component$(() => {
  const loader = usePostsLoader();
  useStyles$(/*css*/ `
    accent {
      color: var(--accent);
    }
    `);

  return (
    <div>
      <h1>Blog</h1>
      {Object.keys(loader.value).map((category) => (
        <div key={category}>
          <h2>
            <accent class="accent">#&nbsp;</accent>
            <Link href={`/blog/${category.toLowerCase()}`}>{category}</Link>
          </h2>
          <PostsList posts={loader.value[category]!} />
        </div>
      ))}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Blog",
  frontmatter: {
    breadcrumbs: false,
  },
};

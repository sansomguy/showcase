import { component$, useStyles$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Link,
  type StaticGenerateHandler,
  routeLoader$,
} from "@builder.io/qwik-city";
import PostsList from "~/components/posts-list";
import { Blog, type BlogPost } from "~/utils/db/blog";

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

  const categories = posts
    .filter((post) => post.status === "LIVE")
    .reduce(
      (acc, post) => {
        const existing = acc[post.category] ?? [];
        return {
          ...acc,
          [post.category]: [...existing, post],
        };
      },
      {} as Record<string, BlogPost[]>
    );

  return categories;
});

export const useDynamicLoader = routeLoader$(async () => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const dynamicLoader = useDynamicLoader();
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
          <span>Date string: {dynamicLoader.value.date}</span>
          <h2>
            <accent class="accent">#&nbsp;</accent>
            <Link href={`/${category.toLowerCase()}`}>{category}</Link>
          </h2>
          <PostsList posts={loader.value[category]} />
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

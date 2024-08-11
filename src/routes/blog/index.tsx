import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  type StaticGenerateHandler,
  routeLoader$,
} from "@builder.io/qwik-city";
import PostsList from "~/components/posts-list";
import { Blog, BlogPost } from "~/utils/db/blog";

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
        return {
          ...acc,
          [post.category]: [...(acc[post.category] || []), post],
        };
      },
      {} as Record<string, BlogPost[]>
    );

  return categories;
});

export default component$(() => {
  const loader = usePostsLoader();

  return (
    <div>
      <h1>Blog</h1>
      {Object.keys(loader.value).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <PostsList posts={loader.value[category]} />
        </div>
      ))}
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, isNavigating, head }) => {
  if (isNavigating) {
    return {
      title: head.title,
      frontmatter: {
        breadcrumbs: [{ name: "#", link: "/" }],
      },
    };
  }
  const loader = resolveValue(usePostsLoader);
  return {
    title: "Blog",
    frontmatter: {
      breadcrumbs: [{ name: "#", link: "/" }],
    },
  };
};

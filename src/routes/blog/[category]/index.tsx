import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  type StaticGenerateHandler,
  routeLoader$,
} from "@builder.io/qwik-city";
import PostsList from "~/components/posts-list";
import { capitalize } from "~/utils/capitalize";
import { Blog } from "~/utils/db/blog";

export const onStaticGenerate: StaticGenerateHandler = async (context) => {
  const blog = new Blog({ env: context.env, sharedMap: new Map() });
  const categories = await blog.getCategories();
  return {
    params: categories.map((category) => ({ category })),
  };
};

export const usePostsLoader = routeLoader$(async (event) => {
  const blog = new Blog(event);

  const category = capitalize(event.params.category) as "Projects" | "Thoughts";
  const posts = await blog.getPosts(category);

  return {
    posts: posts.filter((post) => post.status === "LIVE"),
    upcoming: posts.filter((post) => post.status === "DRAFT"),
    category,
  };
});

export default component$(() => {
  const loader = usePostsLoader();

  return (
    <div>
      <h1>{loader.value.category}</h1>
      <PostsList posts={loader.value.posts} />
      <h2>Upcoming</h2>
      <PostsList posts={loader.value.upcoming} />
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const loader = resolveValue(usePostsLoader);
  return {
    title: loader.category,
    frontmatter: {
      breadcrumbs: [{ name: "Blog", link: "/blog" }],
    },
  };
};

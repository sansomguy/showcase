import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
export const useDynamicLoader = routeLoader$(async () => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const loader = useDynamicLoader();
  return (
    <div>
      <h1>SSR</h1>
      <p>Dynamic data: {loader.value.date}</p>
      <Link href="/experiments/ssg">SSG</Link>
    </div>
  );
});

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

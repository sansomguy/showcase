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
      <h1>SSG</h1>
      <p>Dynamic data: {loader.value.date}</p>
      <ul>
        <li>
          <Link href="/experiments/caching/server-provider">server$</Link>
        </li>
        <li>
          <Link href="/experiments/caching/ssg" class="current">
            SSG
          </Link>
        </li>
        <li>
          <Link href="/experiments/caching/ssr">SSR</Link>
        </li>
      </ul>
      <h3>Code</h3>
      <pre>
        <code>
          // loader
          {
            /*js*/ `
export const useDynamicLoader = routeLoader$(async () => {
  return {
    date: new Date().toISOString(),
  };
});
// component
export default component$(() => {
const loader = useDynamicLoader();
return (
    <h1>SSG</h1>
    <p>Dynamic data: {loader.value.date}</p>
  )
})
`
          }
        </code>
      </pre>
    </div>
  );
});

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

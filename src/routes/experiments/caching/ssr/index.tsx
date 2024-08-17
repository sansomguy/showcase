import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import CodeSnippet from "~/components/code-snippet";
export const useDynamicLoader = routeLoader$(() => {
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
      <ul>
        <li>
          <Link href="/experiments/caching/server-provider">server$</Link>
        </li>
        <li>
          <Link href="/experiments/caching/ssg">SSG</Link>
        </li>
        <li>
          <Link href="/experiments/caching/ssr" class="current">
            SSR
          </Link>
        </li>
      </ul>
      <h3>Code</h3>
      <CodeSnippet
        language="javascript"
        code={
          /*js*/ `// loader
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
      />
    </div>
  );
});

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

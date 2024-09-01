import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { type DocumentHead, Link, server$ } from "@builder.io/qwik-city";
import CodeSnippet from "~/components/code-snippet";

export const getServerDate = server$(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const resource = useResource$(() => getServerDate());
  return (
    <div>
      <h1>server$ & useProvider$</h1>
      <Resource
        value={resource}
        onResolved={(value) => <p>Dynamic data: {value.date}</p>}
        onPending={() => <p>Loading...</p>}
      />

      <ul>
        <li>
          <Link href="/experiments/caching/server-provider" class="current">
            server$
          </Link>
        </li>
        <li>
          <Link href="/experiments/caching/ssg">SSG</Link>
        </li>
        <li>
          <Link href="/experiments/caching/ssr">SSR</Link>
        </li>
      </ul>
      <h3>Code</h3>
      <CodeSnippet
        language="javascript"
        code={
          /*js*/ `
export const getServerDate = server$(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    date: new Date().toISOString(),
  };
});
// component
export default component$(() => {
  const resource = useResource$(() => getServerDate());
  return (
      <h1>server$ & useProvider$</h1>
      <Resource
        value={resource}
        onResolved={(value) => <p>Dynamic data: {value.date}</p>}
        onPending={() => <p>Loading...</p>} />)
});

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

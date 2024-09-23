import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  type RequestHandler,
  Link,
  routeLoader$,
} from "@builder.io/qwik-city";
import CodeSnippet from "~/components/theme/code-snippet";

export const onGet: RequestHandler = async (event) => {
  const { cacheControl } = event;
  cacheControl({
    public: true,
    // never cache this page because
    // i'm using it as part of an experiment
    maxAge: 0,
  });
};

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
      <CodeSnippet language="javascript" code={snippet} />
    </div>
  );
});

const snippet = /*ts*/ `// loader
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
`;

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

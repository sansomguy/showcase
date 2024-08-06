import { component$, useComputed$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { marked } from "marked";
import { createSupabaseClient } from "~/supabase-client";

export const onStaticGenerate: StaticGenerateHandler = async ({ env }) => {
  const db = createSupabaseClient({ env });
  const { data: pages } = await db
    .from("notion_pages")
    .select("id")
    .throwOnError();
  return {
    params: pages!.map(({ id }) => {
      return { id };
    }),
  };
};

export const useProjectPageLoader = routeLoader$(async function (event) {
  const { params } = event;
  const db = createSupabaseClient(event);
  const { data: page } = await db
    .from("notion_pages")
    .select("id, title, summary, content")
    .eq("id", params.id)
    .single()
    .throwOnError();

  return { ...page!, content: await marked(page!.content) };
});

export default component$(() => {
  const data = useProjectPageLoader();

  const html = useComputed$<string>(() => {
    return data.value.content;
  });

  return <div dangerouslySetInnerHTML={html.value} />;
});

export const head: DocumentHead = ({ resolveValue }) => {
  const page = resolveValue(useProjectPageLoader);

  return {
    title: page.title,
    description: page.summary,
    frontmatter: {
      breadcrumbs: [
        { name: "Profile", link: "/" },
        { name: "Projects", link: "/blog/projects" },
      ],
    },
  };
};

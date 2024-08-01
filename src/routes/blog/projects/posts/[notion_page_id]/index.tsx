import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { NotionUtils } from "~/utils/notion";

export const onStaticGenerate: StaticGenerateHandler = async ({ env }) => {
  const notionUtils = new NotionUtils({ env });

  const projectPosts = await notionUtils.getProjectsPosts();
  return {
    params: projectPosts.map((id) => {
      return { notion_page_id: id };
    }),
  };
};

export const useGetProject = routeLoader$(async ({ params, env }) => {
  const pageId = params.notion_page_id as string;
  const notionUtils = new NotionUtils({ env });
  const htmlMarkdown = await notionUtils.getNotionPageAsHtml(pageId);

  return {
    markdown: htmlMarkdown,
  };
});

export default component$(() => {
  const signal = useGetProject();

  return <div dangerouslySetInnerHTML={signal.value.markdown} />;
});

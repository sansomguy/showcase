import { component$, useComputed$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { renderToHtml } from "~/components/theme/markdown/renderer";
import { Blog } from "~/utils/db/blog";
import { formatDate } from "~/utils/format-date";

export const onStaticGenerate: StaticGenerateHandler = async (context) => {
  const blog = new Blog({ env: context.env, sharedMap: new Map() });
  const projects = (await blog.getPosts()).filter(
    (post) => post.status === "LIVE",
  );
  return {
    params: projects.map((page) => ({ id: page.id })),
  };
};

export const usePostLoader = routeLoader$(async function (request) {
  const blog = new Blog(request);
  const page = await blog.getPost(request.params.id);
  if (!page)
    throw new ServerError(
      404,
      `Could not find blog post with id ${request.params.id}`,
    );

  return {
    ...page!,
    content: page.content.length ? await renderToHtml(page.content) : "",
  };
});

export default component$(() => {
  const data = usePostLoader();
  const html = useComputed$<string>(() => {
    return data.value.content;
  });

  return (
    <>
      <sub>{formatDate(data.value.created)}</sub>
      <br />
      <sub>
        <i>Edited {formatDate(data.value.last_edited)}</i>
      </sub>
      <br />
      <br />
      <h1>{data.value.title}</h1>
      <div dangerouslySetInnerHTML={html.value} />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const page = resolveValue(usePostLoader);
  return {
    title: page.title,
    description: page.summary,
    frontmatter: {
      breadcrumbs: [
        { name: "Blog", link: "/blog/" },
        {
          name: page.category,
          link: `/blog/${page.category.toLowerCase()}`,
        },
      ],
    },
  };
};

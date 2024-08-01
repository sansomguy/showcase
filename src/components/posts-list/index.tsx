import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { NotionUtils } from "~/utils/notion";
import { NavLink } from "../nav-link";
// eslint-disable-next-line qwik/loader-location
export const useGetNotionPostsLoader = routeLoader$(async ({ env }) => {
  const notionUtils = new NotionUtils({ env });
  const pages = await notionUtils.getProjectsPosts();

  const pagesInfo = (
    await Promise.all(pages.map((page) => notionUtils.getNotionPageInfo(page)))
  ).map((page: any) => {
    return {
      title: page.properties.Name.title
        .filter((t: any) => t.type === "text")
        .find((t: any) => t.text?.content)?.text?.content as string,
      id: page.id,
    } as const;
  });
  return {
    pagesInfo,
  };
});

export default component$(() => {
  const signal = useGetNotionPostsLoader();
  return (
    <ul>
      {signal.value.pagesInfo.map((page) => (
        <li key={page.id}>
          <NavLink href={`/blog/projects/posts/${page.id}`}>
            {page.title}
          </NavLink>
        </li>
      ))}
      <li></li>
    </ul>
  );
});

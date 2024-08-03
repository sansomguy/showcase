import { component$, Resource } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase-client";
import { NavLink } from "../nav-link";
type NotionPageList = Array<{ id: string; title: string }>;
// eslint-disable-next-line qwik/loader-location
export const useGetNotionPostsLoader = routeLoader$((event) => {
  return async function () {
    const client = createSupabaseClient(event);
    const { data: pages } = await client
      .from("notion_pages")
      .select("*")
      .throwOnError()!;

    return pages as NotionPageList;
  };
});

export default component$(() => {
  const signal = useGetNotionPostsLoader();
  return (
    <ul>
      <Resource
        value={signal}
        onResolved={(value) =>
          value.map((page) => (
            <li key={page.id}>
              <NavLink href={`/blog/projects/posts/${page.id}`}>
                {page.title}
              </NavLink>
            </li>
          ))
        }
      />
    </ul>
  );
});

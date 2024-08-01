import { component$, Resource } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase-client";
import { NavLink } from "../nav-link";
// eslint-disable-next-line qwik/loader-location
export const useGetNotionPostsLoader = routeLoader$((event) => {
  return async (): Promise<Array<{ id: string; title: string }>> => {
    const client = createSupabaseClient(event);
    const { data: pages } = await client
      .from("notion_pages")
      .select("*")
      .throwOnError()!;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return pages!;
  };
});

export default component$(() => {
  const signal = useGetNotionPostsLoader();
  return (
    <ul>
      <Resource
        value={signal}
        onPending={() => <li>Loading...</li>}
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

      <li></li>
    </ul>
  );
});

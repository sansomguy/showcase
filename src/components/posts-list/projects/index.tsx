import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import PostsList from "~/components/posts-list";
import { createSupabaseClient } from "~/supabase-client";
import type { NotionPageList } from "~/utils/notion";

export const fetchProjects = server$(async function () {
  const client = createSupabaseClient(this);
  const { data: pages } = await client
    .from("notion_pages")
    .select("*")
    .throwOnError()!;
  return pages as NotionPageList;
});

export default component$(() => {
  const result = useResource$(async function () {
    const projects = await fetchProjects();
    return projects;
  });
  return (
    <Resource
      value={result}
      onPending={() => <div>Loading...</div>}
      onRejected={(error) => <div>Error: {error.message}</div>}
      onResolved={(posts) => <PostsList posts={posts} />}
    />
  );
});

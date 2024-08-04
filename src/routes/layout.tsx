import {
  Resource,
  Slot,
  component$,
  useResource$,
  useStyles$,
} from "@builder.io/qwik";
import {
  routeAction$,
  server$,
  type RequestHandler,
} from "@builder.io/qwik-city";
import styles from "./layout.css?inline";

import DynamicMenu from "~/components/dynamic-menu";
import FlyingSquares from "~/components/flying-squares";
import PageTitle from "~/components/page-title";
import { createSupabaseClient } from "~/supabase-client";
import type { NotionPageList } from "~/utils/notion";

export const onGet: RequestHandler = async (props) => {
  const { cacheControl } = props;
  cacheControl(
    {
      public: true,
      // Always serve a cached response by default, up to a week stale
      staleWhileRevalidate: 60 * 60 * 24 * 7,
      // Max once every 10 minutes, revalidate on the server to get a fresh version of this page
      maxAge: 10 * 60 * 1000,
      sMaxAge: 10 * 60 * 1000,
    },
    "Vercel-CDN-Cache-Control"
  );
};

export const useSubscribe = routeAction$(async (form, requestEvent) => {
  const supabaseClient = createSupabaseClient(requestEvent);

  const email = form.email as string;

  const { error } = await supabaseClient.auth.signUp({
    email,
    password: "^1^**ja12nd!@",
  });

  if (error) {
    requestEvent.status(400);
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message: "OK",
  };
});

export const fetchProjects = server$(async function () {
  const client = createSupabaseClient(this);
  const { data: pages } = await client
    .from("notion_pages")
    .select("*")
    .throwOnError()!;
  return { projects: pages as NotionPageList };
});

export default component$(() => {
  useStyles$(styles);
  const result = useResource$(async function () {
    const projects = await fetchProjects();
    return projects;
  });

  return (
    <div class={"layout__container"}>
      <div class={"layout__main__container"}>
        <Resource
          value={result}
          onResolved={(result) => <DynamicMenu projects={result.projects} />}
        />
        <main class="layout__main__container__inner">
          <PageTitle />
          <Slot />
        </main>
      </div>
      <FlyingSquares />
    </div>
  );
});

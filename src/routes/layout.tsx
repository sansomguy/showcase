import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import { routeAction$, type RequestHandler } from "@builder.io/qwik-city";
import styles from "./layout.css?inline";

import Navigation from "~/components/navigation";
import PageTitle from "~/components/page-title";
import GetInTouch from "~/components/get-in-touch";
import { createSupabaseClient } from "~/supabase-client";
import FlyingSquares from "~/components/flying-squares";


export const useSubscribe = routeAction$(async (form, requestEvent) => {

  const supabaseClient = createSupabaseClient(requestEvent);

  const email = form.email as string;

  const { error } = await supabaseClient.auth.signUp({
    email,
    password: "^1^**ja12nd!@",
  })

  if(error) {
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

export const onGet: RequestHandler = async ({ cacheControl }) => {
  
  cacheControl({
    public: true,
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 10 minutes, revalidate on the server to get a fresh version of this page
    maxAge: 10*60*1000,
    sMaxAge: 10*60*1000,
  }, 'Vercel-CDN-Cache-Control');
};

export default component$(() => {
  useStyles$(styles);

  return (
    <div class={"layout__container"}>
      <FlyingSquares />
      <Navigation />
      <div class={"layout__main__container"}>
        <main class="layout__main__container__inner">
          <section>
            <PageTitle />
          </section>
          <Slot />
        </main>
      </div>
      <GetInTouch />
    </div>
  );
});

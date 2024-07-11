import { $, Slot, component$, useComputed$, useOnWindow, useSignal } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./layout.module.css";

import Navigation from "~/components/navigation";
import PageTitle from "~/components/page-title";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  // TODO - set the default open state based on the user agent information on the serve

  return (
    <div class={`${styles.layout}`}>
      <Navigation />
      <div class={styles["main-container"]}>
        <main class={styles.main}>
          <section>
            <PageTitle />
          </section>
          <Slot />
        </main>
      </div>
    </div>
  );
});

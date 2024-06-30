import {
  $,
  Slot,
  component$,
  useOnWindow,
  useSignal
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./layout.module.css";

import MenuToggle from "~/components/menu-toggle";
import Navigation from "~/components/navigation";

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
  const showMobileSideNav = useSignal(() => false);
  const toggleShowMobileSideNav = $(() => {
    showMobileSideNav.value = !showMobileSideNav.value;
  });

  useOnWindow(
    "resize",
    $((e) => {
      const window = e.target as Window;
      window.innerWidth > 768 && (showMobileSideNav.value = false);
    }),
  );

  return (
    <div
      class={`${styles.layout} ${!showMobileSideNav.value ? styles["navigation--hidden"] : ""}`}
    >
      <header class={`${styles.navigation}`}>
        <div class={styles["navigation__inner"]}>
          <MenuToggle
            open={showMobileSideNav.value}
            onClick$={toggleShowMobileSideNav}
          />

          <Navigation />
        </div>
      </header>
      <div class={styles["main-container"]}>
        <MenuToggle
          open={showMobileSideNav.value}
          onClick$={toggleShowMobileSideNav}
          disappearOnOpen
        />
        <main class={styles.main}>
          <Slot />
        </main>
      </div>
    </div>
  );
});

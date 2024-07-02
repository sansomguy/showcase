import { $, Slot, component$, useOnWindow, useSignal } from "@builder.io/qwik";
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
  // TODO - set the default open state based on the user agent information on the server
  const showSideNav = useSignal(() => false);
  const isDesktop = useSignal<boolean>(true);

  const toggleShowMobileSideNav = $(() => {
    showSideNav.value = !showSideNav.value;
  });

  const handleNavigationClick = $(() => {
    if (!isDesktop.value) {
      showSideNav.value = false;
    }
  });

  useOnWindow(
    ["resize", "DOMContentLoaded"],
    $((e) => {
      let window: Window;
      if (e.target instanceof Window) {
        window = e.target;
      } else {
        window = (e.target as Document).defaultView as Window;
      }
      const isLargeScreen = window.innerWidth > 768;

      if (isLargeScreen) {
        showSideNav.value = true;
      }
      isDesktop.value = isLargeScreen
    })
  );

  return (
    <div
      class={`${styles.layout}`}
    >
      <header class={`${styles.navigation} ${!showSideNav.value ? styles["navigation--hidden"] : ""}`}>
        <div class={styles["navigation__inner"]}>
          <MenuToggle
            class={styles['navigation__menu-toggle']}
            open={showSideNav.value}
            onClick$={toggleShowMobileSideNav}
          />
          <Navigation onClick$={handleNavigationClick} />
        </div>
      </header>
      <div class={styles["main-container"]}>
        <main class={styles.main}>
          <Slot />
        </main>
      </div>
    </div>
  );
});

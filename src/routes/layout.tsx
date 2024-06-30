import { $, Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./layout.module.css";
import MenuSVG from "~/media/menu.svg?jsx";

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

  useVisibleTask$(() => {
    function setTransformOrigins() {
      const [menuButton] = document.getElementsByClassName(
        styles.mobileNavButton
      );
      const lines = menuButton.getElementsByClassName(
        "menu_svg__line"
      ) as HTMLCollectionOf<SVGRectElement>;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // calculate the center of the line
        const bbox = line.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        line.style.transformOrigin = `${centerX}px ${centerY}px`;
      }
    }
    setTransformOrigins();
  });

  const toggleMobileNav = $(() => {
    const [menuButton] = document.getElementsByClassName(
      styles.mobileNavButton
    );

    function playAnimation() {
      menuButton.classList.add(styles["mobileNavButton--open"]);
    }

    function reverseAnimation() {
      menuButton.classList.remove(styles["mobileNavButton--open"]);
    }

    

    const open = !showMobileSideNav.value;
    if (open) {
      playAnimation();
    }

    if (!open) {
      reverseAnimation();
    }

    showMobileSideNav.value = !!open;
  });

  return (
    <div
      class={`${styles.layout} ${!showMobileSideNav.value ? styles["navigation--hidden"] : ""}`}
    >
      <header class={`${styles.navigation}`}>
        <div class={styles["navigation__inner"]}>
          <div
            class={styles["navigation__close"]}
            onClick$={() => {
              toggleMobileNav();
            }}
          >
            x
          </div>
          <Navigation />
        </div>
      </header>
      <div class={styles.mobileNav}>
        <span
          class={styles.mobileNavButton}
          onClick$={(event) => {
            toggleMobileNav();
          }}
        >
          <MenuSVG />
        </span>
      </div>
      <main class={styles.main}>
        <Slot />
      </main>
    </div>
  );
});

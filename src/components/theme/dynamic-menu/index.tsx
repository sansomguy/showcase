import {
  $,
  component$,
  useOnDocument,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import { NavLink } from "../nav-link";
import styles from "./styles.css?inline";

import ThemeSwitcher from "../theme-switcher";

export default component$(() => {
  useStyles$(styles);
  useStyles$(/*css*/ `
    .dynamic_menu__top_space {
      height: 3rem;
      width: 100%;
    }
    @media(max-width: 768px) {
      .dynamic_menu__top_space {
        display: none;
      }
    }
  `);

  const store = useStore({
    previousScroll: 0,
    isScrollingDown: false,
    isAtTop: true,
  });

  useOnDocument(
    "scroll",
    $(() => {
      const scrollDelta = window.scrollY - store.previousScroll;
      store.previousScroll = window.scrollY;

      if (window.scrollY > 0 && scrollDelta > 0) {
        store.isScrollingDown = true;
      } else {
        store.isScrollingDown = false;
      }

      if (window.scrollY > 0) {
        store.isAtTop = false;
      } else {
        store.isAtTop = true;
      }
    }),
  );

  return (
    <>
      <div class="dynamic_menu__top_space"></div>
      <div
        class={`dynamic_menu ${store.isAtTop ? "dynamic_menu--top" : ""} ${store.isScrollingDown ? "dynamic_menu--scrolling-down" : ""}`}
      >
        <nav>
          <div class="dynamic_menu__inner">
            <div class="dynamic_menu__main-links">
              <NavLink href={"/blog/"} accessKey="current">
                Blog
              </NavLink>

              <NavLink href={"/contact/"} activeClass="current">
                Contact
              </NavLink>

              <NavLink href={"/experiments/"} activeClass="current">
                Experiments
              </NavLink>
            </div>
            <div class="dynamic_menu__secondary-links">
              <ThemeSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
});

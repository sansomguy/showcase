import {
  $,
  component$,
  useOnDocument,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import { NavLink } from "../nav-link";
import styles from "./styles.css?inline";

import GetInTouch from "../get-in-touch";
import ThemeSwitcher from "../theme-switcher";

export default component$(() => {
  useStyles$(styles);

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
    })
  );

  return (
    <header>
      <div
        class={`dynamic_menu ${store.isAtTop ? "dynamic_menu--top" : ""} ${store.isScrollingDown ? "dynamic_menu--scrolling-down" : ""}`}
      >
        <nav>
          <div class="dynamic_menu__main-links">
            <div>
              <NavLink href={"/blog/projects"} activeClass="current">
                Projects
              </NavLink>
              {/* <div class={`dynamic_menu__sub-links`}>
                <Projects posts={projects} />
              </div> */}
            </div>
            <NavLink href={"/blog/thoughts"} activeClass="current">
              Thoughts
            </NavLink>
            <NavLink href={"/"} activeClass="current">
              Profile
            </NavLink>
          </div>
          <ThemeSwitcher />
          <GetInTouch />
        </nav>
      </div>
    </header>
  );
});

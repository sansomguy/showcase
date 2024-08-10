import {
  $,
  component$,
  useOnDocument,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import { NavLink } from "../nav-link";
import styles from "./styles.css?inline";

import { categories } from "~/utils/db/blog";
import ThemeSwitcher from "../theme-switcher";

export default component$(() => {
  const menuItems = categories.map((category) => {
    return {
      title: category,
      href: `/blog/${category.toLowerCase()}`,
    };
  });
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
          <div class="dynamic_menu__inner">
            <div class="dynamic_menu__main-links">
              {menuItems.map((item) => (
                <NavLink href={item.href} accessKey="current" key={item.title}>
                  {item.title}
                </NavLink>
              ))}
              <NavLink href={"/"} activeClass="current">
                Contact
              </NavLink>
            </div>
            <div class="dynamic_menu__secondary-links">
              <ThemeSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
});

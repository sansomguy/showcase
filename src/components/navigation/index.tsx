import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";
import { NavLink } from "../nav-link";

import PageIcon from "../page-icon";
import MenuToggle from "../menu-toggle";

export default component$(() => {
  useStyles$(styles);

  const menu = useContent();

  const navOpen = useSignal(() => false);

  useOnWindow(
    "resize",
    $(() => {
      navOpen.value = false;
    })
  );

  const toggleNavigation = $(() => {
    if (navOpen.value) {
      navOpen.value = false;
    } else {
      navOpen.value = true;
    }
  });

  const handleNavigationClick = $(() => {
    navOpen.value = false;
  });

  return (
    <header
      class={`navigation ${!!navOpen.value ? "navigation--open" : "navigation--closed"}`}
    >
      <div class={"navigation__inner"}>
        <div class="navigation__menu-toggle">
          <MenuToggle class="navigation__menu-toggle__button" open={navOpen.value} onClick$={toggleNavigation} />
        </div>
        <nav>
          {menu.menu?.items
            ?.filter((item) => !!item.href)
            .map((item) => {
              return (
                <NavLink
                  key={item.text}
                  href={item.href}
                  onClick$={handleNavigationClick}
                  activeClass="current"
                >
                  <span class="navigation__link">
                    <span class="navigation__link__text">{item.text}</span>
                    <span class="navigation__icon">
                      <PageIcon title={item.text} />
                    </span>
                  </span>
                </NavLink>
              );
            })}
        </nav>
      </div>
    </header>
  );
});

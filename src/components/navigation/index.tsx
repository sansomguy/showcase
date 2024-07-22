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
import ThemeSwitcher from "../theme-switcher";

export default component$(() => {
  useStyles$(styles);

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
      class={`navigation ${navOpen.value ? "navigation--open" : "navigation--closed"}`}
    >
      <div class={"navigation__inner"}>
        <div class="navigation__menu-toggle">
          <MenuToggle
            class="navigation__menu-toggle__button"
            open={navOpen.value}
            onClick$={toggleNavigation}
          />
        </div>
        <nav>
            <NavLink
              href={'/'}
              onClick$={handleNavigationClick}
              activeClass="current"
            >
            <span class="navigation__link">
              <span class="navigation__link__text">Josh Sansom</span>
              <span class="navigation__icon">
                <PageIcon title={'Josh Sansom'} />
              </span>
            </span>
          </NavLink>
          <NavLink
              href={'/blog/projects'}
              onClick$={handleNavigationClick}
              activeClass="current"
            >
            <span class="navigation__link">
              <span class="navigation__link__text">Projects</span>
              <span class="navigation__icon">
                <PageIcon title={'Projects'} />
              </span>
            </span>
          </NavLink>
          <NavLink
              href={'/blog/thoughts'}
              onClick$={handleNavigationClick}
              activeClass="current"
            >
            <span class="navigation__link">
              <span class="navigation__link__text">Thoughts</span>
              <span class="navigation__icon">
                <PageIcon title={'Thoughts'} />
              </span>
            </span>
          </NavLink>
        </nav>
          <ThemeSwitcher />
      </div>
    </header>
  );
});

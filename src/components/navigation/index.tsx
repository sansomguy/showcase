import { component$, useStyles$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";
import { NavLink } from "../nav-link";

export default component$(() => {
  useStyles$(styles);

  const menu = useContent();

  return (
    <nav>
      {menu.menu?.items
        ?.filter((item) => !!item.href)
        .map((item) => {
          return (
            <NavLink
              key={item.text}
              href={item.href}
              activeClass="current"
            >
              {item.text}
            </NavLink>
          );
        })}
    </nav>
  );
});

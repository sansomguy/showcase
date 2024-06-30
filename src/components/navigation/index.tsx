import { component$, useStyles$ } from "@builder.io/qwik";
import { ContentMenu, useContent } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";
import { NavLink } from "../nav-link";

import WorkerSVG from "~/media/worker.svg?jsx";
import BrainSVG from "~/media/brain.svg?jsx";

export default component$(() => {
  useStyles$(styles);

  const menu = useContent();

  return (
    <nav>
      {menu.menu?.items
        ?.filter((item) => !!item.href)
        .map((item) => {
          return (
            <NavLink key={item.text} href={item.href} activeClass="current">
              <span class="link link--icon">
                <span>{item.text}</span>
                <span class="icon"><Icon item={item} /></span>
              </span>
            </NavLink>
          );
        })}
    </nav>
  );
});

type IconProps = {
  item: ContentMenu;
};
function Icon({ item }: IconProps) {
  switch (item.text) {
    case "Projects":
      return <WorkerSVG />;
    case "Thoughts":
      return <BrainSVG />;
    default:
      return null;
  }
}

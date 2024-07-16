import { Slot, component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import { NavLink } from "~/components/nav-link";

export default component$(() => {
  const menu = useContent();

  const projectsMenuItems = menu.menu?.items?.find(
    (item) => !item.href && item.text === "Thoughts"
  );

  return (
    <>
      <aside>
        <ul>
          {projectsMenuItems?.items?.map((item) => {
            return (
              <li key={item.text}>
                <NavLink href={item.href}>{item.text}</NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
      <Slot />
    </>
  );
});

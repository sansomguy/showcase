import { Slot, component$ } from "@builder.io/qwik";
import { DocumentHead, useContent } from "@builder.io/qwik-city";
import { NavLink } from "~/components/nav-link";

export default component$(() => {
  const menu = useContent();

  const projectsMenuItems = menu.menu?.items?.find(
    (item) => !item.href && item.text === "Projects"
  );

  return (
    <>
      <section>
        {projectsMenuItems?.items?.map((item) => {
          return (
            <>
              <NavLink href="/projects">{item.text}</NavLink>
              <ul>
                {item.items?.map((subItem) => {
                  return (
                    <li key={subItem.text}>
                      <NavLink href={subItem.href}>{subItem.text}</NavLink>
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })}
        <Slot />
      </section>
    </>
  );
});
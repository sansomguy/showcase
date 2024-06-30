import { Slot, component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import { NavLink } from "~/components/nav-link";
import PageTitle from "~/components/page-title";

export default component$(() => {
  const menu = useContent();

  const projectsMenuItems = menu.menu?.items?.find(
    (item) => !item.href && item.text === "Projects"
  );

  return (
    <>
      <section>
        <PageTitle title="Projects"></PageTitle>
      </section>
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

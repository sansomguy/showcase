import { Slot, component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import { NavLink } from "~/components/nav-link";
import PageTitle from "~/components/page-title";
import WorkerSVG from "~/media/worker.svg?jsx";

export default component$(() => {
  const menu = useContent();

  const projectsMenuItems = menu.menu?.items?.find(
    (item) => !item.href && item.text === "Projects"
  );

  return (
    <>
      <section>
        <PageTitle title="Projects">
          <span>
            <WorkerSVG />
          </span>
        </PageTitle>
      </section>
      <section>
        {projectsMenuItems?.items?.map((item, index) => {
          return (
            <>
              <NavLink href="/projects">{item.text}</NavLink>
              <ul>
                {item.items?.map((subItem, subIndex) => {
                  return (
                    <li>
                      <NavLink key={subIndex} href={subItem.href}>
                        {subItem.text}
                      </NavLink>
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

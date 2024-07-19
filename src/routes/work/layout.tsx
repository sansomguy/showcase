import { Slot, component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import { NavLink } from "~/components/nav-link";
import SideBarLayout from "~/components/side-bar-layout";

export default component$(() => {
  const menu = useContent();

  const projectsMenuItems = menu.menu?.items?.find(
    (item) => !item.href && item.text === "Work"
  );

  return (
    <SideBarLayout>
      <div q:slot="side-bar">
        <div class="notice" style={{ marginTop: 0 }}>
          <ul>
            {projectsMenuItems?.items?.map((item) => {
              return (
                <li key={item.text}>
                  <NavLink href="/work">{item.text}</NavLink>
                  <ul>
                    {item.items?.map((subItem) => {
                      return (
                        <li key={subItem.text}>
                          <NavLink href={subItem.href}>{subItem.text}</NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div q:slot="main">
        <Slot />
      </div>
    </SideBarLayout>
  );
});

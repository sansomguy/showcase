import { component$, useStyles$ } from "@builder.io/qwik";
import {
  type ContentMenu,
  type RouteLocation,
  useContent,
  useLocation,
} from "@builder.io/qwik-city";
import styles from "./style.css?inline";
import { NavLink } from "../nav-link";

const traverseMenu = (current: RouteLocation) =>
  function traverse(
    menuItems: ContentMenu["items"],
    breadcrumbs: ContentMenu["items"] = [],
  ) {
    if (!menuItems) return breadcrumbs;

    const toAbsoluteUrl = (path: string) => current.url.origin + path;

    const nextBreadCrumb = menuItems.find(
      (item) =>
        item.href && current.url.href.startsWith(toAbsoluteUrl(item.href)),
    );
    if (!nextBreadCrumb) return breadcrumbs;

    return traverse(nextBreadCrumb.items, [...breadcrumbs, nextBreadCrumb]);
  };

export default component$(() => {
  useStyles$(styles);
  const menu = useContent();
  const loc = useLocation();
  const breadcrumbs = traverseMenu(loc)(menu.menu?.items);

  return (
    <div class="breadcrumbs">
      {breadcrumbs
        .filter((_, index) => index > 0)
        .map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <>
              <NavLink key={index} href={item.href}>
                {item.text}
              </NavLink>
              {!isLast && <span class="separator">/</span>}
            </>
          );
        })}
    </div>
  );
});

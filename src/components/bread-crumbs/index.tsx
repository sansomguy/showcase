import { component$, useStyles$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { NavLink } from "../nav-link";
import styles from "./style.css?inline";

function toEllipse(name: string) {
  let shortened = name;
  if (name.length > 20) {
    return (shortened = name.slice(0, 20) + "...");
  }
  return <span>{shortened}</span>;
}

export default component$(() => {
  useStyles$(styles);
  const head = useDocumentHead();
  const breadcrumbs = head.frontmatter.breadcrumbs as Array<{
    name: string;
    link: string;
  }>;
  const location = useLocation();
  const currentPath = location.url.pathname;
  const currentName = head.title;

  return (
    <div class="bread-crumbs">
      {breadcrumbs.map((path) => (
        <>
          <NavLink href={path.link} activeClass="current">
            {toEllipse(path.name)}
          </NavLink>
          <span class="bread-crumbs__separator">/</span>
        </>
      ))}
      <NavLink href={currentPath} activeClass="current">
        {toEllipse(currentName)}
      </NavLink>
    </div>
  );
});

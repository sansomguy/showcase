import { component$ } from "@builder.io/qwik";
import type { NotionPageList } from "~/utils/notion";
import { NavLink } from "../nav-link";

export default component$((props: { posts: NotionPageList }) => {
  return (
    <div class="dynamic-menu__projects">
      <ul>
        {props.posts.map((page) => (
          <li key={page.id}>
            <NavLink
              href={`/blog/projects/posts/${page.id}`}
              activeClass="current"
            >
              {page.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
});

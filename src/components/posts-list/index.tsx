import { component$ } from "@builder.io/qwik";
import type { NotionPageList } from "~/utils/notion";
import { NavLink } from "../nav-link";

export default component$((props: { posts: NotionPageList }) => {
  return (
    <div class="dynamic-menu__projects">
      <articles>
        {props.posts.map((page) => (
          <article key={page.id}>
            <strong>
              <NavLink
                href={`/blog/projects/posts/${page.id}`}
                activeClass="current"
              >
                {page.title}
              </NavLink>
            </strong>

            <p>{page.summary}</p>
          </article>
        ))}
      </articles>
    </div>
  );
});

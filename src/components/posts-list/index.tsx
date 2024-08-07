import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { NotionPageList } from "~/utils/notion";
import { NavLink } from "../nav-link";

export default component$((props: { posts: NotionPageList }) => {
  const navigate = useNavigate();

  return (
    <articles>
      {props.posts.map((page) => (
        <article
          key={page.id}
          onClick$={() => {
            if (canNavigate(page)) {
              navigate(getHref(page.id));
            }
          }}
        >
          <strong>
            {canNavigate(page) ? (
              <NavLink href={getHref(page.id)} activeClass="current">
                {page.title}
              </NavLink>
            ) : (
              page.title
            )}
          </strong>

          <p>{page.summary}</p>
        </article>
      ))}
    </articles>
  );
});

function canNavigate(page: NotionPageList[number]) {
  return page.status === "LIVE";
}
function getHref(pageId: string) {
  return `/blog/posts/${pageId}`;
}

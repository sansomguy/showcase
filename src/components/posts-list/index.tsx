import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { BlogPost } from "~/utils/db/blog";
import { formatDate } from "~/utils/format-date";
import { NavLink } from "../nav-link";

export default component$((props: { posts: Array<BlogPost> }) => {
  const navigate = useNavigate();

  return (
    <articles>
      {props.posts.map((post) => (
        <article
          key={post.id}
          onClick$={() => {
            if (canNavigate(post)) {
              navigate(post.href);
            }
          }}
        >
          <strong>
            {canNavigate(post) ? (
              <NavLink href={post.href} activeClass="current">
                {post.title}
              </NavLink>
            ) : (
              post.title
            )}
          </strong>

          <p>{post.summary}</p>
          <sub>{formatDate(post.created)}</sub>
        </article>
      ))}
    </articles>
  );
});

function canNavigate(post: BlogPost) {
  return post.status === "LIVE";
}

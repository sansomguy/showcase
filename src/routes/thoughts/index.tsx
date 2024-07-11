import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";


export default component$(() => {
  return (
    <section>
      <p>
        I swear, I have some thoughts.
        <br />I just haven't written them down yet...
      </p>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Thoughts",
  frontmatter: {
    svg: "brain",
  },
  meta: [
    {
      name: "Thoughts",
      content: "What I've been thinking about.",
    },
  ],
};

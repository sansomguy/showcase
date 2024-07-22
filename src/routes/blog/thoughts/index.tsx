import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <p>A few things I feel like sharing.</p>
      <p>
        You'll mostly just find content here on the way I work and interesting
        solutions to niche problems.
      </p>
    </>
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

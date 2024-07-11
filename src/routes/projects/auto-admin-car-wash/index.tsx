import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export const head: DocumentHead = {
  title: "Admin Car Wash",
  frontmatter: {
  },
  meta: [
    {
      name: "Admin Car Wash",
      content: "What I've been working on.",
    },
    
  ],
};


export default component$(() => {
  return (
    <section>
      This is the component for the Auto Admin Car Wash project.
    </section>
  );
});


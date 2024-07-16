import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <></>;
});


export const head: DocumentHead = {
  title: "Work",
  frontmatter: {
    svg: "worker",
  },
  meta: [
    {
      name: "description",
      content: "What I'm working on",
    },
  ],
}

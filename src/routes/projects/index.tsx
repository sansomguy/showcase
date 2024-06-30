import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <></>;
});

export const head: DocumentHead = {
  title: "Projects",
  meta: [
    {
      name: "Josh Sansom | Projects",
      content: "What I've been working on.",
    },
  ],
};

import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { QGreetings } from "~/components/nodes/react";

export default component$(() => {
  return (
    <div>
      <QGreetings />
    </div>
  );
});

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Nodes from "~/components/nodes/qwik";

export { useWorkflowLoader } from "~/components/nodes/react";

export default component$(() => {
  return (
    <div>
      <Nodes />
    </div>
  );
});

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

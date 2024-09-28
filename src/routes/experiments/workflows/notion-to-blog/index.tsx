import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import WorkflowRun from "~/components/workflows/run/qwik";

export { useWorkflowLoader } from "~/components/workflows/run/react";

export default component$(() => {
  return (
    <div>
      <WorkflowRun />
    </div>
  );
});

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

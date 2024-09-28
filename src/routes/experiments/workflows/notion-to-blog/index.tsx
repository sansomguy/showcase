import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import WorkflowRun from "~/components/workflows";

export { useWorkflowLoader } from "~/components/workflows/run/index.react";

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

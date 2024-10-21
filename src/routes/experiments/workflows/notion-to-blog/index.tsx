import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import ExperimentPost from "./summary.mdx";

export { useWorkflowLoader } from "~/components/workflows/run/index.react";

export default component$(() => {
  return (
    <div>
      <ExperimentPost />
    </div>
  );
});

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

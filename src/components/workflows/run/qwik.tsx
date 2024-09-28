import { component$ } from "@builder.io/qwik";
import { useWorkflowLoader, WorkFlowRunQwikify } from "./react";

export default component$(() => {
  const loaderResult = useWorkflowLoader();

  return (
    <>
      <WorkFlowRunQwikify
        edges={loaderResult.value.edges}
        nodes={loaderResult.value.nodes}
      />
    </>
  );
});

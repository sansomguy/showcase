import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <button
      onClick$={() => {
        console.log("Restarting workflow");
      }}
    >
      Restart Workflow
    </button>
  );
});

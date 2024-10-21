import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import Toast from "~/components/theme/toast";
import { createSupabaseClient } from "~/supabase";

const restartWorkflow = server$(async () => {
  const db = createSupabaseClient();
  const workflowId = 1;
  const newRun = await db
    .from("workflow_runs")
    .insert({
      status: "active",
      workflow_id: workflowId,
    })
    .select("*")
    .single()
    .throwOnError();

  return newRun.data!;
});

export default component$(() => {
  const newRun = useSignal<{
    id: number;
    created_at: string;
    workflow_id: number;
  } | null>(null);
  return (
    <button
      onClick$={async () => {
        newRun.value = await restartWorkflow();
      }}
    >
      Restart Workflow
      {newRun.value ? (
        <Toast
          requestRemove$={() => {
            newRun.value = null;
          }}
        >
          <div>This is the thing</div>
        </Toast>
      ) : null}
    </button>
  );
});

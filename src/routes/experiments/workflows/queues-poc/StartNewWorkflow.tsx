import {
  component$,
  useComputed$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import Toast from "~/components/theme/toast";
import { WorkflowRunContext } from "~/components/workflows/run/context";
import { createSupabaseClient } from "~/supabase";

const exampleWorkflowId = 1;

const startNewWorkflow = server$(async () => {
  const db = createSupabaseClient();

  const newRun = await db
    .from("workflow_runs")
    .insert({
      status: "active",
      workflow_id: exampleWorkflowId,
    })
    .select("*")
    .single()
    .throwOnError();

  return newRun.data!;
});

export default component$(() => {
  const workflowRunContext = useContext(WorkflowRunContext);
  const newRun = useSignal<{
    id: number;
    created_at: string;
    workflow_id: number;
  } | null>(null);

  const buttonText = useComputed$(() => {
    const context = workflowRunContext.value;

    return context?.workflow_run_id ? "Restart Workflow" : "Start Workflow";
  });

  return (
    <>
      <div>
        <h3>Workflow Demo</h3>

        <button
          onClick$={async () => {
            const newWorkflowRun = await startNewWorkflow();

            workflowRunContext.value = {
              workflow_id: newWorkflowRun.workflow_id,
              workflow_run_id: newWorkflowRun.id,
              last_action_update:
                workflowRunContext.value?.last_action_update ?? null,
              last_action_run_id: null,
            };

            newRun.value = newWorkflowRun;
          }}
        >
          {buttonText}
        </button>
      </div>
      {newRun.value ? (
        <Toast
          requestRemove$={() => {
            newRun.value = null;
          }}
        >
          <div>Restarted</div>
        </Toast>
      ) : null}
    </>
  );
});

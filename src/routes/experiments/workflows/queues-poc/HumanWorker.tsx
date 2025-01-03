import {
  $,
  component$,
  useContext,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import { getActionStatus } from "./server.getActionStatus";
import type { WorkflowActionResponse } from "./server.getActionStatus";
import { getLatestWorkflowRun } from "./server.getLatestWorkflowRun";
import { startAction } from "./server.startAction";
import { WorkflowRunContext } from "~/components/workflows/run/context";

export type WorkflowActionRequest = {
  workflow_id: number;
  run_id: number;
  action_id: number;
};

const humanAction = 4;

const doHumanWork = server$(async () => {
  const latestRun = await getLatestWorkflowRun();
  const startedAction = await startAction({
    run_id: latestRun!.id,
    action_id: humanAction,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const db = createSupabaseClient();
  const successAction = await db
    .from("workflow_runs_actions")
    .update({ status: "success" })
    .eq("id", startedAction!.id)
    .select("*")
    .single()
    .throwOnError();

  return successAction.data!;
});

/**
 * @description Given a workflow and action id, this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$(() => {
  const workflowRunContext = useContext(WorkflowRunContext);
  const action = useSignal<WorkflowActionResponse | null>(null);
  const lastUpdate = useSignal<Date | null>(null);

  const onClick = $(async () => {
    const updatedAction = await doHumanWork();
    workflowRunContext.value = {
      ...workflowRunContext.value,
      workflow_run_id: updatedAction.workflow_run_id,
      last_action_run_id: updatedAction.id,
    };
  });

  const handleRefresh = $(async () => {
    if (workflowRunContext.value.workflow_run_id) {
      const result = await getActionStatus({
        workflow_id: workflowRunContext.value.workflow_id,
        action_id: humanAction,
        workflow_run_id: workflowRunContext.value.workflow_run_id,
      });

      action.value = result;
    }

    lastUpdate.value = new Date();
  });

  useTask$(async ({ track }) => {
    track(() => workflowRunContext.value);
    await handleRefresh();
  });

  return (
    <div>
      <div>
        <h4>Human Worker</h4>
        <div>
          This worker requires you to manually perform the action and then
          signal completion.
          <br />
          Click the <kbd>Perform Manual Action</kbd> button below to simulate.
        </div>
      </div>
      <br />
      <div>
        <strong>Status:</strong> {action.value?.status}
      </div>
      <div>
        <strong>Updated:</strong> {lastUpdate.value?.toLocaleTimeString()}
      </div>
      <br />
      <div>
        <button onClick$={onClick}>✅ Perform Manual Action</button>
        <span> </span>
        <button onClick$={handleRefresh}>🔃 Refresh</button>
      </div>
    </div>
  );
});

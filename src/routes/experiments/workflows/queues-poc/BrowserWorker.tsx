import {
  $,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { WorkflowActionResponse } from "./server.getActionStatus";
import { getActionStatus } from "./server.getActionStatus";
import { finishAction, startAction } from "./server.startAction";
import { WorkflowRunContext } from "~/components/workflows/run/context";

const browserWorkerActionId = 3;

/**
 * @description Given a workflow and action id,
 * @description this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$(() => {
  const workflowRunContext = useContext(WorkflowRunContext);
  const action = useSignal<Pick<
    WorkflowActionResponse,
    "workflow_run_id" | "status" | "dependenciesResolved"
  > | null>(null);
  const lastUpdate = useSignal<Date | undefined>(undefined);
  const runningPerformWorkAction = useSignal(false);

  const refreshStatus = $(async () => {
    const actionStatus = await getActionStatus({
      action_id: browserWorkerActionId,
      workflow_run_id: workflowRunContext.value.workflow_run_id,
      workflow_id: 1,
    });

    action.value = actionStatus!;
    lastUpdate.value = new Date();
  });

  useTask$(async ({ track }) => {
    track(() => workflowRunContext.value);
    await refreshStatus();
  });

  useTask$(async ({ track }) => {
    track(() => workflowRunContext.value);
    track(() => action.value);
    console.log("Workflow context updated, running tryStartBrowserWork");

    if (!workflowRunContext.value.workflow_run_id) {
      return;
    }

    const actionValue = action.value;

    if (!actionValue?.dependenciesResolved) {
      return;
    }

    const startNotRequired =
      actionValue.status === "active" ||
      actionValue.status === "success" ||
      actionValue.status === "failed";

    if (startNotRequired) {
      return;
    }

    if (runningPerformWorkAction.value) {
      return;
    }

    try {
      runningPerformWorkAction.value = true;
      const startedAction = await startAction({
        action_id: browserWorkerActionId,
        run_id: workflowRunContext.value.workflow_run_id,
      });

      action.value = startedAction!; // update the action value so that we can see that the worker is running in the UI

      await new Promise<void>((resolve) => {
        // do some fake work
        setTimeout(() => {
          resolve();
        }, 3000);
      });

      const finishedAction = await finishAction({
        action_run_id: startedAction!.id,
      });

      action.value = finishedAction!;

      workflowRunContext.value = {
        ...workflowRunContext.value,
        workflow_run_id: finishedAction!.workflow_run_id,
        last_action_run_id: finishedAction!.id,
      };
    } finally {
      runningPerformWorkAction.value = false;
    }
  });

  const statusText = useComputed$(() => {
    if (action.value?.status === "success") {
      return "Completed";
    }
    if (action.value?.status === "failed") {
      return "Failed";
    }
    if (action.value?.status === "active") {
      return "Running";
    }
    return "Pending";
  });

  return (
    <div>
      <div>
        <h4>Browser Worker</h4>
        <div>
          This worker will automatically perform the "action" when the
          dependencies in the workflow have completed.
        </div>
      </div>
      <br />
      <div>
        <strong>Dependencies:</strong>{" "}
        {action.value?.dependenciesResolved ? "Completed" : "Pending"}
      </div>
      <div>
        <strong>Status:</strong> {statusText}
      </div>
      <div>
        <strong>Updated:</strong> {lastUpdate.value?.toLocaleTimeString()}
      </div>
      <br />
      <button onClick$={refreshStatus}>🔃 Refresh</button>
    </div>
  );
});

import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { WorkflowActionResponse } from "./server.getActionStatus";
import { getActionStatus } from "./server.getActionStatus";
import { finishAction, startAction } from "./server.startAction";
const actionId = 3;

/**
 * @description Given a workflow and action id, this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$(() => {
  const action = useSignal<Pick<
    WorkflowActionResponse,
    "workflow_run_id" | "status" | "dependenciesResolved"
  > | null>(null);
  const lastUpdate = useSignal<Date | undefined>(undefined);
  const runningCheckWorkerStatus = useSignal(false);
  const runningPerformWorkAction = useSignal(false);

  useTask$(
    async ({ track }) => {
      track(runningCheckWorkerStatus);

      if (runningCheckWorkerStatus.value) {
        return;
      }

      try {
        runningCheckWorkerStatus.value = true;

        const actionStatus = await getActionStatus({
          action_id: actionId,
          workflow_id: 1,
        });

        action.value = actionStatus;
      } finally {
        lastUpdate.value = new Date();
        // wait a second before running again
        setTimeout(() => {
          runningCheckWorkerStatus.value = false;
        }, 1000);
      }
    },
    {
      eagerness: "idle",
    },
  );

  useTask$(async ({ track }) => {
    track(action);

    if (runningPerformWorkAction.value) {
      return;
    }

    const alreadyStartedAction =
      action.value?.status === "active" ||
      action.value?.status === "success" ||
      action.value?.status === "failed";

    if (alreadyStartedAction) {
      return;
    }

    const actionValue = action.value!;

    if (actionValue.dependenciesResolved) {
      try {
        runningPerformWorkAction.value = true;
        const startedAction = await startAction({
          workflow_id: 1,
          run_id: actionValue.workflow_run_id,
          action_id: actionId,
        });
        await new Promise<void>((resolve) => {
          // do some fake work
          setTimeout(() => {
            resolve();
          }, 3000);
        });

        await finishAction({
          action_run_id: startedAction!.id,
        });
        action.value = startedAction!;
      } finally {
        setTimeout(() => {
          runningPerformWorkAction.value = false;
        }, 1000);
      }
    }
  });

  return (
    <div>
      <div>
        <strong>Browser Worker</strong>
      </div>
      <div>Current Status: {action.value?.status}</div>
      <div>Last Updated: {lastUpdate.value?.toLocaleTimeString()}</div>
    </div>
  );
});

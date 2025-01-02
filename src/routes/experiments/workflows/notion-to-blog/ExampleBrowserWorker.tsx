import {
  $,
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { WorkflowActionResponse } from "./server.getActionStatus";
import { getActionStatus } from "./server.getActionStatus";
import { startAction } from "./server.startAction";
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

  const checkWorkerStatus = $(async () => {
    runningCheckWorkerStatus.value = true;
    const actionStatus = await getActionStatus({
      action_id: actionId,
      workflow_id: 1,
      run_id: undefined, // when not specified, will respond based on latest run
    });

    action.value = actionStatus;

    setTimeout(() => {
      runningCheckWorkerStatus.value = false;
    }, 3000);
  });

  useTask$(
    async ({ track }) => {
      track(runningCheckWorkerStatus);

      if (runningCheckWorkerStatus.value) {
        return;
      }

      try {
        runningCheckWorkerStatus.value = true;
        await checkWorkerStatus();
      } finally {
        lastUpdate.value = new Date();
        runningCheckWorkerStatus.value = false;
      }
    },
    {
      eagerness: "visible",
    },
  );

  useTask$(async ({ track }) => {
    track(action);

    if (runningPerformWorkAction.value) {
      return;
    }

    const alreadyCompletedAction =
      action.value?.status === "success" || action.value?.status === "failed";

    if (alreadyCompletedAction) {
      return;
    }

    const actionValue = action.value!;

    if (actionValue.dependenciesResolved) {
      try {
        runningPerformWorkAction.value = true;
        const startedAction = await startAction({
          action_id: actionId,
          workflow_id: 1,
          run_id: actionValue.workflow_run_id,
        });
        action.value = startedAction!;
      } finally {
        runningPerformWorkAction.value = false;
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

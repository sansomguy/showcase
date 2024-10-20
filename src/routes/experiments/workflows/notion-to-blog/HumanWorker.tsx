import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { fetchWorkflowAction } from "./fetchWorkflowAction";
import { canStartAction } from "./canStartAction";

export type WorkflowActionRequest = {
  workflow_id: number;
  run_id: number;
  action_id: number;
};

/**
 * @description Given a workflow and action id, this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$(() => {
  const action = useSignal<{ status: string } | null>({
    status: "unknown",
  });
  const lastUpdate = useSignal<Date | undefined>(undefined);
  const startingAction = useSignal(false);

  useVisibleTask$(() => {
    async function updateWorkerStatus() {
      lastUpdate.value = new Date();
      action.value = await fetchWorkflowAction();
      const canStart = await canStartAction({
        action_id: 3,
        workflow_id: 1,
        run_id: 1,
      });

      if (canStart) {
        startingAction.value = true;
        // a little bit so we can see that status change
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // await startAction({
        //   action_id: 3,
        //   workflow_id: 1,
        //   run_id: 1,
        // });
        startingAction.value = false;
      }

      setTimeout(async () => {
        await updateWorkerStatus();
      }, 1000);
    }

    updateWorkerStatus();
  });

  return (
    <div>
      <div>I'm a workflow worker</div>
      <div>Last Poll: {lastUpdate.value?.toTimeString()}</div>
      <div>
        Current Status:{" "}
        {(action.value?.status ?? startingAction.value)
          ? "Starting action"
          : "Action transition not satisfied"}
      </div>
    </div>
  );
});

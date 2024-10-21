import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { getActionStatus } from "./getActionStatus";
import { startAction } from "./startAction";
const actionId = 3;

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
      const actionStatus = await getActionStatus({
        action_id: 3,
        workflow_id: 1,
        run_id: undefined, // when not specified, will respond based on latest run
      });

      if (
        actionStatus.dependenciesResolved &&
        actionStatus.status === "pending"
      ) {
        startingAction.value = true;
        // a little bit so we can see that status change
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await startAction({
          action_id: 3,
          workflow_id: 1,
          run_id: actionStatus.run_id,
        });
        action.value = {
          status: "active",
        };
        startingAction.value = false;
      } else {
        startingAction.value = false;
      }

      action.value = {
        status: actionStatus.status,
      };

      lastUpdate.value = new Date();

      setTimeout(async () => {
        await updateWorkerStatus();
      }, 1000);
    }

    updateWorkerStatus();
  });

  return (
    <div>
      <div>Browser Worker</div>
      <div>Last Update: {lastUpdate.value?.toLocaleTimeString()}</div>
      <div>
        Current Status:{" "}
        {(action.value?.status ?? startingAction.value)
          ? "Starting action"
          : "Action transition not satisfied"}
      </div>
    </div>
  );
});

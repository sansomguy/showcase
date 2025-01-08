import {
  $,
  component$,
  Resource,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import { getActionStatus } from "./server.getActionStatus";
import { finishAction, startAction } from "./server.updateAction";
import { WorkflowRunContext } from "~/components/workflows/run/context";

export type WorkflowActionRequest = {
  workflow_id: number;
  run_id: number;
};

const humanAction = 4;

/**
 * @description Given a workflow and action id, this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$(() => {
  const workflowRunContext = useContext(WorkflowRunContext);

  const fetchLatestStatusResource = useResource$(async ({ track }) => {
    track(() => workflowRunContext.value);
    console.log(
      "workflowRunContext update. About to update human worker status",
    );

    const context = workflowRunContext.value;

    if (!context) {
      console.warn("No workflow run context found");
      return;
    }

    if (!context.workflow_id) {
      console.warn("Missing workflow id within human worker task");
      return;
    }

    if (!context.workflow_run_id) {
      console.warn("Missing workflow run id within human worker task");
      return;
    }

    const result = await getActionStatus({
      action_id: humanAction,
      workflow_id: context.workflow_id,
      workflow_run_id: context.workflow_run_id,
    });
    if (result) {
      return result;
    }
  });

  const doHumanWork = $(async (run_id: number) => {
    const startedAction = await startAction({
      run_id,
      action_id: humanAction,
    });

    workflowRunContext.value = {
      workflow_id: startedAction.workflow_id,
      workflow_run_id: run_id,
      last_action_run_id: startedAction.id,
      last_action_update: new Date(),
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const finishedAction = await finishAction({
      action_run_id: startedAction.id!,
    });

    workflowRunContext.value = {
      workflow_id: finishedAction.workflow_id,
      workflow_run_id: finishedAction.workflow_run_id,
      last_action_run_id: finishedAction.id,
      last_action_update: new Date(),
    };
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
      <Resource
        value={fetchLatestStatusResource}
        onPending={() => "...loading"}
        onResolved={(action) => {
          return (
            <>
              <div>
                <strong>Status:</strong> {action?.status ?? "Pending"}
              </div>
              <div>
                <strong>Updated:</strong>{" "}
                {workflowRunContext.value?.last_action_update?.toLocaleTimeString()}
              </div>
            </>
          );
        }}
      />

      <br />

      <div>
        <button
          onClick$={async () => {
            const context = workflowRunContext.value;
            if (!context?.workflow_run_id) {
              console.warn(
                "No workflow run instance was found. Start new workflow first.",
              );
              return;
            }
            await doHumanWork(context.workflow_run_id!);
          }}
        >
          ✅ Perform Manual Action
        </button>
        <span> </span>
        <button
          onClick$={async () => {
            workflowRunContext.value = workflowRunContext.value
              ? {
                  ...workflowRunContext.value,
                  last_action_update: new Date(),
                }
              : workflowRunContext.value;
          }}
        >
          🔃 Refresh
        </button>
      </div>
    </div>
  );
});

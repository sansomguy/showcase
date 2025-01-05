import {
  $,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { getActionStatus } from "./server.getActionStatus";
import type { WorkflowActionResponse } from "./server.getActionStatus";
import { finishAction, startAction } from "./server.updateAction";
import { WorkflowRunContext } from "~/components/workflows/run/context";

export type WorkflowActionRequest = {
  workflow_id: number;
  run_id: number;
};

const humanAction = 4;
type ActionViewModel = Omit<
  WorkflowActionResponse,
  "workflow_run_id" | "id"
> & {
  id: number | null;
  workflow_run_id: number | null;
};

const initialActionViewModel: ActionViewModel = {
  id: null,
  workflow_run_id: null,
  action_id: humanAction,
  dependenciesResolved: false,
  status: "pending",
};

/**
 * @description Given a workflow and action id, this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$(() => {
  const workflowRunContext = useContext(WorkflowRunContext);
  const action = useSignal<ActionViewModel>(initialActionViewModel);
  const lastUpdate = useSignal<Date>(new Date());

  const fetchLatestStatus = $(
    async (context: (typeof workflowRunContext)["value"]) => {
      console.log(
        "workflowRunContext update. About to update human worker status",
      );

      if (!context) {
        console.warn("No workflow run context found");
        return;
      }

      if (!context?.workflow_id) {
        console.warn("Missing workflow id within human worker task");
        return;
      }

      if (!context?.workflow_run_id) {
        console.warn("Missing workflow run id within human worker task");
        return;
      }

      const result = await getActionStatus({
        action_id: humanAction,
        workflow_id: context.workflow_id,
        workflow_run_id: context.workflow_run_id,
      });

      if (result) {
        action.value = result;
      } else {
        action.value = initialActionViewModel;
      }

      lastUpdate.value = new Date();
    },
  );

  useTask$(async ({ track }) => {
    track(() => workflowRunContext.value);
    await fetchLatestStatus(workflowRunContext.value);
  });

  const statusText = useComputed$(() => {
    if (action.value.status === "success") {
      return "Success";
    }

    if (action.value.status === "active") {
      return "Active";
    }

    return "pending";
  });

  const doHumanWork = $(async (run_id: number) => {
    const startedAction = await startAction({
      run_id,
      action_id: humanAction,
    });

    action.value = startedAction;

    workflowRunContext.value = {
      workflow_id: startedAction.workflow_id,
      workflow_run_id: run_id,
      last_action_run_id: startedAction.id,
    };

    console.log("Finished start action");
    console.dir(workflowRunContext.value);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const finishedAction = await finishAction({
      action_run_id: action.value.id!,
    });

    action.value = finishedAction;
    workflowRunContext.value = {
      workflow_id: finishedAction.workflow_id,
      workflow_run_id: finishedAction.workflow_run_id,
      last_action_run_id: finishedAction.id,
    };

    console.log("Finished finish action");
    console.dir(workflowRunContext.value);
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
        <strong>Status:</strong> {statusText.value}
      </div>
      <div>
        <strong>Updated:</strong> {lastUpdate.value.toLocaleString()}
      </div>
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
            await fetchLatestStatus(workflowRunContext.value);
          }}
        >
          🔃 Refresh
        </button>
      </div>
    </div>
  );
});

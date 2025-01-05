import {
  $,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { WorkflowActionResponse } from "./server.getActionStatus";
import {
  getActionMissingDependencies,
  getActionStatus,
} from "./server.getActionStatus";
import { finishAction, startAction } from "./server.updateAction";
import { WorkflowRunContext } from "~/components/workflows/run/context";

const demoWorkflowId = 1;
const browserWorkerActionId = 3;
type ActionViewModel = Omit<
  WorkflowActionResponse,
  "workflow_run_id" | "id"
> & {
  id: number | null;
  workflow_run_id: number | null;
  dependenciesResolved: boolean;
};

const initialActionViewModel: ActionViewModel = {
  id: null,
  workflow_run_id: null,
  action_id: browserWorkerActionId,
  dependenciesResolved: false,
  status: "pending",
};

/**
 * @description Given a workflow and action id,
 * @description this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$(() => {
  const workflowRunContext = useContext(WorkflowRunContext);
  const action = useSignal<ActionViewModel>({
    id: null,
    workflow_run_id: null,
    action_id: browserWorkerActionId,
    dependenciesResolved: false,
    status: "pending",
  });
  const lastUpdate = useSignal<Date | undefined>(undefined);
  const runningPerformWorkAction = useSignal(false);

  const refreshStatus = $(
    async (context: (typeof workflowRunContext)["value"]) => {
      if (!context) {
        console.warn("No workflow run context found");
        return;
      }
      if (!context.workflow_run_id) {
        console.warn("Missing workflow run id within human worker task");
        return;
      }

      if (!context.workflow_id) {
        console.warn("Missing workflow id within human worker task");
        return;
      }

      const request = {
        action_id: browserWorkerActionId,
        workflow_run_id: context.workflow_run_id,
        workflow_id: demoWorkflowId,
      };
      const actionStatusPromise = getActionStatus(request);

      const dependenciesResolvedPromise = getActionMissingDependencies(request);

      const [actionStatus, dependenciesResolved] = await Promise.all([
        actionStatusPromise,
        dependenciesResolvedPromise,
      ]);

      if (!actionStatus) {
        action.value = { ...initialActionViewModel, dependenciesResolved };
      } else {
        action.value = {
          ...actionStatus,
          dependenciesResolved,
        };
      }
      lastUpdate.value = new Date();
    },
  );

  useTask$(async ({ track }) => {
    track(() => workflowRunContext.value);

    const context = workflowRunContext.value;
    await refreshStatus(context);
  });

  useTask$(async ({ track }) => {
    track(() => workflowRunContext.value);
    track(() => action.value);

    console.log("Workflow context updated, running tryStartBrowserWork");

    if (!workflowRunContext.value?.workflow_run_id) {
      console.warn("No workflow run id found");
      return;
    }

    if (!action.value.dependenciesResolved) {
      console.warn("Dependencies not resolved");
      return;
    }
    const actionStatus = action.value.status;
    const startNotRequired =
      actionStatus === "active" ||
      actionStatus === "success" ||
      actionStatus === "failed";

    if (startNotRequired) {
      console.warn("Already started");
      return;
    }

    if (runningPerformWorkAction.value) {
      console.warn("running browser worker already...");
      return;
    }

    try {
      runningPerformWorkAction.value = true;
      const startedAction = await startAction({
        action_id: browserWorkerActionId,
        run_id: workflowRunContext.value.workflow_run_id,
      });

      // given this is a task,
      // the signals will not be updated until the task is complete :(
      action.value = startedAction!;

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
        workflow_id: finishedAction.workflow_id,
        workflow_run_id: finishedAction!.workflow_run_id,
        last_action_run_id: finishedAction!.id,
      };
    } finally {
      runningPerformWorkAction.value = false;
    }
  });

  const statusText = useComputed$(() => {
    if (action.value.status === "success") {
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
      <button
        onClick$={async () => {
          if (workflowRunContext.value?.workflow_run_id) {
            await refreshStatus(workflowRunContext.value);
          }
        }}
      >
        🔃 Refresh
      </button>
    </div>
  );
});

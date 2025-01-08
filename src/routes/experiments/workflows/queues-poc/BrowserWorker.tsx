import {
  component$,
  Resource,
  useContext,
  useResource$,
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

  const actionResource = useResource$(async ({ track }) => {
    track(() => workflowRunContext.value);
    const context = workflowRunContext.value;
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

    workflowRunContext.value = {
      ...context,
      last_action_update: new Date(),
    };

    if (!actionStatus) {
      return { ...initialActionViewModel, dependenciesResolved };
    } else {
      return {
        ...actionStatus,
        dependenciesResolved,
      };
    }
  });

  useTask$(async ({ track, cleanup }) => {
    track(() => workflowRunContext.value);
    const abortController = new AbortController();
    cleanup(() => abortController.abort());

    console.log("Workflow context updated, running tryStartBrowserWork");
    const context = workflowRunContext.value;

    if (!context) {
      return;
    }

    if (!context.workflow_run_id) {
      console.warn("No workflow run id found");
      return;
    }

    const action = await actionResource.value;
    if (!action?.dependenciesResolved) {
      console.warn("Dependencies not resolved");
      return;
    }

    const actionStatus = action.status;
    const startNotRequired =
      actionStatus === "active" ||
      actionStatus === "success" ||
      actionStatus === "failed";

    if (startNotRequired) {
      console.warn("Already started");
      return;
    }

    console.log("Starting browser worker");
    const startedAction = await startAction(abortController.signal, {
      action_id: browserWorkerActionId,
      run_id: context.workflow_run_id,
    });

    workflowRunContext.value = {
      ...context,
      last_action_run_id: startedAction.id,
      last_action_update: new Date(),
    };
  });

  useTask$(async ({ track, cleanup }) => {
    track(() => actionResource.value);

    const abortController = new AbortController();
    cleanup(() => abortController.abort());
    const action = await actionResource.value;

    if (action?.status !== "active") {
      return;
    }
    await new Promise<void>((resolve) => {
      // do some fake work
      const timeout = setTimeout(() => {
        resolve();
      }, 3000);

      cleanup(() => {
        clearTimeout(timeout);
        resolve();
      });
    });

    const actionId = action!.id!;

    const finishedAction = await finishAction(abortController.signal, {
      action_run_id: actionId,
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
        <h4>Browser Worker</h4>
        <div>
          This worker will automatically perform the "action" when the
          dependencies in the workflow have completed.
        </div>
      </div>
      <br />
      <Resource
        value={actionResource}
        onPending={() => {
          return "...fetching";
        }}
        onResolved={(action) => {
          return (
            <>
              <div>
                <strong>Dependencies:</strong>
                {action?.dependenciesResolved ? "Resolved" : "Pending"}
              </div>
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
      <button
        onClick$={async () => {
          if (workflowRunContext.value?.workflow_run_id) {
            workflowRunContext.value = {
              ...workflowRunContext.value,
            };
          }
        }}
      >
        🔃 Refresh
      </button>
    </div>
  );
});

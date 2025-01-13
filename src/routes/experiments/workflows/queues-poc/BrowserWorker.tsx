import {
  component$,
  Resource,
  useContext,
  useResource$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  getActionMissingDependencies,
  getActionStatus,
} from "./server.getActionStatus";
import { WorkflowRunContext } from "~/components/workflows/run/context";
import WorkerStatus from "./WorkerStatus";
import { finishAction, startAction } from "./server.updateAction";

const demoWorkflowId = 1;
const browserWorkerActionId = 3;

// const initialActionViewModel: ActionViewModel = {
//   id: null,
//   workflow_run_id: null,
//   action_id: browserWorkerActionId,
//   dependenciesResolved: false,
//   status: "pending",
// };

/**
 * @description Given a workflow and action id,
 * @description this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$(() => {
  const workflowRunContext = useContext(WorkflowRunContext);
  const dependeciesResolved = useResource$(async ({ track, cleanup }) => {
    track(() => workflowRunContext.value);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("retriggered"));
    const context = workflowRunContext.value;

    if (!context || !context.workflow_id || !context.workflow_run_id) {
      console.warn("No workflow run context found");
      return;
    }

    try {
      return await getActionMissingDependencies({
        action_id: browserWorkerActionId,
        workflow_run_id: context.workflow_run_id,
        workflow_id: demoWorkflowId,
      });
    } catch (e: any) {
      if (e.toString() === "retriggered") return false;
      throw e;
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track, cleanup }) => {
    track(() => workflowRunContext.value);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("retriggered"));
    const context = workflowRunContext.value;

    if (!context) {
      return;
    }

    if (!context.workflow_run_id) {
      console.warn("No workflow run id found");
      return;
    }

    if (!(await dependeciesResolved.value)) {
      console.warn("Dependencies not resolved");
      return;
    }

    const actionStatus = await getActionStatus(abortController.signal, {
      action_id: browserWorkerActionId,
      workflow_id: context.workflow_id,
      workflow_run_id: context.workflow_run_id,
    });

    const startNotRequired =
      actionStatus?.status === "active" ||
      actionStatus?.status === "success" ||
      actionStatus?.status === "failed";

    if (startNotRequired) {
      console.warn("Already started");
      return;
    }

    const startedAction = await startAction(abortController.signal, {
      action_id: browserWorkerActionId,
      workflow_run_id: context.workflow_run_id,
    });

    workflowRunContext.value = {
      ...context,
      last_action_run_id: startedAction.id,
      last_action_update: new Date(),
    };
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track, cleanup }) => {
    track(workflowRunContext);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("Retriggered"));

    const context = workflowRunContext.value;
    if (!context || !context.workflow_id || !context.workflow_run_id) {
      return;
    }

    const hasDependenciesResolved = await dependeciesResolved.value;

    if (!hasDependenciesResolved) return;

    const actionStatus = await getActionStatus(abortController.signal, {
      action_id: browserWorkerActionId,
      workflow_id: context.workflow_id,
      workflow_run_id: context.workflow_run_id,
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });

    if (actionStatus?.status === "active") {
      const finishedAction = await finishAction(abortController.signal, {
        action_run_id: actionStatus.id!,
      });

      workflowRunContext.value = {
        ...context,
        last_action_run_id: finishedAction.id,
        last_action_update: new Date(),
      };
    }
  });

  return (
    <WorkerStatus
      title="Browser Worker"
      description="This worker will automatically perform the 'action' when the dependencies in the workflow have completed."
      actionId={browserWorkerActionId}
    >
      <Resource
        value={dependeciesResolved}
        onPending={() => "Checking dependencies..."}
        onResolved={(resolved) =>
          resolved ? null : "Waiting for dependencies..."
        }
      />

      <br />
    </WorkerStatus>
  );
});

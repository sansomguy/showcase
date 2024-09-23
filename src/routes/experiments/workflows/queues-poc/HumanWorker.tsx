import { $, component$, useContext } from "@builder.io/qwik";

import { finishAction, startAction } from "./server.updateAction";
import { WorkflowRunContext } from "~/components/workflows/run/context";
import WorkerStatus from "./WorkerStatus";

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

  const doHumanWork = $(async () => {
    const workflow_run_id = workflowRunContext.value!.workflow_run_id!;
    const workflow_id = workflowRunContext.value!.workflow_id!;
    const action_id = humanAction;

    const startedAction = await startAction({
      workflow_run_id,
      action_id,
    });

    workflowRunContext.value = {
      workflow_id,
      workflow_run_id,
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
    <WorkerStatus
      title="Human Worker"
      description="This worker requires you to manually perform the action and then signal completion."
      actionId={humanAction}
    >
      <button onClick$={doHumanWork}>✅ Perform Manual Action</button>
    </WorkerStatus>
  );
  //   <div>
  //     <div>
  //       <h4>Human Worker</h4>
  //       <div>
  //         This worker requires you to manually perform the action and then
  //         signal completion.
  //         <br />
  //         Click the <kbd>Perform Manual Action</kbd> button below to simulate.
  //       </div>
  //     </div>
  //     <br />
  //     <Resource
  //       value={fetchLatestStatusResource}
  //       onPending={() => "...loading"}
  //       onResolved={(action) => {
  //         return (
  //           <>
  //             <div>
  //               <strong>Status:</strong> {action?.status ?? "Pending"}
  //             </div>
  //             <div>
  //               <strong>Updated:</strong>{" "}
  //               {workflowRunContext.value?.last_action_update?.toLocaleTimeString()}
  //             </div>
  //           </>
  //         );
  //       }}
  //     />

  //     <br />

  //     <div>
  //       <button
  //         onClick$={async () => {
  //           const context = workflowRunContext.value;
  //           if (!context?.workflow_run_id) {
  //             console.warn(
  //               "No workflow run instance was found. Start new workflow first.",
  //             );
  //             return;
  //           }
  //           await doHumanWork(context.workflow_run_id!);
  //         }}
  //       >
  //         ✅ Perform Manual Action
  //       </button>
  //       <span> </span>
  //       <button
  //         onClick$={async () => {
  //           workflowRunContext.value = workflowRunContext.value
  //             ? {
  //                 ...workflowRunContext.value,
  //                 last_action_update: new Date(),
  //               }
  //             : workflowRunContext.value;
  //         }}
  //       >
  //         🔃 Refresh
  //       </button>
  //     </div>
  //   </div>
  // );
});

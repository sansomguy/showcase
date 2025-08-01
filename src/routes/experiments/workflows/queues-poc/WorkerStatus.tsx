import {
  component$,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { WorkflowRunContext } from "~/components/workflows/run/context";
import type { WorkflowActionResponse } from "./server.getActionStatus";
import { getActionStatus } from "./server.getActionStatus";

export default component$(
  ({
    title,
    description,
    actionId,
  }: {
    actionId: number;
    title: string;
    description: string;
  }) => {
    const manualUpdate = useSignal(0);
    const actionResource = useSignal<WorkflowActionResponse | null>(null);
    const workflowRunContext = useContext(WorkflowRunContext);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(manualUpdate);
      const current = workflowRunContext.value;

      if (!current) return;

      workflowRunContext.value = {
        ...current,
        last_action_update: new Date(),
      };
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ track, cleanup }) => {
      track(() => workflowRunContext.value);

      const abortController = new AbortController();
      cleanup(() => {
        console.log("cleanup");
        abortController.abort("Retriggered");
      });

      const context = workflowRunContext.value;

      if (context && context.workflow_id && context.workflow_run_id) {
        try {
          const result = await getActionStatus(abortController.signal, {
            action_id: actionId,
            workflow_id: context.workflow_id,
            workflow_run_id: context.workflow_run_id,
          });
          actionResource.value = result;
        } catch (e: any) {
          if (e.toString() === "Retriggered") return;
          throw e;
        }
      } else {
        actionResource.value = null;
      }
    });

    return (
      <div>
        <div>
          <h4>{title}</h4>
          <div>{description}</div>
        </div>
        <br />

        <div>
          <strong>Status:</strong> {actionResource.value?.status ?? "Pending"}
        </div>
        <div>
          <strong>Updated:</strong>{" "}
          {workflowRunContext.value?.last_action_update?.toLocaleTimeString()}
        </div>
        <br />
        <Slot />
        <button
          onClick$={() => {
            manualUpdate.value = manualUpdate.value + 1;
          }}
        >
          🔃 Refresh ({manualUpdate.value})
        </button>
      </div>
    );
  },
);

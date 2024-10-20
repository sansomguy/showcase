import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import { WorkflowActionRequest } from "./ExampleBrowserWorker";
import { getLatestWorkflowRun } from "./getLatestWorkflowRun";

export const canStartAction = server$(
  async ({ action_id, workflow_id }: WorkflowActionRequest) => {
    const db = createSupabaseClient();

    const latestRun = await getLatestWorkflowRun();

    if (!latestRun) {
      return false;
    }

    const { data: workflowActionTransitions } = await db
      .from("workflow_transitions")
      .select(
        "*, from_action: workflow_actions(*, workflow_runs_action: workflow_runs_actions(*))"
      )
      .eq("from_action.workflow_runs_action.workflow_run_id", latestRun.id)
      .eq("workflow_id", workflow_id)
      .eq("to_action_id", action_id)
      .throwOnError();

    return workflowActionTransitions!.every(
      (transition) =>
        !transition.from_action ||
        transition.from_action.workflow_runs_action.every(
          (action) => action.status === "completed"
        )
    );
  }
);

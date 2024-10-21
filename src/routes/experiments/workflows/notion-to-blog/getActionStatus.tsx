import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import { getLatestWorkflowRun } from "./getLatestWorkflowRun";

export type WorkflowActionRequest = {
  workflow_id: number;
  action_id: number;
  run_id?: number; // when not specified, will respond based on latest run
};

export type WorkflowActionResponse = {
  status: string;
  dependenciesResolved: boolean;
};

export const getActionStatus = server$(
  async ({ action_id, workflow_id, run_id }: WorkflowActionRequest) => {
    const db = createSupabaseClient();

    const runId = run_id ?? (await getLatestWorkflowRun()).id;

    const { data: workflowActionTransitions } = await db
      .from("workflow_transitions")
      .select(
        "*, from_action: workflow_actions!from_action_id(*, workflow_runs_action: workflow_runs_actions(*))"
      )
      .eq("from_action.workflow_runs_action.workflow_run_id", runId)
      .eq("workflow_id", workflow_id)
      .eq("to_action_id", action_id)
      .throwOnError();

    const dependenciesResolve = workflowActionTransitions!.every(
      (transition) =>
        !transition.from_action ||
        transition.from_action.workflow_runs_action.every(
          (action) => action.status === "completed"
        )
    );

    const actionRun = await db
      .from("workflow_runs_actions")
      .select("*")
      .eq("workflow_run_id", runId)
      .eq("workflow_action_id", action_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .throwOnError();

    return {
      run_id: runId,
      status: actionRun.data?.status ?? "pending",
      dependenciesResolved: dependenciesResolve,
    };
  }
);

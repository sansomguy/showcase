import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";

export type WorkflowUpdateActionResponse = {
  id: number;
  status: number;
  action_id: number;
  workflow_id: number;
  workflow_run_id: number;
  dependenciesResolved: boolean;
};

export const startAction = server$(
  async ({ run_id, action_id }: { run_id: number; action_id: number }) => {
    const db = createSupabaseClient();

    const result = await db
      .from("workflow_runs_actions")
      .upsert({
        workflow_run_id: run_id,
        workflow_action_id: action_id,
        status: "active",
      })
      .select(
        "*, workflow_action: workflow_actions!inner(*), workflow_run: workflow_runs!inner(*)",
      )
      .single()
      .throwOnError();

    return {
      id: result.data!.id,
      status: result.data!.status,
      action_id: result.data!.workflow_action_id,
      workflow_id: result.data!.workflow_run.workflow_id,
      workflow_run_id: result.data!.workflow_run_id!,
      dependenciesResolved: true,
    };
  },
);

export const finishAction = server$(
  async ({ action_run_id }: { action_run_id: number }) => {
    const db = createSupabaseClient();
    const result = await db
      .from("workflow_runs_actions")
      .update({ status: "success" })
      .eq("id", action_run_id)
      .select(
        "*, workflow_action: workflow_actions!inner(*), workflow_run: workflow_runs!inner(*)",
      )
      .single()
      .throwOnError();

    return {
      id: result.data!.id,
      status: result.data!.status,
      action_id: result.data!.workflow_action_id,
      workflow_id: result.data!.workflow_run.workflow_id,
      workflow_run_id: result.data!.workflow_run_id!,
      dependenciesResolved: true,
    };
  },
);

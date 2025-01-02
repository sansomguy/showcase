import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import type { GetLatestWorkflowRunResponse } from "./server.getLatestWorkflowRun";
import { getLatestWorkflowRun } from "./server.getLatestWorkflowRun";
import { getWorkflowRun } from "./server.getWorkflowRun";
import type { Database } from "~/supabase/types";
import type { SupabaseClient } from "@supabase/supabase-js";

type WorkflowTransition =
  Database["public"]["Tables"]["workflow_transitions"]["Row"];

export type WorkflowActionRequest = {
  workflow_id: number;
  action_id: number;
  run_id?: number; // when not specified, will respond based on latest run
};

export type WorkflowActionResponse = {
  id?: number;
  action_id: number;
  workflow_run_id: number;
  status: string;
  dependenciesResolved: boolean;
};

export const getActionStatus = server$(
  async ({
    action_id,
    workflow_id,
    run_id,
  }: WorkflowActionRequest): Promise<WorkflowActionResponse | null> => {
    const db = createSupabaseClient();

    const workflowRun = run_id
      ? await getWorkflowRun({ run_id })
      : await getLatestWorkflowRun();

    if (!workflowRun) {
      return null;
    }

    const transitions = await findRequiredActionTransitions({
      workflow_id,
      action_id,
      db,
    });

    const dependenciesResolved = transitions.every((transition) =>
      isTransitionComplete({ workflowRun, transition }),
    );

    const { data: actionRun } = await db
      .from("workflow_runs_actions")
      .select("*")
      .eq("workflow_run_id", workflowRun.id)
      .eq("workflow_action_id", action_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .throwOnError();

    return {
      id: actionRun?.id,
      workflow_run_id: workflowRun.id,
      action_id: action_id,
      status: actionRun?.status ?? "unknown",
      dependenciesResolved: dependenciesResolved,
    };
  },
);

function isTransitionComplete({
  workflowRun,
  transition,
}: {
  workflowRun: GetLatestWorkflowRunResponse;
  transition: Pick<WorkflowTransition, "from_action_id">;
}) {
  const matchingAction = workflowRun.actions.find(
    (x) => x.workflow_action_id === transition.from_action_id,
  );

  if (!matchingAction) return false;

  return matchingAction.status === "success";
}

/**
 * @description Given a specific action_id will find all the transitions that need to be completed before it should be allowed to execute.
 */
async function findRequiredActionTransitions({
  workflow_id,
  action_id,
  db,
}: {
  workflow_id: number;
  action_id: number;
  db: SupabaseClient<Database>;
}) {
  const { data } = await db
    .from("workflow_transitions")
    .select("*, from_actions: workflow_actions!from_action_id!inner(*)")
    .eq("workflow_id", workflow_id)
    .eq("to_action_id", action_id)
    .throwOnError();

  return data ?? [];
}

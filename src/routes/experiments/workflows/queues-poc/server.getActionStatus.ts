import { server$, z } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import type { GetWorkflowRunResponse } from "./server.getWorkflowRun";
import { getWorkflowRun } from "./server.getWorkflowRun";
import type { Database } from "~/supabase/types";
import type { SupabaseClient } from "@supabase/supabase-js";

type WorkflowTransition =
  Database["public"]["Tables"]["workflow_transitions"]["Row"];

const workflowActionStatusRequest = z.object({
  action_id: z.number(),
  workflow_id: z.number(),
  workflow_run_id: z.number(),
});

export type WorkflowActionRequest = z.infer<typeof workflowActionStatusRequest>;

export type WorkflowActionResponse = {
  id: number;
  workflow_run_id: number;
  action_id: number;
  status: string;
};

export const getActionStatus = server$(
  async (
    request: WorkflowActionRequest,
  ): Promise<WorkflowActionResponse | null> => {
    const db = createSupabaseClient();

    const { action_id, workflow_run_id } =
      workflowActionStatusRequest.parse(request);

    const workflowRun = await getWorkflowRun({ run_id: workflow_run_id });

    if (!workflowRun.id) {
      throw new Error(`Workflow run not found with id: ${workflow_run_id}`);
    }

    const { data: actionRun } = await db
      .from("workflow_runs_actions")
      .select("*")
      .eq("workflow_run_id", workflowRun.id)
      .eq("workflow_action_id", action_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .throwOnError();

    if (!actionRun) {
      return null;
    }

    return {
      id: actionRun!.id,
      status: actionRun!.status,
      workflow_run_id: workflowRun.id,
      action_id: action_id,
    };
  },
);

function isTransitionComplete({
  workflowRun,
  transition,
}: {
  workflowRun: GetWorkflowRunResponse | null;
  transition: Pick<WorkflowTransition, "from_action_id">;
}) {
  if (!workflowRun) {
    return false;
  }

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

export const checkIsActionDependenciesResolved = server$(
  async (request: WorkflowActionRequest) => {
    const db = createSupabaseClient();

    const { action_id, workflow_id, workflow_run_id } =
      workflowActionStatusRequest.parse(request);

    const workflowRun = await getWorkflowRun({ run_id: workflow_run_id });

    const transitions = await findRequiredActionTransitions({
      workflow_id,
      action_id,
      db,
    });

    const dependenciesResolved = transitions.every((transition) =>
      isTransitionComplete({ workflowRun, transition }),
    );

    return dependenciesResolved;
  },
);

export const getActionMissingDependencies = server$(
  checkIsActionDependenciesResolved,
);

import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";

import type { Database } from "~/supabase/types";
type WorkflowRun = Database["public"]["Tables"]["workflow_runs"]["Row"];
type WorkflowRunAction =
  Database["public"]["Tables"]["workflow_runs_actions"]["Row"];

export type GetWorkflowRunResponse = WorkflowRun & {
  status: "pending" | "active" | "success" | "failed";
  actions: WorkflowRunAction[];
};

export const getWorkflowRun = server$(
  async ({ run_id }: { run_id: number }): Promise<GetWorkflowRunResponse> => {
    const db = createSupabaseClient();

    const workflowStatusPromise = determineWorkflowStatus(run_id);

    const runPromise = db
      .from("workflow_runs")
      .select("*, actions: workflow_runs_actions(*)")
      .eq("id", run_id)
      .order("created_at", { ascending: false })
      .single()
      .throwOnError();

    const [run, workflowStatus] = await Promise.all([
      runPromise,
      workflowStatusPromise,
    ]);

    return {
      actions: run.data!.actions,
      created_at: run.data!.created_at,
      id: run.data!.id,
      workflow_id: run.data!.workflow_id,
      status: workflowStatus,
    };
  },
);

export const getLatestWorkflowRun = server$(async function getLatestWorkflowRun(
  workflow_id: number,
): Promise<GetWorkflowRunResponse | null> {
  const db = createSupabaseClient();
  const { data: run } = await db
    .from("workflow_runs")
    .select("id, created_at, workflow_id")
    .eq("workflow_id", workflow_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()
    .throwOnError();

  if (run) {
    return await getWorkflowRun({ run_id: run.id });
  }

  return null;
});

export const determineWorkflowStatus = server$(
  async (workflow_run_id: number) => {
    const db = createSupabaseClient();

    const { data: workflow_run } = await db
      .from("workflow_runs")
      .select("*")
      .eq("id", workflow_run_id)
      .single()
      .throwOnError();

    const workflowId = workflow_run!.workflow_id;

    const requiredActionsPromise = db
      .from("workflow_transitions")
      .select("*")
      .eq("workflow_id", workflowId)
      .throwOnError()
      .then(({ data: transitions }) =>
        transitions!.map((transition) => ({
          workflow_action_id: transition.to_action_id,
        })),
      );

    const actionInstancesPromise = db
      .from("workflow_runs_actions")
      .select("*")
      .eq("workflow_run_id", workflow_run_id)
      .throwOnError()
      .then(({ data: actions }) => actions!);

    const [requirements, actionInstances] = await Promise.all([
      requiredActionsPromise,
      actionInstancesPromise,
    ]);

    switch (true) {
      case actionInstances.length === 0:
        return "pending";
      case actionInstances.some((instance) => instance.status === "failed"):
        return "failed";
      case actionInstances.length !== requirements.length:
        return "active";

      case requirements.every((requirement) =>
        actionInstances.find(
          (instance) =>
            instance.workflow_action_id === requirement.workflow_action_id &&
            instance.status === "success",
        ),
      ):
        return "success";
      default:
        return "pending";
    }
  },
);

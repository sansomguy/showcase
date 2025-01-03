import type { Database } from "~/supabase/types";
import { createSupabaseClient } from "~/supabase";

type WorkflowRun = Database["public"]["Tables"]["workflow_runs"]["Row"];
type WorkflowRunAction =
  Database["public"]["Tables"]["workflow_runs_actions"]["Row"];

export type GetLatestWorkflowRunResponse = WorkflowRun & {
  actions: WorkflowRunAction[];
};

export async function getLatestWorkflowRun() {
  const db = createSupabaseClient();
  const { data: runs } = await db
    .from("workflow_runs")
    .select("*, actions: workflow_runs_actions(*)")
    .eq("workflow_id", 1)
    .order("created_at", { ascending: false })
    .limit(1)
    .throwOnError();

  const latestWorkflow = runs![0];

  return latestWorkflow;
}

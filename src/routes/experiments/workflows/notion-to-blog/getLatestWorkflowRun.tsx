import { createSupabaseClient } from "~/supabase";

export async function getLatestWorkflowRun() {
  const db = createSupabaseClient();
  const { data: runs } = await db
    .from("workflow_runs")
    .select("*")
    .eq("workflow_id", 1)
    .order("created_at", { ascending: false })
    .limit(1)
    .throwOnError();

  const latestWorkflow = runs![0];

  return latestWorkflow;
}

import { createSupabaseClient } from "~/supabase";

export async function getLatestWorkflowRun() {
  const db = createSupabaseClient();
  const { data: latestWorkflow } = await db
    .from("workflow_runs")
    .select("*")
    .eq("workflow_id", 1)
    .order("created_at", { ascending: false })
    .single()
    .throwOnError();

  return latestWorkflow;
}

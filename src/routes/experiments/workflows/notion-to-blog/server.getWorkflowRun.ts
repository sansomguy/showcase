import { createSupabaseClient } from "~/supabase";

export async function getWorkflowRun({ run_id }: { run_id: number }) {
  const db = createSupabaseClient();
  const { data: run } = await db
    .from("workflow_runs")
    .select("*, actions: workflow_runs_actions(*)")
    .eq("id", run_id)
    .order("created_at", { ascending: false })
    .single()
    .throwOnError();

  return run;
}

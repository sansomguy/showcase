import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import { getLatestWorkflowRun } from "./getLatestWorkflowRun";

export const fetchWorkflowAction = server$(async function (
  actionId: number
): Promise<{
  status: string;
} | null> {
  const db = createSupabaseClient();

  const latestWorkflow = await getLatestWorkflowRun();

  const { data: latestBrowserWorkerAction } = await db
    .from("workflow_runs_actions")
    .select("*")
    .eq("workflow_run_id", latestWorkflow!.id)
    .eq("workflow_action_id", actionId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()
    .throwOnError();

  return latestBrowserWorkerAction ?? { status: "pending" };
});

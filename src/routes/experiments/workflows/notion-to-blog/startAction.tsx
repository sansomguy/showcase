import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";

export const startAction = server$(async ({ run_id, action_id }) => {
  const db = createSupabaseClient();
  const result = await db
    .from("workflow_runs_actions")
    .upsert({
      workflow_run_id: run_id,
      workflow_action_id: action_id,
      status: "active",
    })
    .select("*")
    .single()
    .throwOnError();

  return result.data!;
});

import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import { WorkflowActionRequest } from "./ExampleBrowserWorker";

export const startAction = server$(
  async ({ run_id, action_id }: WorkflowActionRequest) => {
    const db = createSupabaseClient();
    const result = await db
      .from("workflow_runs_actions")
      .insert({
        workflow_run_id: run_id,
        workflow_action_id: action_id,
        status: "pending",
      })
      .select("*")
      .single()
      .throwOnError();

    return result.data!;
  }
);

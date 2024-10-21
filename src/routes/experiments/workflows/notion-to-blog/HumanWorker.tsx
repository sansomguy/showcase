import {
  $,
  component$,
  QRL,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import { fetchWorkflowAction } from "./fetchWorkflowAction";
import { getLatestWorkflowRun } from "./getLatestWorkflowRun";
import { startAction } from "./startAction";

export type WorkflowActionRequest = {
  workflow_id: number;
  run_id: number;
  action_id: number;
};

const humanAction = 4;

const doHumanWork = server$(async () => {
  const latestRun = await getLatestWorkflowRun();
  const startedAction = await startAction({
    run_id: latestRun!.id,
    action_id: humanAction,
    workflow_id: 1,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const db = createSupabaseClient();
  const successAction = await db
    .from("workflow_runs_actions")
    .update({ status: "success" })
    .eq("id", startedAction!.id)
    .select("*")
    .single()
    .throwOnError();

  return successAction.data!;
});

/**
 * @description Given a workflow and action id, this component will wait for a workflow action to become "pending" and then it will run.
 */
export default component$((props: { onWorkDone$: QRL<() => void> }) => {
  const action = useSignal<{ status: string } | null>({
    status: "pending",
  });

  const showConsole = $(() => {
    props.onWorkDone$();
  });

  useVisibleTask$(() => {
    async function pullStatus() {
      action.value = await fetchWorkflowAction(4);
      setTimeout(async () => {
        await pullStatus();
      }, 1000);
    }

    pullStatus();
  });

  return (
    <div>
      <div>Human Worker</div>
      <button onClick$={showConsole}>Do work</button>
      <div>Current Status: {action.value?.status}</div>
    </div>
  );
});

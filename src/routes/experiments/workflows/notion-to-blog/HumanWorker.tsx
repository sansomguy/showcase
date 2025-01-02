import type { QRL } from "@builder.io/qwik";
import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { createSupabaseClient } from "~/supabase";
import { getLatestWorkflowRun } from "./server.getLatestWorkflowRun";
import { startAction } from "./server.startAction";
import { getActionStatus } from "./server.getActionStatus";

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
export default component$(
  ({ onWorkDone$ }: { onWorkDone$: QRL<() => void> }) => {
    const action = useSignal<string | null>("unknown");
    const lastUpdate = useSignal<Date | null>(null);

    const onClick = $(async () => {
      await doHumanWork();
      await onWorkDone$();
    });

    useTask$(
      () => {
        setInterval(async () => {
          const result = await getActionStatus({
            workflow_id: 1,
            action_id: humanAction,
          });
          action.value = result ? result.status : null;
          lastUpdate.value = new Date();
        }, 1000);
      },
      {
        eagerness: "idle",
      },
    );

    return (
      <div>
        <div>
          <strong>Human Worker</strong>
        </div>
        <div>Current Status: {action.value}</div>
        <div>Last Updated: {lastUpdate.value?.toLocaleTimeString()}</div>
        <button onClick$={onClick}>Do work</button>
      </div>
    );
  },
);

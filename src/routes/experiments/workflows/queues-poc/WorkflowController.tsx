import {
  $,
  component$,
  useContextProvider,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
// import WorkflowRun from "~/components/workflows";
import BrowserWorker from "./BrowserWorker";
import HumanWorker from "./HumanWorker";
import StartNewWorkflowButton from "./StartNewWorkflow";
import type { GetNodesAndEdgesForRunResponse } from "~/components/workflows/server.getNodesAndEdges";
import getNodesAndEdges from "~/components/workflows/server.getNodesAndEdges";
import type { WorkflowRunContextValue } from "~/components/workflows/run/context";
import { WorkflowRunContext } from "~/components/workflows/run/context";
import { QWorkflowVisualization } from "~/components/workflows/run/index.react";
import { getLatestWorkflowRun } from "./server.getLatestWorkflowRun";

const demoWorkflowId = 1;

export default component$(() => {
  const workflowRunContext = useSignal<WorkflowRunContextValue>({
    workflow_id: 1,
    workflow_run_id: null,
    last_action_run_id: null,
  });
  useContextProvider(WorkflowRunContext, workflowRunContext);
  const nodesAndEdges = useSignal<GetNodesAndEdgesForRunResponse | null>(null);

  const fetchLatestNodesAndEdges = $(async () => {
    const workflow_run_id = workflowRunContext.value.workflow_run_id;

    const workflowSpecifier = workflow_run_id
      ? { workflow_run_id }
      : {
          workflow_id: demoWorkflowId,
        };

    nodesAndEdges.value = await getNodesAndEdges(workflowSpecifier);
  });

  const setupInitialContext = $(async () => {
    // fetch latest workflow if it exists for this user
    const workflowRun = await getLatestWorkflowRun();

    const earliestDate = new Date(0);
    const nullSafeDate = (date: string | null) =>
      date ? new Date(Date.parse(date)) : earliestDate;
    const unsortedActions = [...workflowRun.actions];

    const sortedByMostRecentAction = unsortedActions.sort((a, b) =>
      nullSafeDate(a.finished_at) > nullSafeDate(b.finished_at) ? -1 : 1,
    );

    const last_action_run_id = sortedByMostRecentAction.length
      ? (sortedByMostRecentAction[0]?.id ?? null)
      : null;

    workflowRunContext.value = {
      workflow_id: workflowRun.workflow_id,
      workflow_run_id: workflowRun.id,
      last_action_run_id,
    };
  });

  useTask$(async () => {
    await setupInitialContext();
  });

  useTask$(async ({ track }) => {
    track(workflowRunContext);
    await fetchLatestNodesAndEdges();
  });

  return (
    <>
      <StartNewWorkflowButton />
      <hr />
      {nodesAndEdges.value ? (
        <QWorkflowVisualization
          edges={nodesAndEdges.value.edges}
          nodes={nodesAndEdges.value.nodes}
        />
      ) : null}
      <HumanWorker />
      <hr />
      <BrowserWorker />
      <hr />
    </>
  );
});

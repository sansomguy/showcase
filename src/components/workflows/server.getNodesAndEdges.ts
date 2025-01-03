import { server$ } from "@builder.io/qwik-city";
import type { EdgeMarker, Edge } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";
import { createSupabaseClient } from "~/supabase";
import type { Database } from "~/supabase/types";

type WorkflowAction = Database["public"]["Tables"]["workflow_actions"]["Row"];

export type GetNodesAndEdgesForRunResponse = {
  nodes: {
    id: string;
    position: {
      x: number;
      y: number;
    };
    data: {
      label: string;
    };
  }[];
  edges: Edge[];
};

type GetNodesAndEdgesForRunRequest =
  | { workflow_run_id: number }
  | { workflow_id: number };
export default server$(async function getNodesAndEdgesForRun(
  props: GetNodesAndEdgesForRunRequest,
): Promise<GetNodesAndEdgesForRunResponse> {
  const db = createSupabaseClient();
  let runsQuery = db.from("workflow_runs").select(
    `*,
      actions: workflow_runs_actions(*),
      workflow: workflows!inner(
        *,
        transitions: workflow_transitions(*, to_action: workflow_actions!to_action_id(*)),
        conditions: workflow_conditions(*)
      )`,
  );

  if ("workflow_run_id" in props) {
    runsQuery = runsQuery.eq("id", props.workflow_run_id);
  } else {
    runsQuery = runsQuery.eq("workflow.id", props.workflow_id);
  }
  runsQuery = runsQuery.order("created_at", { ascending: false }).limit(1);

  const runsPromise =
    "workflow_run_id" in props
      ? runsQuery.single().throwOnError()
      : runsQuery.maybeSingle().throwOnError();

  const runs = await runsPromise;

  if (!runs.data) {
    return {
      nodes: [],
      edges: [],
    };
  }

  const latestWorkflowRun = runs.data!;

  const allWorkflowActions = latestWorkflowRun.workflow.transitions
    .flatMap((x) => x.to_action)
    .reduce(
      (acc, action) => {
        return {
          ...acc,
          [`${action.id}`]: action,
        };
      },
      {} as Record<string, WorkflowAction>,
    );

  const actionNodes = Object.values(allWorkflowActions).map((action, i) => {
    const type = action.name === "start" ? "start" : "process";
    const runAction = latestWorkflowRun.actions.find(
      (x) => x.workflow_action_id === action.id,
    );

    return {
      id: `${action.id}`,
      type,
      position: { x: 200, y: 100 + i * 100 },
      data: { label: action.name, status: runAction?.status.toLowerCase() },
    };
  });

  const conditionNodes = latestWorkflowRun.workflow.conditions.map(
    (condition, i) => ({
      id: `${condition.id}`,
      position: { x: 200, y: 100 + i * 100 },
      data: { label: condition.name },
    }),
  );

  const actionEdges: Edge[] = latestWorkflowRun.workflow.transitions
    .filter((x) => x.to_action_id)
    .map((transition) => ({
      id: `${transition.id!}`,
      source: `${transition.from_action_id!}`,
      target: `${transition.to_action_id!}`,
      type: "step",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      } satisfies EdgeMarker,
    }));

  const conditionEdges: Edge[] = latestWorkflowRun.workflow.transitions
    .filter((x) => x.to_condition)
    .map((transition) => ({
      id: `${transition.id!}`,
      source: `${transition.from_action_id!}`,
      target: `${transition.to_condition!}`,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      } satisfies EdgeMarker,
    }));

  return {
    nodes: [...actionNodes, ...conditionNodes],
    edges: [...actionEdges, ...conditionEdges],
  };
});

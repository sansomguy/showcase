/** @jsxImportSource react */

import { routeLoader$ } from "@builder.io/qwik-city";
import { qwikify$ } from "@builder.io/qwik-react";
import Dagre from "@dagrejs/dagre";
import type { Edge, Node, EdgeMarker } from "@xyflow/react";
import {
  Position,
  ReactFlowProvider,
  useReactFlow,
  MarkerType,
} from "@xyflow/react";
import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlow,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "~/components/workflows/styles.css";
import { useCallback, useEffect, useMemo } from "react";
import { createSupabaseClient } from "~/supabase";
import { Process } from "../nodes/process";
import { Start } from "../nodes/start";

// eslint-disable-next-line qwik/loader-location
export const useWorkflowLoader = routeLoader$(async () => {
  const db = createSupabaseClient();
  const runs = await db
    .from("workflow_runs")
    .select(
      `*,
      actions: workflow_runs_actions(*),
      workflow: workflows(
        *,
        transitions: workflow_transitions(*),
        actions: workflow_actions(*),
        conditions: workflow_conditions(*)
      )`,
    )
    .order("created_at", { ascending: false })
    .single()
    .throwOnError();

  const actionNodes =
    runs.data?.workflow?.actions.map((action, i) => {
      const type = action.name === "start" ? "start" : "process";
      const run = runs.data.actions.find(
        (x) => x.workflow_action_id === action.id,
      );

      console.log("run", run);

      return {
        id: `${action.id}`,
        type,
        position: { x: 200, y: 100 + i * 100 },
        data: { label: action.name, status: run?.status.toLowerCase() },
      };
    }) ?? [];

  const conditionNodes =
    runs.data?.workflow?.conditions.map((condition, i) => ({
      id: `${condition.id}`,
      position: { x: 200, y: 100 + i * 100 },
      data: { label: condition.name },
    })) ?? [];

  const actionEdges: Edge[] =
    runs.data?.workflow?.transitions
      .filter((x) => x.to_action)
      .map((transition) => ({
        id: `${transition.id!}`,
        source: `${transition.from_action!}`,
        target: `${transition.to_action!}`,
        type: "step",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        } satisfies EdgeMarker,
      })) ?? [];

  const conditionEdges: Edge[] =
    runs.data?.workflow?.transitions
      .filter((x) => x.to_condition)
      .map((transition) => ({
        id: `${transition.id!}`,
        source: `${transition.from_action!}`,
        target: `${transition.to_condition!}`,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        } satisfies EdgeMarker,
      })) ?? [];

  return {
    nodes: [...actionNodes, ...conditionNodes],
    edges: [...actionEdges, ...conditionEdges],
  };
});

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR" });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 200,
      height: node.measured?.height ?? 50,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 200) / 2;
      const y = position.y - (node.measured?.height ?? 50) / 2;

      return {
        ...node,
        position: { x, y },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      } satisfies Node;
    }),
    edges,
  };
};

function WorkflowRun({
  nodes: initialNodes,
  edges: initialEdges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => {
    return {
      process: Process,
      start: Start,
    } as const;
  }, []);

  const onLayout = useCallback(
    ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
      const layouted = getLayoutedElements(nodes, edges);

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [fitView],
  );

  useEffect(() => {
    onLayout({ nodes, edges });
  }, []);

  return (
    <div style={{ width: "100%", height: "calc(100vh - calc(60px + 1.5rem))" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        colorMode="dark"
        onLoad={() => onLayout({ nodes, edges })}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 20 }}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

const WithProvider = (props: { edges: Edge[]; nodes: Node[] }) => {
  return (
    <ReactFlowProvider>
      <WorkflowRun edges={props.edges} nodes={props.nodes} />
    </ReactFlowProvider>
  );
};

export const WorkFlowRunQwikify = qwikify$(WithProvider, {
  eagerness: "idle",
});

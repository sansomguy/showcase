/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import Dagre from "@dagrejs/dagre";
import type { Edge, Node } from "@xyflow/react";
import {
  Background,
  BackgroundVariant,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo } from "react";
import "~/components/workflows/styles.css";

import { Process } from "../nodes/process";
import { Start } from "../nodes/start";
import type { GetNodesAndEdgesForRunResponse } from "../server.getNodesAndEdges";

// eslint-disable-next-line qwik/loader-location

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

function WorkflowVisualization(props: { nodes: Node[]; edges: Edge[] }) {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);

  useEffect(() => {
    setNodes(props.nodes);
    setEdges(props.edges);

    onLayout({ nodes: props.nodes, edges: props.edges });
  }, [props.nodes, props.edges]);

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

const WithProvider = (props: GetNodesAndEdgesForRunResponse) => {
  return (
    <ReactFlowProvider>
      <WorkflowVisualization edges={props.edges} nodes={props.nodes} />
    </ReactFlowProvider>
  );
};

export const QWorkflowVisualization = qwikify$(WithProvider, {
  eagerness: "idle",
});

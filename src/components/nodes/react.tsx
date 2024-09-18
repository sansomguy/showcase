/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import {
  Background,
  BackgroundVariant,
  Edge,
  MiniMap,
  Node,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

function WorkflowRun({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export const QGreetings = qwikify$(WorkflowRun, { eagerness: "idle" });

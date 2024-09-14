/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function Demo() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export const QGreetings = qwikify$(Demo, { eagerness: "idle" });

import { component$ } from "@builder.io/qwik";
import { QWorkflowVisualization } from "./run/index.react";
import type { GetNodesAndEdgesForRunResponse } from "./server.getNodesAndEdges";

export default component$(
  ({ value }: { value: GetNodesAndEdgesForRunResponse }) => {
    return <QWorkflowVisualization edges={value.edges} nodes={value.nodes} />;
  },
);

import type { Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";

export type WorkflowRunContextValue = {
  workflow_id: number;
  workflow_run_id: number | null;
  last_action_run_id: number | null;
};
export const WorkflowRunContext =
  createContextId<Signal<WorkflowRunContextValue | null>>("workflows.run");

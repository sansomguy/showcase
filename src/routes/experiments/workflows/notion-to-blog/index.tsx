import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { QGreetings } from "~/components/nodes/react";
import { createSupabaseClient } from "~/supabase";

const useWorkflowLoader = routeLoader$(async () => {
  const db = createSupabaseClient();
  const runs = await db
    .from("workflow_runs")
    .select(
      `*, 
      workflow: workflows(
        *,
        transitions: workflow_transitions(*),
        actions: workflow_actions(*),
        conditions: workflow_conditions(*)
      )`
    )
    .order("created_at", { ascending: false })
    .single()
    .throwOnError();

  const actionNodes =
    runs.data?.workflow?.actions.map((action, i) => ({
      id: `${action.id}`,
      position: { x: 0, y: i * 100 },
      data: { label: action.name },
    })) ?? [];

  const conditionNodes =
    runs.data?.workflow?.conditions.map((condition) => ({
      id: `${condition.id}`,
      position: { x: 0, y: 0 },
      data: { label: condition.name },
    })) ?? [];

  const actionEdges =
    runs.data?.workflow?.transitions
      .filter((x) => x.to_action)
      .map((transition) => ({
        id: `${transition.id!}`,
        source: `${transition.from_action!}`,
        target: `${transition.to_action!}`,
      })) ?? [];

  const conditionEdges =
    runs.data?.workflow?.transitions
      .filter((x) => x.to_condition)
      .map((transition) => ({
        id: `${transition.id!}`,
        source: `${transition.from_action!}`,
        target: `${transition.to_condition!}`,
      })) ?? [];

  return {
    nodes: [...actionNodes, ...conditionNodes],
    edges: [...actionEdges, ...conditionEdges],
  };
});

export default component$(() => {
  const loaderResult = useWorkflowLoader();

  return (
    <div>
      <QGreetings
        edges={loaderResult.value.edges}
        nodes={loaderResult.value.nodes}
      />
    </div>
  );
});

export const head: DocumentHead = {
  frontmatter: {
    breadcrumbs: false,
  },
};

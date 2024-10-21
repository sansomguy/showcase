import { $, component$ } from "@builder.io/qwik";
import WorkflowRun from "~/components/workflows";
import ExampleBrowserWorker from "./ExampleBrowserWorker";
import HumanWorker from "./HumanWorker";
import RestartButton from "./RestartWorkflowButton";

export default component$(() => {
  const doSomething = $(() => {});

  return (
    <>
      <RestartButton />
      <hr />
      <HumanWorker onWorkDone$={doSomething} />
      <hr />
      <ExampleBrowserWorker />
      <hr />
      <WorkflowRun />
    </>
  );
});

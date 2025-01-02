import { $, component$ } from "@builder.io/qwik";
import WorkflowRun from "~/components/workflows";
import BrowserWorker from "./BrowserWorker";
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
      <BrowserWorker />
      <hr />
      <WorkflowRun />
    </>
  );
});

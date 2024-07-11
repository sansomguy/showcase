import WorkerSVG from "~/media/worker.svg?jsx";
import BrainSVG from "~/media/brain.svg?jsx";
import { component$ } from "@builder.io/qwik";

type IconProps = {
  title: string;
};

export default component$(({ title }: IconProps) => {
  switch (title) {
    case "Projects":
      return <WorkerSVG />;
    case "Thoughts":
      return <BrainSVG />;
    default:
      return <></>;
  }
});

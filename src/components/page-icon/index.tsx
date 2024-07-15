import WorkerSVG from "~/media/worker.svg?jsx";
import BrainSVG from "~/media/brain.svg?jsx";
import MeSVG from "~/media/me.svg?jsx";
import { component$ } from "@builder.io/qwik";

type IconProps = {
  title: string;
};

export default component$(({ title }: IconProps) => {
  switch (title) {
    case "Josh Sansom":
      return <MeSVG />;
    case "Work":
      return <WorkerSVG />;
    case "Thoughts":
      return <BrainSVG />;
    default:
      return <></>;
  }
});

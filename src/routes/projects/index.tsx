import { component$ } from "@builder.io/qwik";

import WorkerSVG from "~/media/worker.svg?jsx";
import PageTitle from "~/components/page-title";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section>
      <PageTitle>
        <span>
          <WorkerSVG />
        </span>
      </PageTitle>
      <ul>
        <li>
          <a href="#">Motocap</a>
        </li>
        <li>
          <a href="#">data2svg</a>
        </li>
        <li>
          <a href="#">AI.Rules</a>
        </li>
        <li>Appointment / Calendar</li>
      </ul>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Projects",
  meta: [
    {
      name: "Josh Sansom | Projects",
      content: "What I've been working on.",
    },
  ],
};

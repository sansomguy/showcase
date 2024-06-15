import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./style.css?inline";
import Title from "~/components/title";
import WorkerSVG from "~/media/worker.svg?jsx";
import PageTitle from "~/components/page-title";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <PageTitle>
        <WorkerSVG  />
        <Title title="Projects" />
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
    </>
  );
});

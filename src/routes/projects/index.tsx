import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";

import styles from "./style.css?inline";
import Title from "~/components/title";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <section>
      <Title title="Projects" />

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
      <div id="animation">
        <div id="box"></div>
        <div id="hill"></div>
      </div>
    </section>
  );
});

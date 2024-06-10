import { component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import Title from "~/components/title";

export default component$(() => {
  return (
    <section>
      <Title title="Projects" />
      <p>TODO - never ending box somehow integrate into the list below...</p>
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
      </ul>
    </section>
  );
});

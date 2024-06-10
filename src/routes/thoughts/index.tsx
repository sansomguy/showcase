import { component$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import Title from "~/components/title";

export default component$(() => {
  return (
    <section>
      <Title title="Thoughts" />
      <p>TODO - floating brain animation</p>
    </section>
  );
});

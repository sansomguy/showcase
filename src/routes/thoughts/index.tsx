import { component$ } from "@builder.io/qwik";

import BrainSVG from "~/media/brain.svg?jsx";
import PageTitle from "~/components/page-title";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section>
      <PageTitle>
        <span>
          <BrainSVG />
        </span>
      </PageTitle>

      <p>
        I swear, I have some thoughts.
        <br />I just haven't written them down yet...
      </p>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Thoughts",
  meta: [
    {
      name: "Thoughts",
      content: "What I've been thinking about.",
    },
  ],
};

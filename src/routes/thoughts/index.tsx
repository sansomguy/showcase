import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

import Title from "~/components/title";
import BrainSVG from "~/media/brain.svg?jsx";
import PageTitle from "~/components/page-title";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <PageTitle>
        <BrainSVG />
        <Title title="Thoughts" />
      </PageTitle>

      <p>
        I swear, I have some thoughts.
        <br />I just haven't written them down yet...
      </p>
    </>
  );
});

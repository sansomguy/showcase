import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import ProfilePhoto from "~/media/profile.jpeg?inline";
import PageTitle from "~/components/page-title";

export default component$(() => {
  return (
    <>
    <section>
      <figure><img width={640} height={480} src={ProfilePhoto} alt="Profile photo" /></figure>
    </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "About",
  meta: [
    {
      name: "Josh Sansom | About",
      content: "A little bit about Josh.",
    },
  ],
};

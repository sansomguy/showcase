import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section>
      <h1>History</h1>
      <p>
        
      </p>
      <aside>
        <p>
          Little bio information to tell my little story.
          <br />
          What should this story include?
        </p>

        <ul>
          <li>Where I'm from</li>
          <li>What I do</li>
          <li>What I plan to do</li>
        </ul>
      </aside>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Josh Sansom | About",
  meta: [
    {
      name: "About",
      content: "A little bit about Josh.",
    },
  ],
};

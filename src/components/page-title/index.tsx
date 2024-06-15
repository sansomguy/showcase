import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./style.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="page-title">
      <Slot />
    </div>
  );
});

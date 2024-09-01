import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./index.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="side-bar-layout">
      <div class="side-bar-layout__sidebar">
        <Slot name="side-bar" />
      </div>
      <div class="side-bar-layout__main">
        <Slot name="main" />
      </div>
    </div>
  );
});

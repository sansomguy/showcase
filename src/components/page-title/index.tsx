import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

import Title from "../title";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);
  const { title } = useDocumentHead();

  return (
    <div class="page-title">
      <Title title={title} />
      <Slot />
    </div>
  );
});

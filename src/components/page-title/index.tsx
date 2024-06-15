import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

import Title from "../title";
import styles from "./style.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const { title } = useDocumentHead();

  return (
    <div class="page-title">
      <Slot />
      <Title title={title} />
    </div>
  );
});

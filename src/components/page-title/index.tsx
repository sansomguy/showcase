import { component$, useStyles$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

import Title from "../title";
import styles from "./style.css?inline";
import PageIcon from "../page-icon";

export default component$(() => {
  useStyles$(styles);
  const head = useDocumentHead();


  return (
    <div class="page-title">
      <Title title={head.title ?? 'Huh? What page is this?'} />
      <div class="page-title__icon">
        <PageIcon title={head.title} />
      </div>
    </div>
  );
});

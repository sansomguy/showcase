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
      <div class="page-title__inner">
        <Title title={head.title} />
        <div class="page-title__icon">
          <PageIcon title={head.title} />
        </div>
      </div>
    </div>
  );
});

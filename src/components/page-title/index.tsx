import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

import Title from "../title";
import styles from "./style.css?inline";

type Props = {
  title?: string;
};
export default component$(({ title }: Props) => {
  useStyles$(styles);
  const head = useDocumentHead();

  return (
    <div class="page-title">
      <Title title={title ?? head.title} />
      <Slot />
    </div>
  );
});

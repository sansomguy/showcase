import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./index.css?inline";

type Props = {columnReverse?: boolean}
export default component$((props: Props) => {
  useStyles$(styles);

  return (
    <div class={`two-columns ${props.columnReverse ? 'two-columns-column-reverse' : ''}`}>
      <div class="two-columns__column two-columns__column--left">
        <Slot name="left" />
      </div>
      <div class="two-columns__column two-columns__column--right">
        <Slot name="right" />
      </div>
    </div>
  );
});

import { $, component$, type QRL, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./index.css?inline";

type Props = {
  onRequestClose$: QRL<() => void>;
};
export default component$(({onRequestClose$}: Props) => {
  useStyles$(styles);



  const handleCloseKey = $((e: KeyboardEvent) => {
    e.key === "Escape" && onRequestClose$();
  });

  const stopPropagation = $((e: Event) => {
    e.stopPropagation();
  });

  return (
    <div
      class="modal-overlay"
      onClick$={onRequestClose$}
      onKeyDown$={handleCloseKey}
    >
      <div class="modal" onClick$={stopPropagation} onKeyDown$={handleCloseKey}>
        <Slot />
      </div>
    </div>
  );
});

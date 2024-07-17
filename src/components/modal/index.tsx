import { $, component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./index.css?inline";

type Props = {
  onRequestClose$?: () => void;
};
export default component$((props: Props) => {
  useStyles$(styles);

  const handleClose = $(() => {
    props?.onRequestClose$?.();
  })
  
  const handleCloseKey = $((e: KeyboardEvent) => {
    e.key === "Escape" && handleClose()
  });

  const stopPropagation = $((e: Event) => {
    e.stopPropagation();
  });

  return (
    <div
      class="modal-overlay"
      onClick$={handleClose}
      onKeyDown$={handleCloseKey}
    >
      <div class="modal" onClick$={stopPropagation} onKeyDown$={handleCloseKey}>
        <Slot />
      </div>
    </div>
  );
});

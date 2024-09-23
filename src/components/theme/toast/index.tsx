import {
  component$,
  type QRL,
  Slot,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";

import styles from "./index.css?inline";

type Props = {
  requestRemove$: QRL<() => void>;
};

export default component$((props: Props) => {
  useStyles$(styles);
  const isShowingToast = useSignal(true);
  const hasRequestedRemove = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const animateOutTimeout = setTimeout(() => {
      isShowingToast.value = false;
    }, 5000);

    return () => {
      clearTimeout(animateOutTimeout);
    };
  });

  return (
    <div
      onAnimationEnd$={() => {
        if (!isShowingToast.value) {
          props.requestRemove$();
          hasRequestedRemove.value = true;
        }
      }}
      class={`toast ${isShowingToast.value ? "toast--reveal" : "toast--hide"} ${hasRequestedRemove.value ? "toast--hidden" : ""}`}
    >
      <Slot />
    </div>
  );
});

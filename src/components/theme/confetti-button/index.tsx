import { component$, Slot, type QRL } from "@builder.io/qwik";
import { shootConfetti } from "./shootConfetti";

type Props = {
  onClick$: QRL<() => void>;
};
export default component$((props: Props) => {
  return (
    <button
      onClick$={() => {
        props.onClick$();
        shootConfetti();
      }}
    >
      <Slot />
    </button>
  );
})




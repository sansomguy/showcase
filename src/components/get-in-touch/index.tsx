import {
  $,
  component$,
  useSignal,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";
import ConfettiButton from "../confetti-button";

import { Form } from "@builder.io/qwik-city";
import styles from "./index.css?inline";
import Modal from "../modal";
import { shootConfetti } from "../confetti-button/shootConfetti";
import { useSubscribe } from "~/routes/layout";

export default component$(() => {
  useStyles$(styles);
  const subscribeAction = useSubscribe();

  const showModal = useSignal(false);

  useTask$(({ track }) => {
    track(subscribeAction);

    if (subscribeAction.value?.success) {
      shootConfetti();
      showModal.value = false;
    }
  });

  return (
    <>
      <div class="get-in-touch">
        <ConfettiButton
          onClick$={$(() => {
            showModal.value = true;
          })}
        >
          <span>Get in touch</span>
        </ConfettiButton>
      </div>
      {showModal.value ? (
        <Modal
          onRequestClose$={() => {
            showModal.value = false;
          }}
        >
          <Form action={subscribeAction}>
            <input type="email" placeholder="email" />
            <button type="submit">Subscribe</button>
          </Form>
        </Modal>
      ) : null}
    </>
  );
});

import {
  $,
  component$,
  useSignal,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";

import { Form } from "@builder.io/qwik-city";
import styles from "./index.css?inline";
import Modal from "../modal";
import { shootConfetti } from "../confetti-button/shootConfetti";
import { useSubscribe } from "~/routes/layout";
import Toast from "../toast";

export default component$(() => {
  useStyles$(styles);
  const subscribeAction = useSubscribe();

  const showModal = useSignal(false);

  useTask$(({ track }) => {
    track(subscribeAction);
    if (subscribeAction.isRunning) {
      return;
    }
    if (subscribeAction.value?.success) {
      shootConfetti();
      showModal.value = false;
    }
  });

  return (
    <>
      <div class="get-in-touch">
        <button
          onClick$={$(() => {
            showModal.value = true;
          })}
        >
          <span>Get in touch</span>
        </button>
      </div>
      {!subscribeAction.isRunning && subscribeAction.value?.success ? (
        <Toast requestRemove$={() => {}}>Thanks for getting in touch! 🎉</Toast>
      ) : null}
      {showModal.value ? (
        <Modal
          onRequestClose$={() => {
            showModal.value = false;
          }}
        >
          <h2 style={{ width: "100%" }}>Get in touch</h2>
          <section>
            <a href="mailto:joshwebd@gmail.com">joshwebd@gmail.com</a>
            <br />
            <a href="tel:+61473407664">+61 473 407 664</a>
          </section>

          {subscribeAction.value?.error ? (
            <div class="notice">{subscribeAction.value?.error}</div>
          ) : null}
          <Form action={subscribeAction}>
            <label for="email">
              I'll mail you back 👍
              <input name="email" type="email" placeholder="email" />
            </label>
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Modal>
      ) : null}
    </>
  );
});

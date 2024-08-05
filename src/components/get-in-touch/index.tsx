import {
  $,
  component$,
  useSignal,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";

import { Form } from "@builder.io/qwik-city";
import { useSubscribe } from "~/routes/layout";
import { shootConfetti } from "../confetti-button/shootConfetti";
import Modal from "../modal";
import Toast from "../toast";
import styles from "./style.css?inline";

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
        <a
          href="#"
          onClick$={$(() => {
            showModal.value = true;
          })}
        >
          Contact&nbsp;📪
        </a>
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
          <hr />
          <a href="mailto:joshwebd@gmail.com">joshwebd@gmail.com</a>
          <br />
          <a href="tel:+61473407664">+61 473 407 664</a>
          <br />
          <hr />

          {subscribeAction.value?.error ? (
            <div class="notice">{subscribeAction.value.error}</div>
          ) : null}
          <Form action={subscribeAction}>
            <input name="email" type="email" placeholder="Your email address" />
            <label for="email">
              Get <b>me</b> to email <b>you</b> 📧
            </label>
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Modal>
      ) : null}
    </>
  );
});

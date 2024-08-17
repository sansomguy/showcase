import { component$, Slot } from "@builder.io/qwik";
import darkStyles from "../shades-of-purple.css?inline";

export default component$(() => {
  return (
    <>
      <style>{darkStyles}</style>
      <Slot />
    </>
  );
});

import { component$, Slot } from "@builder.io/qwik";
import lightStyles from "prismjs/themes/prism-coy.min.css?inline";

export default component$(() => {
  return (
    <>
      <style>{lightStyles}</style>
      <Slot />
    </>
  );
});

import { $, component$, useOnDocument, useSignal, useTask$ } from "@builder.io/qwik";

export default component$(() => {
  const darkTheme = useSignal(false);
  const documentRef = useSignal<Document | undefined>(undefined)
  useTask$(({track}) => {
    track(() => darkTheme.value)
    track(() => documentRef.value)
    if(darkTheme.value) {
      documentRef.value?.documentElement.classList.remove("light")
      documentRef.value?.documentElement.classList.add("dark")
    } else {
      documentRef.value?.documentElement.classList.add("light")
      documentRef.value?.documentElement.classList.remove("dark")
    }
  })

  useOnDocument("DOMContentLoaded", $((e) => {
    const doc = (e.target) as Document
    const win = doc.defaultView as Window
    documentRef.value = doc
    darkTheme.value = win.matchMedia("(prefers-color-scheme: dark)").matches
  }))

  return (
    <div class="theme-toggle">
      <label class="theme-toggle__checkbox">
        {darkTheme.value ? "☀️" : "🌙"}
        <input
          type="checkbox"
          checked={darkTheme.value}
          onChange$={(event) => {
            darkTheme.value = !!(event.target as HTMLInputElement).checked;
          }}
        />
      </label>
    </div>
  );
});

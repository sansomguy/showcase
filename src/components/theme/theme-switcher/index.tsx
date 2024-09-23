import {
  $,
  component$,
  createContextId,
  type Signal,
  useContext,
  useOnDocument,
  useSignal,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";
import styles from "./styles.css?inline";

export const DarkThemeContext = createContextId<Signal<boolean>>("theme.dark");
export default component$(() => {
  useStyles$(styles);
  const darkTheme = useContext(DarkThemeContext);
  const documentRef = useSignal<Document | undefined>(undefined);
  useTask$(({ track }) => {
    track(() => darkTheme.value);
    track(() => documentRef.value);
    if (darkTheme.value) {
      documentRef.value?.documentElement.classList.remove("light");
      documentRef.value?.documentElement.classList.add("dark");
    } else {
      documentRef.value?.documentElement.classList.add("light");
      documentRef.value?.documentElement.classList.remove("dark");
    }
  });

  useOnDocument(
    "DOMContentLoaded",
    $((e) => {
      const doc = e.target as Document;
      const win = doc.defaultView as Window;
      documentRef.value = doc;
      darkTheme.value = win.matchMedia("(prefers-color-scheme: dark)").matches;
    })
  );

  return (
    <div class="theme-toggle">
      <span>
        <input
          class="theme-toggle__input"
          id="theme-toggle"
          type="checkbox"
          checked={darkTheme.value}
          onChange$={(event) => {
            darkTheme.value = !!(event.target as HTMLInputElement).checked;
          }}
        />
      </span>
      <label for="theme-toggle" class="theme-toggle__checkbox">
        🌘
      </label>
    </div>
  );
});

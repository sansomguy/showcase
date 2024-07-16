import { component$, useContext } from "@builder.io/qwik";
import { ThemeContext } from "~/root";

export default component$(() => {
  const theme = useContext(ThemeContext);

  return (
    <div class="theme-toggle">
      <label class="theme-toggle__checkbox">
        {theme.value ? "☀️" : "🌙"}
        <input
          type="checkbox"
          checked={theme.value}
          onChange$={(event) => {
            theme.value = !!(event.target as HTMLInputElement)?.checked;
          }}
        />
      </label>
    </div>
  );
});

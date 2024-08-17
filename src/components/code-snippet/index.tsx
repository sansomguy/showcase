import { component$, useContext } from "@builder.io/qwik";
import { DarkThemeContext } from "../theme-switcher";
import DarkTheme from "./dark-theme";
import LightTheme from "./light-theme";
import ServerRender, { type ServerRenderProps } from "./server-render";

export default component$((props: ServerRenderProps) => {
  const darkTheme = useContext(DarkThemeContext);

  if (darkTheme.value) {
    return (
      <DarkTheme>
        <ServerRender {...props} />
      </DarkTheme>
    );
  }

  return (
    <LightTheme>
      <ServerRender {...props} />
    </LightTheme>
  );
});

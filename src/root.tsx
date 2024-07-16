import { $, component$, createContextId, Signal, useContextProvider, useOnDocument, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import simpleCss from "./simple.css?inline";
import styles from "./style.css?inline";

export const ThemeContext = createContextId<Signal<boolean>>("showcase.theme")

export default component$(() => {
  useStyles$(simpleCss);
  useStyles$(styles);
  const darkTheme = useSignal(false);
  const documentRef = useSignal<Document | undefined>(undefined)
  useContextProvider(ThemeContext, darkTheme);
  useOnDocument("DOMContentLoaded", $((e) => {
    const doc = (e.target) as Document
    const win = doc.defaultView as Window
    documentRef.value = doc
    // get current theme from device settings
    darkTheme.value = window.matchMedia("(prefers-color-scheme: dark)").matches
  }))

  useTask$(({track}) => {
    track(() => darkTheme.value)
    if(darkTheme.value) {
      documentRef.value?.documentElement.classList.remove("light")
      documentRef.value?.documentElement.classList.add("dark")
    } else {
      documentRef.value?.documentElement.classList.add("light")
      documentRef.value?.documentElement.classList.remove("dark")
    }
  })

  return (
    <QwikCityProvider>
      <head>
        <meta charSet={"utf-8"} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en" style={{colorScheme: darkTheme.value ? "light" : "dark"}}>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});

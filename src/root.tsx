import { component$, useServerData, useStyles$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import simpleCss from "./simple.css?inline";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(simpleCss);
  useStyles$(styles);

  const nonce = useServerData<string | undefined>("nonce");

  return (
    <QwikCityProvider>
      <head>
        <meta charSet={"utf-8"} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        <RouterHead />
        <ServiceWorkerRegister nonce={nonce} />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});

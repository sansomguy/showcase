import { component$, useStyles$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import simpleCss from "./simple.css?inline";
import styles from "./style.css?inline";
import Navigation from "./components/navigation";
import Breadcrumbs from "./components/breadcrumbs";

export default component$(() => {
  useStyles$(simpleCss);
  useStyles$(styles);
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet={"utf-8"} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en">
        <header>
          <Navigation />
          <Breadcrumbs />
        </header>
        <main>
          <RouterOutlet />
        </main>
      </body>
    </QwikCityProvider>
  );
});

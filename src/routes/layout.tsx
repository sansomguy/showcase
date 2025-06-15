import {
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono";

import BreadCrumbs from "~/components/theme/bread-crumbs";
import DynamicMenu from "~/components/theme/dynamic-menu";
import FlyingSquares from "~/components/theme/flying-squares";
import { DarkThemeContext } from "~/components/theme/theme-switcher";

// export const onGet: RequestHandler = async (event) => {
//   const { cacheControl } = event;
//   cacheControl({
//     public: true,
//     // Always serve a cached response by default, up to a week stale
//     staleWhileRevalidate: 60 * 60 * 24 * 7,
//     // Max once every 10 minutes, revalidate on the server to get a fresh version of this page
//     maxAge: 10 * 60 * 1000,
//     sMaxAge: 10 * 60 * 1000,
//   });
// };

export const useSubscribe = routeAction$(async () => {
  // TODO
  // create a new table in dynamodb for capturing new subscribers
  return {
    success: true,
    message: "OK",
  };
});
export default component$(() => {
  useStyles$(/*css*/ `
    .layout__container {
      --layout-padding: 1.5rem;
      display: flex;
      flex-direction: column;
      position: relative;
      padding: var(--layout-padding);
    }
  `);

  const darkTheme = useSignal(false);
  useContextProvider(DarkThemeContext, darkTheme);

  return (
    <>
      <div class={"layout__container"}>
        <header>
          <DynamicMenu />
          <BreadCrumbs />
        </header>
        <main class="layout__main__container__inner">
          <Slot />
        </main>
      </div>
      <FlyingSquares />
    </>
  );
});

import { component$, Slot } from "@builder.io/qwik";
import SideBarLayout from "~/components/side-bar-layout";
import SideBarNavigation from "~/components/side-bar-navigation";

export default component$(() => {
  return (
    <SideBarLayout>
      <div q:slot="side-bar">
        <SideBarNavigation />
      </div>
      <div q:slot="main">
        <Slot />
      </div>
    </SideBarLayout>
  );
});

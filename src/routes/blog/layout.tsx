import { Slot, component$ } from "@builder.io/qwik";
import SideBarLayout from "~/components/side-bar-layout";
import SideBarNavigation from "~/components/side-bar-navigation";

export default component$(() => {

  return (
    <Slot/>
  );
});

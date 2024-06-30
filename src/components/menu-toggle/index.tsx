import { $, QRL, component$, useOnDocument, useSignal } from "@builder.io/qwik";

import MenuSVG from "~/media/menu.svg?jsx";
import styles from "./menu-toggle.module.css";

function initTransformOrigin(button: Element) {
  const lines = button.getElementsByClassName(
    "menu_svg__line"
  ) as HTMLCollectionOf<SVGRectElement>;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // calculate the center of the line
    const bbox = line.getBBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;
    line.style.transformOrigin = `${centerX}px ${centerY}px`;
  }
}

type Props = {
  open: boolean;
  onClick$: QRL<() => void>;
  disappearOnOpen?: boolean;
  disappearOnClose?: boolean;
};
export default component$(({ open, onClick$, disappearOnClose, disappearOnOpen }: Props) => {
  const menuButtonRef = useSignal<Element>();
  useOnDocument(
    "DOMContentLoaded",
    $(() => menuButtonRef.value && initTransformOrigin(menuButtonRef.value))
  );

  const shouldDisappear = open && disappearOnOpen || !open && disappearOnClose;

  return (
    <div class={styles.mobileNav}>
      <span
        ref={menuButtonRef}
        class={`${styles.mobileNavButton} ${open ? styles["mobileNavButton--open"] : ''} ${shouldDisappear ? styles["mobileNavButton--disappear"] : ''}`}
        onClick$={onClick$}
      >
        <MenuSVG />
      </span>
    </div>
  );
});

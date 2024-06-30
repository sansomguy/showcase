import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

type Props = {
  title: string;
};

export default component$(({ title }: Props) => {
  useStylesScoped$(styles);

  return (
    <h1 class="title-popper-base title-popper">
      {title.split("").map((letter, index) => {
        return (
          <div class="hover" key={index}>
            <span style={`--initial-delay: ${index * 0.2 + 0.5}s;`} key={index}>
              {letter}
            </span>
          </div>
        );
      })}
    </h1>
  );
});

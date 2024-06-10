import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

type Props = {
  title: string;
};

export default component$(({ title }: Props) => {
  useStylesScoped$(styles);

  return (
    <h1 class="concept concept-two">
      {title.split("").map((letter, index) => {
        return (
            <div class="hover" key={index}>
                <span style={`--initial-delay: ${(index * 0.3) + 1}s;`} key={index}>
                    {letter}
                </span>
            </div>
        );
      })}
    </h1>
  );
});

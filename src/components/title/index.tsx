import { component$, useSignal, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

type Props = {
  title: string;
};

export default component$(({ title }: Props) => {
  const runAnimation = useSignal(() => false)
  useStyles$(styles);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({track}) => {
    track(() => title)
    
    runAnimation.value = false;
    const timeout = setTimeout(() => {
      runAnimation.value = true;
    }, 0)

    return () => {clearTimeout(timeout)}
  })

  return (
    
      <h1 class={`title-popper-base title-popper`}>
        {runAnimation.value ? '' : title}
        {runAnimation.value ? title.split("").map((letter, index) => {
          return (
            <div class="hover" key={index}>
              <span
                style={`--initial-delay: ${(index * 0.2).toFixed(2)}s;`}
                key={index} 
                class={`title-popper__letter ${runAnimation.value ? 'title-popper__run-animation' : ''}`}
              >
                {letter}
              </span>
            </div>
          );
        }) : ''}
      </h1>
  );
});

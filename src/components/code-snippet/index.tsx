import {
  component$,
  Resource,
  useResource$,
  useStyles$,
} from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { codeToHtml } from "shiki";
import theme from "shiki/themes/dark-plus.mjs";

type Language = "javascript" | "typescript" | "html" | "python";

export type ServerRenderProps = {
  language: Language;
  code: string;
};
export const renderCode = server$(async function (props: ServerRenderProps) {
  return await codeToHtml(props.code, {
    lang: props.language,
    theme,
  });
});
export default component$(({ language, code }: ServerRenderProps) => {
  // responsive styles so that the pre tag has inner scroll when the code is too long
  // can't use max-width: 100% for some reason, has to be pixel value
  useStyles$(/*css*/ `
    .code-snippet__container {
      position: relative;
      max-width: calc(100vw - 2*var(--layout-padding));
      margin: auto;
      overflow-x: auto;
    }`);

  const styledCode = useResource$(async ({ cache, track }) => {
    cache("immutable");
    track(() => language);
    track(() => code);
    return await renderCode({
      code,
      language,
    });
  });
  return (
    <Resource
      value={styledCode}
      onResolved={(value) => (
        <div class="code-snippet__container" dangerouslySetInnerHTML={value} />
      )}
      onPending={() => (
        <div class="code-snippet__container">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    />
  );
});

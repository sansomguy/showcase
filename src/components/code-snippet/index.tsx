import { component$, Resource, useResource$ } from "@builder.io/qwik";
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
  const styledCode = useResource$(async ({ cache, track }) => {
    cache("immutable");
    track(() => language);
    track(() => code);
    return await codeToHtml(code, {
      lang: language,
      theme,
    });
  });
  return (
    <Resource
      value={styledCode}
      onResolved={(value) => <div dangerouslySetInnerHTML={value} />}
      onPending={() => (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    />
  );
});

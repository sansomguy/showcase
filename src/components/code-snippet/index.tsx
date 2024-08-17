import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { codeToHtml, type BundledLanguage } from "shiki";

const renderCode = server$(async (code: string, language: BundledLanguage) => {
  return codeToHtml(code, {
    lang: language,
    theme: "dark-plus",
  });
});

type Language = "javascript" | "python" | "html" | "css";

export type ServerRenderProps = {
  language: Language;
  code: string;
};
export default component$(({ language, code }: ServerRenderProps) => {
  const resource = useResource$(async ({ track }) => {
    track(() => code);
    track(() => language);
    return await renderCode(code, language);
  });
  return (
    <Resource
      value={resource}
      onResolved={(value) => <div dangerouslySetInnerHTML={value} />}
      onPending={() => (
        <pre>
          <code class={`language-${language}`}>{code}</code>
        </pre>
      )}
    />
  );
});

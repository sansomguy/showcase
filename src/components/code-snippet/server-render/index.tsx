import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import Prism from "prismjs";
import loadAllLanguages from "prismjs/components/index";

const renderCode = server$((code: string, language: Language) => {
  loadAllLanguages();
  return Prism.highlight(code, Prism.languages[language], language);
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
    <pre>
      <Resource
        value={resource}
        onResolved={(value) => (
          <code
            class={`language-${language}`}
            dangerouslySetInnerHTML={value}
          />
        )}
        onPending={() => <code class={`language-${language}`}>{code}</code>}
      />
    </pre>
  );
});

import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { createHighlighterCore, loadWasm } from "shiki/core";
import theme from "shiki/dist/themes/dark-plus.mjs";
import js from "shiki/langs/js.mjs";

type Language = "javascript";

export type ServerRenderProps = {
  language: Language;
  code: string;
};
export default component$(({ language, code }: ServerRenderProps) => {
  const location = useLocation();
  const styledCode = useResource$(async ({ cache, track }) => {
    cache("immutable");
    track(() => language);
    track(() => code);

    async function loadDependencies() {
      const origin = new URL(location.url).origin;
      await fetch(`${origin}/shiki/onig.wasm`)
        .then((res) => res.arrayBuffer())
        .then((x) => loadWasm(x));
    }

    await loadDependencies();

    const highlighter = await createHighlighterCore({
      themes: [theme],
      langs: [js],
    });

    return highlighter.codeToHtml(code, {
      lang: language,
      theme: "dark-plus",
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

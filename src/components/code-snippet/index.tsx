import { component$, Resource, useResource$ } from "@builder.io/qwik";

type Language = "javascript" | "python" | "html" | "css";

export type ServerRenderProps = {
  language: Language;
  code: string;
};
export default component$(({ language, code }: ServerRenderProps) => {
  const styledCode = useResource$(async ({ cache }) => {
    cache("immutable");
    const {
      default: { codeToHtml },
    } = await import("shiki");
    return await codeToHtml(code, {
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

import { marked } from "marked";
import { type BuiltinLanguage, createHighlighter } from "shiki";
import theme from "shiki/themes/dark-plus.mjs";

export async function renderToHtml(markdown: string) {
  const highlighter = await createHighlighter({
    themes: [theme],
    langs: ["javascript", "typescript", "html", "python"],
  });

  marked.use({
    renderer: {
      code(code) {
        const codeText = typeof code === "string" ? code : code.text;
        const shikiCode = highlighter.codeToHtml(codeText, {
          lang: (code.lang ?? "typescript") as BuiltinLanguage,
          theme,
        });

        return /*html*/ `<div style="
        position: relative;
        max-width: calc(100vw - 2*var(--layout-padding));
        margin: auto;
        overflow-x: scroll;">${shikiCode}</div>`;
      },
    },
    async: true,
  });

  return await marked.parse(markdown);
}

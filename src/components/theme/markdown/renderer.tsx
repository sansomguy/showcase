import { marked } from "marked";
import type {
  BuiltinLanguage,
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
} from "shiki";
import { createHighlighter } from "shiki";
import theme from "shiki/themes/dark-plus.mjs";

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;

export async function renderToHtml(markdown: string) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [theme],
      langs: ["typescript", "javascript", "html", "css", "json"],
    });
  }

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
        overflow-x: auto;">${shikiCode}</div>`;
      },
    },
    async: true,
  });

  return await marked.parse(markdown);
}

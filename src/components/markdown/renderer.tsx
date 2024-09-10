import { marked } from "marked";

import { BuiltinLanguage, createHighlighter, SpecialLanguage } from "shiki";
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
        return highlighter.codeToHtml(codeText, {
          lang: (code.lang ?? "typescript") as BuiltinLanguage,
          theme,
        });
      },
    },
    async: true,
  });

  return await marked.parse(markdown);
}

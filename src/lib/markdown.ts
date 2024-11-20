import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

/**
 * The renderer that's being used when rending markdown.
 */
const renderer = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight: (code, lang) =>
            hljs.highlight(code, { language: lang || 'plaintext' }).value,
    }),
);

/**
 * Renders the given markdown string to html.
 *
 * @param markdown the markdown to render
 * @returns the rendered markdown
 */
export function renderMarkdown(markdown: string): string {
    return renderer.parse(markdown, {
        async: false,
    });
}

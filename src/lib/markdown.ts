import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

const renderer = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight: (code, lang) =>
            hljs.highlight(code, { language: lang || 'plaintext' }).value,
    }),
);

export function renderMarkdown(markdown: string): string {
    return renderer.parse(markdown, {
        async: false,
    });
}

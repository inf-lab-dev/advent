import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import fs from 'node:fs/promises';

const renderer = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight: (code, lang) =>
            hljs.highlight(code, { language: lang || 'plaintext' }).value,
    }),
);

export async function loadMarkdown(filePath: string): Promise<string> {
    const markdown = await fs.readFile(filePath, { encoding: 'utf-8' });

    return renderer.parse(markdown, {
        async: false,
    });
}

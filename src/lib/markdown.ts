import hljs from 'highlight.js';
import jsYaml from 'js-yaml';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

const FRONT_MATTER_REGEX = /^---\s*\n([\s\S]+?)\n---\s*\n/;

const renderer = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight: (code, lang) =>
            hljs.highlight(code, { language: lang || 'plaintext' }).value,
    }),
);

export async function renderMarkdown<
    TFrontmatter extends Record<string, unknown>,
>(markdown: string): Promise<[html: string, frontmatter: null | TFrontmatter]> {
    const frontmatter =
        jsYaml.load(markdown.match(FRONT_MATTER_REGEX)?.[1] ?? '') ?? null;
    const html = renderer.parse(markdown, {
        async: false,
    });
    console.log(frontmatter);
    return [html, frontmatter as null | TFrontmatter];
}

import { remark } from 'remark';
import frontmatter from 'remark-frontmatter';
import yamlFrontmatter from 'remark-frontmatter-yaml';
import gfm from 'remark-gfm';
import html from 'remark-html';

const renderer = remark()
    .use(html)
    .use(frontmatter)
    .use(yamlFrontmatter)
    .use(gfm);

export async function renderMarkdown<
    TFrontmatter extends Record<string, unknown>,
>(markdown: string): Promise<[html: string, frontmatter: TFrontmatter]> {
    const file = await renderer.process(markdown);

    return [file.toString(), file.data.frontmatter as TFrontmatter];
}

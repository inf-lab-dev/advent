import { decrypt } from 'solution-zone';
import { renderMarkdown } from '../markdown';
import { Manifest } from './loader/manifest';

export type Tasks = Map<string, Task>;

export type FileContent = string | { encrypted: string };

export interface Task {
    slug: string;
    manifest: Manifest;
    files: {
        content: FileContent;
        solution: FileContent | null;
    };
}

export async function resolveMarkdownContent(
    content: FileContent | null,
    key?: string,
) {
    if (content === null) {
        return null;
    } else if (typeof content !== 'string') {
        if (typeof key === 'string') {
            try {
                return renderMarkdown(await decrypt(key, content.encrypted));
            } catch {
                return null;
            }
        }

        return null;
    }

    return content;
}

import { Manifest } from './loader/manifest';

export type Tasks = Map<string, Task>;

export interface Task {
    slug: string;
    manifest: Manifest;
    files: {
        content: string;
        solution: string | null;
    };
}

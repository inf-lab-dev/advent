import fs from 'node:fs/promises';
import { cache } from 'react';

export interface Token {
    task: string;
    at: number;
    password: string;
    id: string;
}

async function loadPublicKey() {
    return await fs.readFile('./content/token/public.pem', {
        encoding: 'utf8',
    });
}

export const fetchPublicKey = cache(loadPublicKey);

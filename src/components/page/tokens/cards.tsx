'use client';

import { Token } from '@/lib/advent/token';
import { useState } from 'react';
import FileInput from './card/file-input';
import ImportToken from './card/import-token';
import TokenList from './card/token-list';

export interface ImportedToken {
    token: Token;
    comment: string;
}

export default function Cards() {
    const [key, setKey] = useState<string | null>(null);
    const [tokens, setTokens] = useState<ImportedToken[]>([]);

    return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {key && (
                <div className="order-first">
                    <ImportToken
                        privateKey={key}
                        onTokenImported={(token) =>
                            setTokens([...tokens, token])
                        }
                    />
                </div>
            )}
            <div className="order-2">
                <FileInput onKeyLoaded={setKey} />
            </div>
            {key && (
                <div className="order-1 lg:order-last lg:col-span-2">
                    <TokenList tokens={tokens} />
                </div>
            )}
        </div>
    );
}

'use client';

import ErrorPage from '@/components/layout/error';
import { Button } from '@/components/ui/button';

export interface Props {
    error: Error;
    reset: VoidFunction;
}

export default function GlobalError({ error, reset }: Props) {
    return (
        <ErrorPage code="500" icon="tree" text={error.message}>
            <Button onClick={reset}>Erneut versuchen</Button>
        </ErrorPage>
    );
}

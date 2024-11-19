'use client';

export interface Props {
    error: Error;
    reset: VoidFunction;
}

export default function GlobalError({ error, reset }: Props) {
    return (
        <div>
            <p>Oh no! An Error</p>
            <p>{error.message}</p>
            <button onClick={reset}>Retry</button>
        </div>
    );
}

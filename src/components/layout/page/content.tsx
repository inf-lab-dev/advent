import { PropsWithChildren } from 'react';

export default function Content({ children }: PropsWithChildren) {
    return (
        <main className="mx-auto max-w-[100vw] flex-grow pb-20">
            {children}
        </main>
    );
}

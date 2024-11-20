import { PropsWithChildren } from 'react';

export default function Content({ children }: PropsWithChildren) {
    return <main className="mx-auto flex-grow px-6 pb-20">{children}</main>;
}

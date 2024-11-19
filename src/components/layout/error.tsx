import { CandyCane, TreePine } from 'lucide-react';
import { PropsWithChildren } from 'react';

export interface Props extends PropsWithChildren {
    icon: 'tree' | 'cane';
    text: string;
    code: number;
}

export default function ErrorPage({ icon, code, text, children }: Props) {
    const IconComponent = icon === 'tree' ? TreePine : CandyCane;

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
            <div className="flex items-center gap-3 text-[5rem]">
                <IconComponent
                    className={`${icon === 'tree' ? 'text-green-600' : 'text-red-600'} h-[5rem] w-[5rem] border-r-2 border-muted pr-3 dark:border-muted-foreground`}
                />
                <h1 className="font-bold">{code}</h1>
            </div>
            <p className="text-center text-xl">{text}</p>
            {children}
        </div>
    );
}

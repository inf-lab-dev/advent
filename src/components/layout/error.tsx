import { CandyCane, Snowflake, TreePine } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Separator } from '../ui/separator';

export type Icon = 'tree' | 'cane' | 'snowflake';

export interface Props extends PropsWithChildren {
    icon: Icon;
    text: string;
    code: string;
}

function renderIcon(icon: Icon) {
    switch (icon) {
        case 'cane':
            return [CandyCane, 'text-red-600'];

        case 'tree':
            return [TreePine, 'text-green-600'];

        case 'snowflake':
            return [Snowflake, 'text-blue-600'];
    }
}

export default function ErrorPage({ icon, code, text, children }: Props) {
    const [IconComponent, iconClasses] = renderIcon(icon);

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 p-4">
            <div className="flex items-center gap-3 text-[5rem]">
                <IconComponent className={`${iconClasses} h-20 w-20`} />
                <Separator className="h-20" orientation="vertical" />
                <h1 className="font-bold">{code}</h1>
            </div>
            <p className="text-center text-xl">{text}</p>
            {children}
        </div>
    );
}

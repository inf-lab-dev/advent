'use client';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { AdventSunday, toLiteral } from '@/lib/advent';
import { FlaskConical, Gift, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { buttonVariants } from '../../../ui/button';
import { ModeToggle } from './mode-toggle';

export interface Props {
    sundays: AdventSunday[];
}

interface RouteProps {
    href: string;
    label: string;
}

const DEFAULT_ROUTE_LIST: RouteProps[] = [
    {
        href: '/faq',
        label: 'FAQ',
    },
];

export function Navbar({ sundays }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const routeList: RouteProps[] = [
        ...sundays.map((sunday) => ({
            label: `${sunday}. Advent`,
            href: `/advent/${toLiteral(sunday)}`,
        })),
        ...DEFAULT_ROUTE_LIST,
    ];

    return (
        <>
            <div className="h-20"></div>
            <header className="fixed top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList className="container flex h-14 w-screen justify-between px-4">
                        <NavigationMenuItem className="flex font-bold text-primary">
                            <Link
                                rel="noreferrer noopener"
                                href="/"
                                className="ml-2 flex items-center justify-center gap-1 text-xl font-bold"
                            >
                                <Gift />
                                Inf-Labs im Advent
                            </Link>
                        </NavigationMenuItem>

                        {/* mobile */}
                        <div className="flex md:hidden">
                            <ModeToggle />

                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger className="px-2">
                                    <Menu
                                        className="flex h-5 w-5 md:hidden"
                                        onClick={() => setIsOpen(true)}
                                        aria-description="Menü öffnen"
                                    />
                                </SheetTrigger>

                                <SheetContent side="right">
                                    <SheetHeader>
                                        <SheetTitle className="text-xl font-bold text-primary">
                                            Inf-Labs im Advent
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                                        {routeList.map(({ href, label }) => (
                                            <Link
                                                rel="noreferrer noopener"
                                                key={label}
                                                href={href}
                                                onClick={() => setIsOpen(false)}
                                                className={buttonVariants({
                                                    variant:
                                                        pathname.startsWith(
                                                            href,
                                                        )
                                                            ? 'default'
                                                            : 'ghost',
                                                })}
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                        <a
                                            rel="noreferrer noopener"
                                            href="https://inf-lab.dev"
                                            target="_blank"
                                            className={`w-[110px] border ${buttonVariants(
                                                {
                                                    variant: 'secondary',
                                                },
                                            )}`}
                                        >
                                            <FlaskConical className="mr-2 h-5 w-5" />
                                            inf-lab.dev
                                        </a>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* desktop */}
                        <nav className="hidden gap-2 md:flex">
                            {routeList.map(({ href, label }, i) => (
                                <Link
                                    rel="noreferrer noopener"
                                    href={href}
                                    key={i}
                                    className={`text-[17px] ${buttonVariants({
                                        variant: pathname.startsWith(href)
                                            ? 'default'
                                            : 'ghost',
                                    })}`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden gap-2 md:flex">
                            <a
                                rel="noreferrer noopener"
                                href="https://inf-lab.dev"
                                target="_blank"
                                className={`border ${buttonVariants({ variant: 'secondary' })}`}
                            >
                                <FlaskConical className="mr-2 h-5 w-5" />
                                inf-lab.dev
                            </a>

                            <ModeToggle />
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
        </>
    );
}

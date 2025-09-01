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
import { Tasks } from '@/lib/advent';
import { getNavigationEntries } from '@/lib/advent/util';
import { CircleHelp, Gift, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { buttonVariants } from '../../../ui/button';
import { ModeToggle } from './mode-toggle';

export interface Props {
    tasks: Tasks;
}

const faqButtonClasses = (pathname: string) =>
    buttonVariants({ variant: pathname === '/faq' ? 'default' : 'secondary' });

export function Navbar({ tasks }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const routeList = getNavigationEntries(tasks);

    return (
        <>
            <div className="h-20"></div>
            <header className="dark:bg-background fixed top-0 z-40 w-full border-b bg-white dark:border-b-slate-700">
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList className="container flex h-14 w-screen justify-between px-4">
                        <NavigationMenuItem className="text-primary flex font-bold">
                            <Link
                                className="ml-2 flex items-center justify-center gap-1 text-xl font-bold"
                                href="/"
                                rel="noreferrer noopener"
                            >
                                <Gift />
                                Inf-Labs im Advent
                            </Link>
                        </NavigationMenuItem>

                        {/* mobile */}
                        <div className="flex lg:hidden">
                            <ModeToggle />

                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger className="px-2">
                                    <Menu
                                        aria-description="Menü öffnen"
                                        className="flex h-5 w-5 lg:hidden"
                                        onClick={() => setIsOpen(true)}
                                    />
                                </SheetTrigger>

                                <SheetContent side="right" className="p-6">
                                    <SheetHeader>
                                        <SheetTitle className="text-primary text-xl font-bold">
                                            Inf-Labs im Advent
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                                        {routeList.map(
                                            ({ href, label, children }) => (
                                                <Link
                                                    key={label}
                                                    className={`w-full ${buttonVariants(
                                                        {
                                                            variant:
                                                                children.includes(
                                                                    pathname,
                                                                )
                                                                    ? 'default'
                                                                    : 'ghost',
                                                        },
                                                    )}`}
                                                    href={href}
                                                    rel="noreferrer noopener"
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    {label}
                                                </Link>
                                            ),
                                        )}
                                        <Link
                                            className={`mt-10 w-full border ${faqButtonClasses(pathname)}`}
                                            href="/faq"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <CircleHelp className="mr-2 h-5 w-5" />
                                            FAQ
                                        </Link>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* desktop */}
                        <nav className="hidden gap-2 lg:flex">
                            {routeList.map(({ href, label, children }, i) => (
                                <Link
                                    key={i}
                                    className={`text-[17px] ${buttonVariants({
                                        variant: children.includes(pathname)
                                            ? 'default'
                                            : 'ghost',
                                    })}`}
                                    href={href}
                                    rel="noreferrer noopener"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden gap-2 lg:flex">
                            <Link
                                className={`border ${faqButtonClasses(pathname)}`}
                                href="/faq"
                            >
                                <CircleHelp className="mr-2 h-5 w-5" />
                                FAQ
                            </Link>

                            <ModeToggle />
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
        </>
    );
}

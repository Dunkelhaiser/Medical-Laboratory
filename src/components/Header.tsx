"use client";

import Link from "next/link";
import { LogIn, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@ui/Button";
import { Separator } from "@ui/Separator";
import Hamburger from "@ui/Hamburger";
import useToggle from "@hooks/useToggle";
import { cn } from "@utils/utils";
import { Session } from "next-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@ui/DropdownMenu";
import { signOut } from "next-auth/react";

const links = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Services",
        href: "/services",
    },
    {
        name: "Research",
        href: "/research",
    },
];

interface Props {
    session: Session | null;
}

const Header = ({ session }: Props) => {
    const route = usePathname();
    const [expanded, setExpanded] = useToggle(false);

    return (
        <header className="fixed left-0 right-0 top-0 z-[999] flex w-full flex-wrap border-b border-accent bg-card py-3 text-sm sm:flex-nowrap sm:justify-start sm:py-0">
            <div className="relative mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link
                        className="h-10 rounded-md px-4 py-2 text-xl font-semibold text-primary ring-primary ring-offset-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        href="/"
                        aria-label="Labi"
                    >
                        Labix
                    </Link>
                    <Hamburger className="sm:hidden" expanded={expanded} onClick={() => setExpanded()} />
                </div>
                <nav className={cn("grow basis-full overflow-hidden transition sm:h-auto", expanded ? "h-[255px]" : "h-0")}>
                    <div className="mt-5 flex flex-col gap-x-0 gap-y-2 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-x-4 sm:gap-y-0 sm:py-4 sm:ps-7">
                        {links.map((link) => (
                            <Button
                                variant="link"
                                className={`ring-offset-card ${route === link.href ? "" : "text-accent-foreground/50 ring-offset-card"}`}
                                aria-current={route === link.href ? "page" : undefined}
                                asChild
                                key={link.href}
                            >
                                <Link href={link.href}>{link.name}</Link>
                            </Button>
                        ))}
                        <Separator orientation="vertical" className="hidden sm:block" />
                        {session ? (
                            <>
                                <div className="hidden sm:block">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="link"
                                                className={`ring-offset-card ${
                                                    route === "/profile" ? "" : "text-accent-foreground/50 ring-offset-card"
                                                }`}
                                                aria-current={route === "/profile" ? "page" : undefined}
                                                size="icon"
                                            >
                                                <User size={20} strokeWidth={1.75} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <Link href="/profile">Profile</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <button onClick={() => signOut()} className="w-full">
                                                    Sign Out
                                                </button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Button
                                    variant="link"
                                    className={`ring-offset-card sm:hidden ${
                                        route === "/profile" ? "" : "text-accent-foreground/50 ring-offset-card"
                                    }`}
                                    aria-current={route === "/profile" ? "page" : undefined}
                                    asChild
                                >
                                    <Link href="/profile">Profile</Link>
                                </Button>
                                <Button
                                    variant="link"
                                    className="text-accent-foreground/50 ring-offset-card sm:hidden"
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="link"
                                className={`ring-offset-card ${route === "/sign_in" ? "" : "text-accent-foreground/50 ring-offset-card"}`}
                                aria-current={route === "/sign_in" ? "page" : undefined}
                                asChild
                            >
                                <Link href="/sign_in">
                                    <LogIn size={20} strokeWidth={1.75} className="mr-1" />
                                    Sign in
                                </Link>
                            </Button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
export default Header;

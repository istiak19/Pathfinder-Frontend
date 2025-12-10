"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../../../../../public/logo/logo2.png";
import { ModeToggle } from "@/components/ui/modeToggle";
import LogoutButton from "@/app/(auth)/_component/LogoutButton";
import { Menu, X } from "lucide-react";

interface NavbarClientProps {
    isAuthenticated: boolean;
    role: string | null;
}

export default function NavbarClient({ isAuthenticated, role }: NavbarClientProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const navigationLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/explore", label: "Explore Tours" },
        // { href: "/become-guide", label: "Become Guide" },
    ];

    const dashboardLink =
        role === "ADMIN"
            ? { href: "/admin/dashboard", label: "Admin Dashboard" }
            : role === "GUIDE"
                ? { href: "/guide/dashboard", label: "Guide Dashboard" }
                : role === "TOURIST"
                    ? { href: "/tourist/dashboard", label: "Tourist Dashboard" }
                    : null;

    const navLinks = dashboardLink ? [...navigationLinks, dashboardLink] : navigationLinks;

    return (
        <header className="border-b px-4 md:px-6 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
            <div className="flex h-16 items-center justify-between">

                {/* ---------- Left: Logo + Navigation ---------- */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={logo} alt="Logo" width={40} height={40} />
                        <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                            Pathfinder
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`py-1.5 px-3 rounded-md transition-colors ${pathname === link.href
                                    ? "text-blue-600 bg-blue-50 dark:bg-blue-950/30 font-semibold"
                                    : "text-muted-foreground hover:text-blue-600"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* ---------- Right: Mode Toggle + Login/Logout ---------- */}
                <div>
                    <div className="hidden md:flex items-center gap-2">
                        <ModeToggle />
                        {isAuthenticated ? (
                            <LogoutButton />
                        ) : (
                            <Button asChild size="sm">
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button className="md:hidden p-2" onClick={() => setOpen((prev) => !prev)}>
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* ---------- Mobile Menu Drawer ---------- */}
            {open && (
                <div className="md:hidden flex flex-col gap-2 py-4 border-t">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`py-2 px-3 rounded-md transition-colors ${pathname === link.href
                                ? "text-blue-600 bg-blue-50 dark:bg-blue-950/30 font-semibold"
                                : "text-muted-foreground hover:text-blue-600"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-3 mt-4">
                        <ModeToggle />
                        {isAuthenticated ? (
                            <LogoutButton />
                        ) : (
                            <Button asChild size="sm">
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
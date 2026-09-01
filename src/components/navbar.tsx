"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClubLogo } from "@/components/club-logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/committee", label: "Committee" },
  { href: "/squad", label: "Squad" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-panther-black/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-panther-cream">
          <ClubLogo size="sm" />
          <span className="hidden sm:inline">
            Black Panthers <span className="text-panther-gold">CC</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-panther-gold/15 text-panther-gold"
                      : "text-panther-muted hover:text-panther-cream"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-panther-gold px-5 py-2 text-sm font-bold text-panther-black transition hover:bg-panther-gold-dark lg:inline-block"
        >
          Join the Club
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-panther-cream lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-panther-black lg:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-medium",
                    pathname === link.href
                      ? "bg-panther-gold/15 text-panther-gold"
                      : "text-panther-muted hover:text-panther-cream"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-panther-gold px-4 py-2 text-center text-sm font-bold text-panther-black"
              >
                Join the Club
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

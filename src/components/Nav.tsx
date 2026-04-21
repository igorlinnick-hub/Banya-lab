"use client";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/retreats", label: "Retreats" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-stone-950/80 border-b border-stone-900">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-wide text-amber-50"
          onClick={() => setOpen(false)}
        >
          BANYA · LAB
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-stone-300">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-amber-50">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-800 text-amber-50"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span aria-hidden>{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-stone-900 bg-stone-950/95">
          <ul className="flex flex-col py-2 px-6 text-sm text-stone-300">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-stone-900 last:border-b-0 hover:text-amber-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

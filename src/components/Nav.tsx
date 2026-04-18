import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-stone-950/70 border-b border-stone-900">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide text-amber-50">
          BANYA · LAB
        </Link>
        <nav className="flex items-center gap-6 text-sm text-stone-300">
          <Link href="/#services" className="hover:text-amber-50">
            Services
          </Link>
          <Link href="/retreats" className="hover:text-amber-50">
            Retreats
          </Link>
          <Link href="/#contact" className="hover:text-amber-50">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

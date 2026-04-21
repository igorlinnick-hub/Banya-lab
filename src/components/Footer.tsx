import Link from "next/link";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-24 border-t border-stone-900 bg-stone-950 text-stone-400"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div className="md:col-span-1">
          <div className="font-semibold text-amber-50 mb-2">Banya Lab</div>
          <p className="text-stone-400">
            Ukrainian banya tradition meets the Hawaiian ocean. Based in Oʻahu.
          </p>
        </div>

        <div>
          <div className="font-semibold text-amber-50 mb-3">Explore</div>
          <ul className="space-y-2">
            <li>
              <Link href="/#services" className="hover:text-amber-200">
                Services
              </Link>
            </li>
            <li>
              <Link href="/retreats" className="hover:text-amber-200">
                Retreats
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-amber-200">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-amber-200">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-amber-50 mb-3">Legal</div>
          <ul className="space-y-2">
            <li>
              <Link href="/legal/terms" className="hover:text-amber-200">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:text-amber-200">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/refund" className="hover:text-amber-200">
                Refund &amp; Waiver
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-amber-50 mb-3">Contact</div>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:maksimzap8@gmail.com"
                className="hover:text-amber-200"
              >
                maksimzap8@gmail.com
              </a>
            </li>
            <li>Oʻahu, Hawaiʻi</li>
            <li>
              <a
                href="https://instagram.com/banya_lab_hawaii"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-200"
              >
                Instagram · @banya_lab_hawaii
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-900 py-4 text-center text-xs">
        © {new Date().getFullYear()} Banya Lab. All rights reserved.
      </div>
    </footer>
  );
}

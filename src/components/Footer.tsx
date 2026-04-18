export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-24 border-t border-stone-900 bg-stone-950 text-stone-400"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-semibold text-amber-50 mb-2">Banya Lab</div>
          <p>
            Ukrainian banya tradition meets the Hawaiian ocean. Based in Oʻahu.
          </p>
        </div>
        <div>
          <div className="font-semibold text-amber-50 mb-2">Contact</div>
          <p>hello@banyalab.com</p>
          <p>Oʻahu, Hawaiʻi</p>
        </div>
        <div>
          <div className="font-semibold text-amber-50 mb-2">Follow</div>
          <p>Instagram · @banyalab</p>
        </div>
      </div>
      <div className="border-t border-stone-900 py-4 text-center text-xs">
        © {new Date().getFullYear()} Banya Lab. All rights reserved.
      </div>
    </footer>
  );
}

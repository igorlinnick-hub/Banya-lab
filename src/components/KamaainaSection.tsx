import { CALENDLY } from "@/lib/services";

export function KamaainaSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-emerald-950/40 to-amber-950/40 p-8 md:p-12">
        <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
          Kamaʻāina · Hawaiian ID
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-amber-50 mb-4">
          Local rates for Hawaiʻi residents
        </h2>
        <p className="text-stone-300 mb-6 max-w-2xl">
          Show your Hawaiian ID and get kamaʻāina pricing on core banya sessions.
          Authentic Russian banya — venik steaming and contrast ice plunge.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href={CALENDLY.kamaainaHarbor}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-stone-800 bg-stone-950/60 p-5 hover:border-amber-500/60 transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <span aria-hidden>♨️</span>
              <span className="font-medium text-amber-50">Harbor banya</span>
            </div>
            <div className="text-2xl font-semibold text-amber-400 mb-1">
              $50
            </div>
            <div className="text-sm text-stone-400">
              2.5 hours · venik steaming + ice plunge
            </div>
            <div className="mt-3 text-xs text-amber-400">
              Book with ID →
            </div>
          </a>
          <a
            href={CALENDLY.fridayFireworks}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-stone-800 bg-stone-950/60 p-5 hover:border-amber-500/60 transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <span aria-hidden>⛵️</span>
              <span className="font-medium text-amber-50">Ocean banya</span>
            </div>
            <div className="text-2xl font-semibold text-amber-400 mb-1">
              $100{" "}
              <span className="text-sm text-stone-400 font-normal">
                / person
              </span>
            </div>
            <div className="text-sm text-stone-400">
              Sunset ocean cruise + banya
            </div>
            <div className="mt-3 text-xs text-amber-400">
              Book the sunset sailing →
            </div>
          </a>
        </div>
        <p className="text-xs text-stone-500 mt-6">
          Please present a valid Hawaiʻi ID at check-in.
        </p>
      </div>
    </section>
  );
}

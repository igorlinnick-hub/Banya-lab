import Image from "next/image";
import { HeroMedia } from "@/components/HeroMedia";

export const metadata = {
  title: "About · Banya Lab",
  description:
    "The story behind Banya Lab on Oʻahu — Ukrainian venik tradition, ocean healing, and the team bringing it to Hawaiʻi.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroMedia image="/media/harbor-sauna/hero.jpg" intensity="light" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-5">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-amber-50 tracking-tight">
            The old world banya, reborn in the Pacific.
          </h1>
          <p className="mt-6 text-stone-300 text-lg max-w-2xl mx-auto">
            Ukrainian venik rituals, ice plunge, and ocean healing — carried
            across the world to Oʻahu, where the practice meets aloha.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 space-y-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-stone-800">
            <Image
              src="/media/one-on-one/hero.jpg"
              alt="Maksim, healer and co-founder"
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
              Meet
            </p>
            <h2 className="text-3xl font-semibold text-amber-50 mb-4">
              Maksim — co-founder, healer
            </h2>
            <p className="text-stone-300 mb-4">
              Trained in the traditional Ukrainian school of banya healing work,
              Maksim leads every session — reading the body, choosing the right
              veniks (oak, birch, eucalyptus), and guiding the rhythm between
              steam, fire, and ice.
            </p>
            <p className="text-stone-400">
              His 1-on-1 sessions are the deepest experience we offer: three
              hours of venik work, ice bath, cold-pressed juices, and quiet
              conversation.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-950/60 p-8 md:p-10">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
            The practice
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-amber-50 mb-4">
            Fire, water, breath.
          </h2>
          <p className="text-stone-300 mb-4">
            Banya is older than any country it passes through. At Banya Lab we
            keep the form honest: hot steam built properly, veniks soaked and
            worked by hand, cold plunge for the reset, silence when it&apos;s
            time for silence.
          </p>
          <p className="text-stone-400">
            What makes it Hawaiian is the place itself — the ocean, the wind,
            the sunset. We don&apos;t fuse traditions. We just let the island
            hold the ritual.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-stone-800 p-6">
            <div className="text-amber-400 text-2xl mb-2">♨️</div>
            <h3 className="font-semibold text-amber-50 mb-2">Steam</h3>
            <p className="text-sm text-stone-400">
              Real banya heat — built for venik work, not a dry sauna.
            </p>
          </div>
          <div className="rounded-xl border border-stone-800 p-6">
            <div className="text-amber-400 text-2xl mb-2">🌊</div>
            <h3 className="font-semibold text-amber-50 mb-2">Ocean</h3>
            <p className="text-sm text-stone-400">
              Sessions on the water where we can — Hawaiian plunge after
              Hawaiian heat.
            </p>
          </div>
          <div className="rounded-xl border border-stone-800 p-6">
            <div className="text-amber-400 text-2xl mb-2">🧘</div>
            <h3 className="font-semibold text-amber-50 mb-2">Presence</h3>
            <p className="text-sm text-stone-400">
              Small groups, no rush, no phones in the steam room.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

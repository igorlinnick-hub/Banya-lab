import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { KamaainaSection } from "@/components/KamaainaSection";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/services";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/media/hero.jpg')] bg-cover bg-center opacity-40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/70 to-stone-950"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-40 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-6">
            Oʻahu · Hawaiʻi
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-amber-50">
            Banya on the ocean.
            <br />
            Healing in the fire.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-stone-300">
            Ukrainian venik rituals, ice baths, sunset cruises, and Friday
            fireworks — the old world banya, reborn in the Pacific.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="#services">
              <Button size="lg">Book a session</Button>
            </Link>
            <Link href="/retreats">
              <Button size="lg" variant="outline">
                Plan a retreat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Choose your ritual
            </h2>
          </div>
          <p className="text-stone-400 max-w-md">
            Every experience includes ice bath plunge and traditional Ukrainian
            venik work.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <KamaainaSection />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
          Host a retreat
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Bring your circle to the banya
        </h2>
        <p className="text-stone-400 mb-8">
          Full-day wellness retreats for up to 12. Bring your own group — or
          partner with us as a co-host and we&apos;ll fill the seats.
        </p>
        <Link href="/retreats">
          <Button size="lg" variant="primary">
            See retreat options
          </Button>
        </Link>
      </section>
    </>
  );
}

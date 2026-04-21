import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { KamaainaSection } from "@/components/KamaainaSection";
import { Testimonials } from "@/components/Testimonials";
import { HeroMedia } from "@/components/HeroMedia";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/services";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroMedia image="/media/hero.jpg" intensity="light" />
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

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center rounded-2xl border border-stone-800 bg-stone-950/60 overflow-hidden">
          <div className="relative aspect-video md:aspect-[4/3] md:h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/media/location.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="p-8 md:pr-10">
            <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
              Location
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-50 mb-3">
              Ala Wai Harbor · Honolulu, Oʻahu
            </h2>
            <p className="text-stone-300 mb-2">
              Sessions launch from Ala Wai Harbor, five minutes from Waikiki.
              Dockside banya, ocean plunges, sunset cruises — all from the same
              slip.
            </p>
            <p className="text-sm text-stone-500">
              Exact slip number sent with your booking confirmation.
            </p>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="relative overflow-hidden">
        <HeroMedia image="/media/retreat-cta.jpg" intensity="light" fadeTop />
        <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
            Host a retreat
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-amber-50 mb-4">
            Bring your circle to the banya
          </h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            Full-day wellness retreats for up to 12. Bring your own group — or
            partner with us as a co-host and we&apos;ll fill the seats.
          </p>
          <Link href="/retreats">
            <Button size="lg" variant="primary">
              See retreat options
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

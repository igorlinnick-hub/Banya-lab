import { Suspense } from "react";
import { RetreatForm } from "@/components/RetreatForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

export const metadata = {
  title: "Retreats · Banya Lab",
  description:
    "Host a private retreat or co-create one with us on Oʻahu. Ukrainian venik healing, ice baths, ocean and fire.",
};

export default function RetreatsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/media/retreats/hero.svg')] bg-cover bg-center opacity-40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/70 to-stone-950"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-36 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-6">
            Retreats · up to 12
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-amber-50">
            A retreat on fire and water.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-stone-300">
            Host your own circle, or co-create with us. Full-day healing on the
            Hawaiian ocean — venik rituals, ice bath, healer sessions, good food
            and music.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
            Build your retreat
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Customize everything
          </h2>
          <p className="text-stone-400 mt-3 max-w-xl">
            Pick your format, group size, and add-ons. Share the checkout link
            with your people — they can book their own seats.
          </p>
        </div>
        <Suspense>
          <RetreatForm />
        </Suspense>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold mb-4">Reserve a date</h2>
        <p className="text-stone-400 mb-6 text-sm">
          Choose a day for your retreat. We&apos;ll confirm after payment.
        </p>
        <CalendlyEmbed />
      </section>
    </>
  );
}

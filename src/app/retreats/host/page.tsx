import { HostRetreatForm } from "@/components/HostRetreatForm";
import { HeroMedia } from "@/components/HeroMedia";

export const metadata = {
  title: "Host a retreat · Banya Lab",
  description:
    "Host a private retreat on Oʻahu or co-create one with us. Up to 12 guests, venik rituals, ice bath, ocean and fire.",
};

export default function RetreatHostPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroMedia
          image="/media/retreats/hero.jpg"
          video="/media/location.mp4"
          intensity="light"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-6">
            Host · up to 12 guests
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-amber-50">
            Host your retreat
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-stone-300">
            Bring your own circle and pay the flat fee — or co-create with us
            and share a link with your people.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <HostRetreatForm />
      </section>
    </>
  );
}

import Link from "next/link";
import { AttendeeRetreatForm } from "@/components/AttendeeRetreatForm";
import { HeroMedia } from "@/components/HeroMedia";
import { RETREAT } from "@/lib/services";
import { usd } from "@/lib/format";

const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-amber-500 text-stone-950 hover:bg-amber-400 font-medium h-14 px-8 text-lg";
const btnOutline =
  "inline-flex items-center justify-center rounded-full border border-stone-700 text-stone-100 hover:bg-stone-900 font-medium h-14 px-8 text-lg";
const btnPrimaryMd =
  "inline-flex items-center justify-center rounded-full bg-amber-500 text-stone-950 hover:bg-amber-400 font-medium h-11 px-6 text-base";
const btnOutlineMd =
  "inline-flex items-center justify-center rounded-full border border-stone-700 text-stone-100 hover:bg-stone-900 font-medium h-11 px-6 text-base";

export const metadata = {
  title: "Retreats · Banya Lab",
  description:
    "Host a private retreat or co-create one with us on Oʻahu. Ukrainian venik healing, ice baths, ocean and fire.",
};

type SP = Promise<{ ref?: string }>;

export default async function RetreatsPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const { ref } = await searchParams;
  const hostRef = typeof ref === "string" && ref.length > 0 ? ref : null;

  if (hostRef) {
    return (
      <>
        <section className="relative overflow-hidden">
          <HeroMedia
            image="/media/retreats/hero.jpg"
            video="/media/drone-boat.mp4"
            intensity="light"
          />
          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
            <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-6">
              You&apos;re invited · {hostRef}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-amber-50">
              Join the retreat
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-stone-300">
              A full day on the Hawaiian ocean — venik rituals, ice bath, healer
              sessions, food and music.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <AttendeeRetreatForm hostRef={hostRef} />
        </section>
      </>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <HeroMedia
          image="/media/retreats/hero.jpg"
          video="/media/drone-boat.mp4"
          intensity="light"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-36 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-6">
            Retreats · up to {RETREAT.maxPeople}
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-amber-50">
            A retreat on fire and water.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-stone-300">
            Host your own circle, or co-create with us. Full-day healing on the
            Hawaiian ocean — venik rituals, ice bath, healer sessions, good food
            and music.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/retreats/host" className={btnPrimary}>
              Host a retreat
            </Link>
            <a href="#invited" className={btnOutline}>
              I was invited
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-stone-800 bg-stone-950/60 p-8">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
            Option 1
          </p>
          <h2 className="text-2xl font-semibold text-amber-50 mb-3">
            Private retreat
          </h2>
          <p className="text-stone-400 mb-4">
            You bring your group (up to {RETREAT.maxPeople}). Pay a flat fee,
            customize add-ons, pick your date. We handle the rest.
          </p>
          <p className="text-amber-400 mb-6">
            From {usd(RETREAT.basePrice)} · half day · {usd(RETREAT.fullDayPrice)} full day
          </p>
          <Link href="/retreats/host" className={btnPrimaryMd}>
            Start hosting
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-950/60 p-8">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
            Option 2
          </p>
          <h2 className="text-2xl font-semibold text-amber-50 mb-3">
            Co-retreat with us
          </h2>
          <p className="text-stone-400 mb-4">
            Invite at least {RETREAT.coRetreatMinPeople} people; we fill the
            rest. Guests pay {usd(RETREAT.coRetreatPricePerPerson)} each. You
            get 20% of every seat sold through your link.
          </p>
          <p className="text-amber-400 mb-6">No upfront fee</p>
          <Link href="/retreats/host" className={btnOutlineMd}>
            Get my referral link
          </Link>
        </div>
      </section>

      <section
        id="invited"
        className="mx-auto max-w-4xl px-6 py-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-amber-50 mb-3">
          Were you invited?
        </h2>
        <p className="text-stone-400 max-w-xl mx-auto">
          Use the link your host sent you — it looks like{" "}
          <code className="text-amber-300">/retreats?ref=their-name</code>. That
          credits the seat to them and unlocks the guest checkout.
        </p>
      </section>
    </>
  );
}

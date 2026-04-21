import type { ReactNode } from "react";

export const metadata = {
  title: "FAQ · Banya Lab",
  description:
    "What to bring, who it's for, how cold is the ice bath, refunds, weather, pregnancy — common questions about Banya Lab sessions on Oʻahu.",
};

type QA = { q: string; a: ReactNode };

const SECTIONS: { title: string; items: QA[] }[] = [
  {
    title: "Before you come",
    items: [
      {
        q: "What should I bring?",
        a: "Swimsuit, towel, slippers or flip-flops, a water bottle, and something warm for after. We provide veniks, ice, and tea. If you booked food or juices, those are covered.",
      },
      {
        q: "What should I eat beforehand?",
        a: "Come well-hydrated but not heavy. A light meal 1–2 hours before is ideal. Avoid alcohol in the 12 hours leading up to a session — it changes how your body handles the heat and the plunge.",
      },
      {
        q: "How early should I arrive?",
        a: "15 minutes before your start time. We need the heat ready and the group together when we begin.",
      },
    ],
  },
  {
    title: "The session",
    items: [
      {
        q: "How hot is the banya, and how cold is the plunge?",
        a: "Steam temperature runs 70–90°C (160–195°F). Ice bath is 2–6°C (36–43°F). You set the pace — nobody gets pushed.",
      },
      {
        q: "What is venik work, exactly?",
        a: "A guided massage-like technique using bundled oak, birch, or eucalyptus branches soaked in hot water. It's the heart of Ukrainian banya — opens the breath, drives the heat deeper, and smells like a forest.",
      },
      {
        q: "Do I have to do the ice bath?",
        a: "No. The plunge is the reset, and most people love it once they try it, but it's your choice every round.",
      },
      {
        q: "Is it clothing-optional?",
        a: "No — swimsuits are required in every setting. Banya Lab is a mixed-group, public-facing space.",
      },
    ],
  },
  {
    title: "Health & safety",
    items: [
      {
        q: "Can I come if I'm pregnant?",
        a: "We don't recommend banya heat or ice plunge during pregnancy. Talk to your doctor; we're happy to plan a gentle alternative (a cruise without the heat, for example).",
      },
      {
        q: "What if I have heart issues or high blood pressure?",
        a: "Please check with your doctor first. If you're cleared, let us know at check-in so we can adjust the rounds and keep an eye on you.",
      },
      {
        q: "Is there an age minimum?",
        a: "18+ for standard sessions. Teens 14+ are welcome with a parent for Harbor Sauna and retreats; boats are 18+.",
      },
      {
        q: "Do I sign a waiver?",
        a: "Yes — a short liability waiver covering banya heat, ice plunge, and boat activity. You'll see it at check-in.",
      },
    ],
  },
  {
    title: "Boats, weather & logistics",
    items: [
      {
        q: "Where do the boats launch from?",
        a: "Ala Wai Harbor, Honolulu. We'll send the exact slip number and parking notes after booking.",
      },
      {
        q: "What happens if the weather is bad?",
        a: "If we have to cancel for weather or ocean conditions, we reschedule you or refund in full — your choice. We don't run boats in unsafe conditions.",
      },
      {
        q: "Can I bring my own drinks?",
        a: "On the Sunday Boat Party, yes. On other boats, we prefer you check with us first — some sessions are alcohol-free by design.",
      },
    ],
  },
  {
    title: "Booking & payment",
    items: [
      {
        q: "How do I book?",
        a: "Pick a service, configure add-ons, pay through Stripe, and choose your date on the Calendly that loads right after payment. You'll get an email confirmation.",
      },
      {
        q: "What's your refund policy?",
        a: (
          <>
            Full refund if you cancel 7+ days out, 50% up to 48 hours out,
            nothing inside 48 hours — except weather cancellations on our side,
            which are always full refund or reschedule. See{" "}
            <a
              href="/legal/refund"
              className="text-amber-300 hover:text-amber-200"
            >
              Refund &amp; Waiver
            </a>
            .
          </>
        ),
      },
      {
        q: "Do you offer kamaʻāina rates?",
        a: "Yes — locals with a valid Hawaiʻi ID get kamaʻāina pricing on Harbor Sauna ($50 flat) and Ocean Banya ($100/person). Present ID at check-in.",
      },
      {
        q: "Can I reschedule?",
        a: "Yes, free reschedule up to 48 hours before your session through the Calendly link in your confirmation email.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-5">
          Frequently asked
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-amber-50 tracking-tight">
          Before your first banya
        </h1>
        <p className="mt-5 text-stone-400 max-w-2xl mx-auto">
          Most of what you need to know. If something&apos;s still unclear,
          email <span className="text-amber-300">maksimzap8@gmail.com</span>.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-stone-800 bg-stone-950/40 open:bg-stone-950/80"
                >
                  <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4">
                    <span className="font-medium text-amber-50">{item.q}</span>
                    <span className="text-amber-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-stone-400 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

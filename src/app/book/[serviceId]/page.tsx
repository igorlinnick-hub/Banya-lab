import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getService, SERVICES, CALENDLY } from "@/lib/services";
import { BookingForm } from "@/components/BookingForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { KamaainaCallout } from "@/components/KamaainaCallout";

const KAMAAINA_BY_SLUG: Record<
  string,
  { price: string; detail: string; bookingUrl?: string }
> = {
  "harbor-sauna": {
    price: "$50 flat",
    detail: "2.5 hours · venik steaming + ice plunge",
    bookingUrl: CALENDLY.kamaainaHarbor,
  },
  "friday-fireworks": {
    price: "$100 / person",
    detail: "Sunset ocean banya with Hawaiian ID",
  },
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ serviceId: s.slug }));
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const service = getService(serviceId);
  if (!service) notFound();
  const kamaaina = KAMAAINA_BY_SLUG[service.slug];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/#services"
        className="text-sm text-stone-400 hover:text-amber-50"
      >
        ← All services
      </Link>

      <div className="mt-6 grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900">
          {service.heroVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={service.name}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={service.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={service.hero}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-amber-50">
            {service.name}
          </h1>
          <p className="mt-2 text-amber-400">{service.tagline}</p>
          <p className="mt-6 text-stone-300">{service.description}</p>
          {service.schedule && (
            <p className="mt-4 text-sm uppercase tracking-widest text-stone-500">
              {service.schedule}
            </p>
          )}
          <ul className="mt-6 space-y-1 text-sm text-stone-300">
            {service.includes.map((i) => (
              <li key={i}>· {i}</li>
            ))}
          </ul>
          {service.contact && (
            <p className="mt-6 text-sm text-stone-400">
              Questions? Reach {service.contact.name}
              {service.contact.instagram && (
                <>
                  {" "}
                  on{" "}
                  <a
                    href={service.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 underline underline-offset-2"
                  >
                    Instagram
                  </a>
                </>
              )}
              .
            </p>
          )}
        </div>
      </div>

      {kamaaina && !service.comingSoon && (
        <div className="mb-8">
          <KamaainaCallout
            price={kamaaina.price}
            detail={kamaaina.detail}
            bookingUrl={kamaaina.bookingUrl}
          />
        </div>
      )}

      {service.comingSoon ? (
        <section className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-10 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
            Coming soon
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-amber-50 mb-3">
            We&apos;re not running this one yet
          </h2>
          <p className="text-stone-300 max-w-xl mx-auto mb-6">
            Sunday Boat Party is in planning — we&apos;ll announce the first
            date soon. Follow us on Instagram or email us to get on the
            waitlist.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:maksimzap8@gmail.com?subject=Waitlist · Sunday Boat Party"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 text-stone-950 hover:bg-amber-400 font-medium h-11 px-6"
            >
              Join the waitlist
            </a>
            <a
              href="https://instagram.com/banya_lab_hawaii"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-stone-700 text-stone-100 hover:bg-stone-900 font-medium h-11 px-6"
            >
              Follow on Instagram
            </a>
          </div>
        </section>
      ) : (
        <>
          <BookingForm service={service} />
          <section className="mt-20">
            <h2 className="text-2xl font-semibold mb-4">Pick a date</h2>
            <p className="text-stone-400 mb-6 text-sm">
              Choose an available time. We&apos;ll confirm after payment.
            </p>
            <CalendlyEmbed url={service.calendlyUrl} />
          </section>
        </>
      )}
    </div>
  );
}

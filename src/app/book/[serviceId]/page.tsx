import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getService, SERVICES } from "@/lib/services";
import { BookingForm } from "@/components/BookingForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

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
          <Image
            src={service.hero}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
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

      <BookingForm service={service} />

      <section className="mt-20">
        <h2 className="text-2xl font-semibold mb-4">Pick a date</h2>
        <p className="text-stone-400 mb-6 text-sm">
          Choose an available time. We&apos;ll confirm after payment.
        </p>
        <CalendlyEmbed />
      </section>
    </div>
  );
}

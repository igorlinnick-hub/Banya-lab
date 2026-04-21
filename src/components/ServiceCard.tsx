import Link from "next/link";
import Image from "next/image";
import { usd } from "@/lib/format";
import type { Service } from "@/lib/services";

function priceLabel(s: Service) {
  const unit =
    s.priceUnit === "per_person"
      ? "/ person"
      : s.priceUnit === "per_day"
        ? "/ day"
        : "flat";
  return `${usd(s.basePrice)} ${unit === "flat" ? "" : unit}`.trim();
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/book/${service.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 hover:border-amber-500/60 transition"
    >
      <div className="relative aspect-[4/3] bg-stone-900">
        {service.heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={service.hero}
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
          >
            <source src={service.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={service.hero}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition"
          />
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-amber-50">
            {service.name}
          </h3>
          <span className="text-amber-400 text-sm whitespace-nowrap mt-1">
            {priceLabel(service)}
          </span>
        </div>
        <p className="text-sm text-stone-400">{service.tagline}</p>
        {service.schedule && (
          <p className="text-xs uppercase tracking-wider text-stone-500 mt-auto">
            {service.schedule}
          </p>
        )}
      </div>
    </Link>
  );
}

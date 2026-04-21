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

function Media({ service }: { service: Service }) {
  return (
    <div className="relative aspect-[4/3] bg-stone-900">
      <Image
        src={service.hero}
        alt={service.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover opacity-80 transition group-hover:opacity-100"
      />
      {service.comingSoon && (
        <>
          <div className="absolute inset-0 bg-stone-950/50" aria-hidden />
          <span className="absolute top-3 left-3 rounded-full bg-amber-500/90 text-stone-950 text-xs font-semibold uppercase tracking-widest px-3 py-1">
            Coming soon
          </span>
        </>
      )}
    </div>
  );
}

function Body({ service }: { service: Service }) {
  return (
    <div className="p-6 flex flex-col gap-3 flex-1">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-amber-50">{service.name}</h3>
        <span className="text-amber-400 text-sm whitespace-nowrap mt-1">
          {service.comingSoon ? "—" : priceLabel(service)}
        </span>
      </div>
      <p className="text-sm text-stone-400">{service.tagline}</p>
      {service.comingSoon ? (
        <p className="text-xs uppercase tracking-wider text-amber-400/80 mt-auto">
          Not booking yet · join the waitlist
        </p>
      ) : (
        service.schedule && (
          <p className="text-xs uppercase tracking-wider text-stone-500 mt-auto">
            {service.schedule}
          </p>
        )
      )}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const baseClasses =
    "group flex flex-col rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 transition";

  if (service.comingSoon) {
    return (
      <div className={`${baseClasses} opacity-80`}>
        <Media service={service} />
        <Body service={service} />
      </div>
    );
  }

  return (
    <Link
      href={`/book/${service.slug}`}
      className={`${baseClasses} hover:border-amber-500/60`}
    >
      <Media service={service} />
      <Body service={service} />
    </Link>
  );
}

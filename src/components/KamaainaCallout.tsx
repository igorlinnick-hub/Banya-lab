type Props = {
  price: string;
  detail: string;
  bookingUrl?: string;
};

export function KamaainaCallout({ price, detail, bookingUrl }: Props) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-emerald-950/40 to-amber-950/30 p-4 md:p-5 flex flex-wrap items-center gap-4">
      <div className="text-2xl" aria-hidden>
        🌺
      </div>
      <div className="flex-1 min-w-[200px]">
        <div className="text-xs uppercase tracking-[0.25em] text-amber-400 mb-1">
          Kamaʻāina · Hawaiian ID
        </div>
        <div className="text-amber-50">
          <span className="font-semibold">{price}</span>{" "}
          <span className="text-stone-400">· {detail}</span>
        </div>
      </div>
      {bookingUrl ? (
        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1 rounded-full bg-amber-500 text-stone-950 hover:bg-amber-400 h-10 px-5 text-sm font-medium"
        >
          Book with ID →
        </a>
      ) : (
        <div className="text-xs text-stone-400">
          Present valid Hawaiʻi ID at check-in
        </div>
      )}
    </div>
  );
}

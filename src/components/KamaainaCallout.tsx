type Props = {
  price: string;
  detail: string;
};

export function KamaainaCallout({ price, detail }: Props) {
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
      <div className="text-xs text-stone-400">
        Present valid Hawaiʻi ID at check-in
      </div>
    </div>
  );
}

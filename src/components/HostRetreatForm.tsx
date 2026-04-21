"use client";
import { useMemo, useState } from "react";
import { usd } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { RETREAT, RETREAT_ADDONS } from "@/lib/services";
import { readUtm } from "@/components/UtmCapture";

type Mode = "private" | "co-retreat";
type Timing = "half-day" | "full-day";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function HostRetreatForm() {
  const [mode, setMode] = useState<Mode>("private");
  const [timing, setTiming] = useState<Timing>("full-day");
  const [people, setPeople] = useState<number>(RETREAT.coRetreatMinPeople);
  const [addOns, setAddOns] = useState<Record<string, number>>({});
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string | null>(null);

  const minPeople = mode === "co-retreat" ? RETREAT.coRetreatMinPeople : 1;
  const maxPeople = RETREAT.maxPeople;

  const baseTotal = useMemo(() => {
    if (mode === "co-retreat") return 0;
    return timing === "full-day" ? RETREAT.fullDayPrice : RETREAT.basePrice;
  }, [mode, timing]);

  const addOnLines = useMemo(
    () =>
      RETREAT_ADDONS.map((a) => {
        const qty = addOns[a.id] ?? 0;
        if (qty === 0) return null;
        const headcount = mode === "co-retreat" ? people : people;
        const unit = a.perPerson ? a.price * headcount : a.price;
        return {
          id: a.id,
          name: a.name + (a.perPerson ? ` × ${headcount}` : ""),
          unitPrice: unit,
          quantity: qty,
          total: unit * qty,
        };
      }).filter(Boolean) as {
        id: string;
        name: string;
        unitPrice: number;
        quantity: number;
        total: number;
      }[],
    [addOns, mode, people],
  );

  const addOnTotal = addOnLines.reduce((s, l) => s + l.total, 0);
  const grandTotal = baseTotal + addOnTotal;

  async function handlePrivateCheckout() {
    setSubmitting(true);
    setError(null);
    try {
      const items = [
        {
          id: `retreat-private-${timing}`,
          name: `Private retreat · ${timing === "full-day" ? "Full day" : "Half day"}`,
          unitPrice:
            timing === "full-day" ? RETREAT.fullDayPrice : RETREAT.basePrice,
          quantity: 1,
        },
        ...addOnLines.map((l) => ({
          id: l.id,
          name: l.name,
          unitPrice: l.unitPrice,
          quantity: l.quantity,
        })),
      ];

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          serviceId: "retreat-private",
          items,
          customer: { name: hostName, email: hostEmail },
          notes,
          metadata: {
            mode: "private",
            timing,
            people: String(people),
            ...readUtm(),
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Checkout failed");
      }
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL returned");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setSubmitting(false);
    }
  }

  async function handleCoRetreatSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const slug = slugify(hostName);
      const link =
        typeof window !== "undefined"
          ? `${window.location.origin}/retreats?ref=${encodeURIComponent(slug)}`
          : `/retreats?ref=${encodeURIComponent(slug)}`;

      await fetch("/api/retreat-host", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode: "co-retreat",
          host: { name: hostName, email: hostEmail, slug },
          people,
          addOns,
          notes,
        }),
      }).catch(() => {});

      setGenerated(link);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  }

  if (generated) {
    return (
      <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-8 space-y-4">
        <p className="uppercase tracking-[0.3em] text-amber-400 text-xs">
          Your referral link is ready
        </p>
        <h2 className="text-2xl font-semibold text-amber-50">
          Share this with your people
        </h2>
        <p className="text-stone-400">
          Each guest pays {usd(RETREAT.coRetreatPricePerPerson)} for their seat
          (plus any add-ons). You get 20% of every seat sold through your link.
          We&apos;ll reach out to {hostEmail} to confirm the date.
        </p>
        <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 flex items-center justify-between gap-3">
          <code className="text-amber-300 text-sm break-all">{generated}</code>
          <Button
            type="button"
            size="sm"
            onClick={() => navigator.clipboard.writeText(generated)}
          >
            Copy
          </Button>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setGenerated(null);
            setMode("private");
          }}
        >
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10">
      <div className="space-y-8">
        <section>
          <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
            Retreat type
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <ModeCard
              selected={mode === "private"}
              onClick={() => setMode("private")}
              title="Private retreat"
              description="You bring your group (up to 12). Pay the flat retreat fee now."
              price={`${usd(RETREAT.basePrice)}+`}
            />
            <ModeCard
              selected={mode === "co-retreat"}
              onClick={() => setMode("co-retreat")}
              title="Co-retreat with us"
              description={`You invite min ${RETREAT.coRetreatMinPeople}; we fill the rest. Guests pay ${usd(RETREAT.coRetreatPricePerPerson)}/seat. 80/20 split.`}
              price="No upfront fee"
            />
          </div>
        </section>

        {mode === "private" && (
          <section>
            <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
              Timing
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <ModeCard
                selected={timing === "half-day"}
                onClick={() => setTiming("half-day")}
                title="Half day"
                description="Core ritual + sauna + ice bath"
                price={usd(RETREAT.basePrice)}
              />
              <ModeCard
                selected={timing === "full-day"}
                onClick={() => setTiming("full-day")}
                title="Full day"
                description="Morning to ~7pm return"
                price={usd(RETREAT.fullDayPrice)}
              />
            </div>
          </section>
        )}

        <section>
          <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
            How many people?
          </h3>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPeople((p) => Math.max(minPeople, p - 1))}
            >
              −
            </Button>
            <div className="w-16 text-center text-2xl font-semibold">
              {people}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPeople((p) => Math.min(maxPeople, p + 1))}
            >
              +
            </Button>
            <span className="text-sm text-stone-400 ml-2">
              min {minPeople} · max {maxPeople}
            </span>
          </div>
        </section>

        {mode === "private" && (
          <section>
            <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
              Add-ons
            </h3>
            <div className="space-y-2">
              {RETREAT_ADDONS.map((a) => {
                const qty = addOns[a.id] ?? 0;
                return (
                  <div
                    key={a.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-stone-800 p-4"
                  >
                    <div>
                      <div className="font-medium text-amber-50">{a.name}</div>
                      {a.description && (
                        <div className="text-sm text-stone-400 mt-0.5">
                          {a.description}
                        </div>
                      )}
                      <div className="text-xs text-stone-500 mt-1">
                        {usd(a.price)}
                        {a.perPerson ? " / person" : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setAddOns((prev) => ({
                            ...prev,
                            [a.id]: Math.max(0, (prev[a.id] ?? 0) - 1),
                          }))
                        }
                      >
                        −
                      </Button>
                      <div className="w-6 text-center">{qty}</div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setAddOns((prev) => ({
                            ...prev,
                            [a.id]: (prev[a.id] ?? 0) + 1,
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
            Your details (host)
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name (will slugify into your ref link)"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-amber-50 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={hostEmail}
              onChange={(e) => setHostEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-amber-50 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
            <textarea
              placeholder="Vision, dates, special requests"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-amber-50 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          {mode === "co-retreat" && hostName && (
            <p className="text-xs text-stone-500 mt-3">
              Your ref link will be:{" "}
              <code className="text-amber-300">
                /retreats?ref={slugify(hostName)}
              </code>
            </p>
          )}
        </section>
      </div>

      <aside className="h-fit sticky top-24 rounded-2xl border border-stone-800 bg-stone-950 p-6 space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-amber-400">
          Summary
        </h3>
        {mode === "private" ? (
          <>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-300">
                  Private retreat ·{" "}
                  {timing === "full-day" ? "Full day" : "Half day"}
                </span>
                <span>{usd(baseTotal)}</span>
              </div>
              {addOnLines.map((l) => (
                <div
                  key={l.id}
                  className="flex justify-between text-stone-400"
                >
                  <span>
                    {l.name} × {l.quantity}
                  </span>
                  <span>{usd(l.total)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-800 pt-4 flex justify-between text-lg">
              <span className="text-stone-300">Total</span>
              <span className="text-amber-400 font-semibold">
                {usd(grandTotal)}
              </span>
            </div>
            {error && (
              <div className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
            <Button
              type="button"
              size="lg"
              className="w-full"
              disabled={submitting || !hostEmail || !hostName}
              onClick={handlePrivateCheckout}
            >
              {submitting ? "Redirecting…" : `Checkout · ${usd(grandTotal)}`}
            </Button>
            <p className="text-xs text-stone-500 text-center">
              Pay now · pick date after payment
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-stone-400">
              No payment from you. You&apos;ll get a ref link to share with
              your circle. Each guest pays{" "}
              {usd(RETREAT.coRetreatPricePerPerson)} for their seat; 20% goes
              to you after the retreat.
            </p>
            {error && (
              <div className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
            <Button
              type="button"
              size="lg"
              className="w-full"
              disabled={submitting || !hostEmail || !hostName}
              onClick={handleCoRetreatSubmit}
            >
              {submitting ? "Working…" : "Get my referral link"}
            </Button>
            <p className="text-xs text-stone-500 text-center">
              We&apos;ll email you to confirm the date
            </p>
          </>
        )}
      </aside>
    </div>
  );
}

function ModeCard({
  selected,
  onClick,
  title,
  description,
  price,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  price: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "text-left rounded-xl border p-4 transition " +
        (selected
          ? "border-amber-500 bg-amber-500/10"
          : "border-stone-800 hover:border-stone-700")
      }
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <div className="font-medium text-amber-50">{title}</div>
          <div className="text-sm text-stone-400 mt-1">{description}</div>
        </div>
        <div className="text-amber-400 text-sm whitespace-nowrap">{price}</div>
      </div>
    </button>
  );
}

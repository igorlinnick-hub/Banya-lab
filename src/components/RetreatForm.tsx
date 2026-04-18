"use client";
import { useMemo, useState, useEffect } from "react";
import { usd } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { RETREAT, RETREAT_ADDONS } from "@/lib/services";

type Mode = "private" | "co-retreat";
type Timing = "half-day" | "full-day";

export function RetreatForm() {
  const [mode, setMode] = useState<Mode>("private");
  const [timing, setTiming] = useState<Timing>("full-day");
  const [people, setPeople] = useState<number>(RETREAT.coRetreatMinPeople);
  const [addOns, setAddOns] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [ref, setRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const r = url.searchParams.get("ref");
    if (r) setRef(r);
  }, []);

  const minPeople = mode === "co-retreat" ? RETREAT.coRetreatMinPeople : 1;
  const maxPeople = RETREAT.maxPeople;

  useEffect(() => {
    setPeople((p) => Math.min(maxPeople, Math.max(minPeople, p)));
  }, [mode, minPeople, maxPeople]);

  const baseTotal = useMemo(() => {
    if (mode === "co-retreat") {
      return RETREAT.coRetreatPricePerPerson * people;
    }
    return timing === "full-day" ? RETREAT.fullDayPrice : RETREAT.basePrice;
  }, [mode, timing, people]);

  const addOnLines = useMemo(() => {
    return RETREAT_ADDONS.map((a) => {
      const qty = addOns[a.id] ?? 0;
      if (qty === 0) return null;
      const unit = a.perPerson ? a.price * people : a.price;
      return {
        id: a.id,
        name: a.name + (a.perPerson ? " (per person)" : ""),
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
    }[];
  }, [addOns, people]);

  const addOnTotal = addOnLines.reduce((s, l) => s + l.total, 0);
  const grandTotal = baseTotal + addOnTotal;

  async function handleCheckout() {
    setSubmitting(true);
    setError(null);
    try {
      const baseItemName =
        mode === "co-retreat"
          ? `Co-retreat seat (80/20 split · ref: ${ref ?? "direct"})`
          : `Private retreat · ${timing === "full-day" ? "Full day" : "Half day"}`;

      const items = [
        {
          id: `retreat-${mode}-${timing}`,
          name: baseItemName,
          unitPrice:
            mode === "co-retreat"
              ? RETREAT.coRetreatPricePerPerson
              : timing === "full-day"
                ? RETREAT.fullDayPrice
                : RETREAT.basePrice,
          quantity: mode === "co-retreat" ? people : 1,
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
          serviceId: "retreat",
          items,
          customer: { name: customerName, email: customerEmail },
          notes,
          metadata: {
            mode,
            timing,
            people: String(people),
            referrer: ref ?? "",
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Checkout failed");
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10">
      <div className="space-y-8">
        {ref && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
            You&apos;re booking through <strong>{ref}</strong> — thanks for
            coming through their circle.
          </div>
        )}

        <section>
          <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
            Retreat type
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <ModeCard
              selected={mode === "private"}
              onClick={() => setMode("private")}
              title="Host a private retreat"
              description="You bring your group (up to 12). Flat base price."
              price={usd(RETREAT.basePrice) + "+"}
            />
            <ModeCard
              selected={mode === "co-retreat"}
              onClick={() => setMode("co-retreat")}
              title="Co-retreat with us"
              description={`Min ${RETREAT.coRetreatMinPeople} of your people; we fill the rest. 80/20 split.`}
              price={usd(RETREAT.coRetreatPricePerPerson) + " / person"}
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

        <section>
          <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
            Your details
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-amber-50 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-amber-50 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
            <textarea
              placeholder="Tell us about your group and intentions"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 text-amber-50 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </section>
      </div>

      <aside className="h-fit sticky top-24 rounded-2xl border border-stone-800 bg-stone-950 p-6 space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-amber-400">
          Summary
        </h3>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-stone-300">
              {mode === "private"
                ? `Private retreat · ${timing === "full-day" ? "Full day" : "Half day"}`
                : `Co-retreat seat × ${people}`}
            </span>
            <span>{usd(baseTotal)}</span>
          </div>
          {addOnLines.map((l) => (
            <div key={l.id} className="flex justify-between text-stone-400">
              <span>
                {l.name} × {l.quantity}
              </span>
              <span>{usd(l.total)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-800 pt-4 flex justify-between text-lg">
          <span className="text-stone-300">Total</span>
          <span className="text-amber-400 font-semibold">{usd(grandTotal)}</span>
        </div>
        {mode === "co-retreat" && (
          <p className="text-xs text-stone-500">
            80/20 split with host{ref ? ` (${ref})` : ""} handled after payment.
          </p>
        )}
        {error && (
          <div className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-200">
            {error}
          </div>
        )}
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={submitting || !customerEmail || !customerName}
          onClick={handleCheckout}
        >
          {submitting ? "Redirecting…" : `Checkout · ${usd(grandTotal)}`}
        </Button>
        <p className="text-xs text-stone-500 text-center">
          Secure payment via Stripe
        </p>
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

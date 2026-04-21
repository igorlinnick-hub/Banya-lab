"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { usd } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { RETREAT, RETREAT_ADDONS } from "@/lib/services";
import { readUtm } from "@/components/UtmCapture";

type Props = { hostRef: string };

export function AttendeeRetreatForm({ hostRef }: Props) {
  const [addOns, setAddOns] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const seatPrice = RETREAT.coRetreatPricePerPerson;

  const addOnLines = useMemo(
    () =>
      RETREAT_ADDONS.map((a) => {
        const qty = addOns[a.id] ?? 0;
        if (qty === 0) return null;
        return {
          id: a.id,
          name: a.name,
          unitPrice: a.price,
          quantity: qty,
          total: a.price * qty,
          perPerson: a.perPerson,
        };
      }).filter(Boolean) as {
        id: string;
        name: string;
        unitPrice: number;
        quantity: number;
        total: number;
      }[],
    [addOns],
  );

  const addOnTotal = addOnLines.reduce((s, l) => s + l.total, 0);
  const grandTotal = seatPrice + addOnTotal;

  async function handleCheckout() {
    setSubmitting(true);
    setError(null);
    try {
      const items = [
        {
          id: `retreat-seat-${hostRef}`,
          name: `Retreat seat · hosted by ${hostRef}`,
          unitPrice: seatPrice,
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
          serviceId: "retreat-attendee",
          items,
          customer: { name: customerName, email: customerEmail },
          notes,
          metadata: {
            mode: "co-retreat-attendee",
            referrer: hostRef,
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

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10">
      <div className="space-y-8">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 mb-2">
            You&apos;re invited
          </p>
          <p className="text-amber-50">
            You&apos;re joining <strong>{hostRef}</strong>&apos;s retreat. One
            seat is <strong>{usd(seatPrice)}</strong>. Pick any add-ons, pay,
            then choose your date on the next step.
          </p>
        </div>

        <section>
          <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
            Add-ons (optional)
          </h3>
          <div className="space-y-2">
            {RETREAT_ADDONS.map((a) => {
              const qty = addOns[a.id] ?? 0;
              return (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-stone-800 p-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {a.image && (
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-stone-900 shrink-0">
                        <Image
                          src={a.image}
                          alt={a.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
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
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
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
              placeholder="Anything we should know? (intentions, dietary needs, etc.)"
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
            <span className="text-stone-300">Retreat seat</span>
            <span>{usd(seatPrice)}</span>
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
          disabled={submitting || !customerEmail || !customerName}
          onClick={handleCheckout}
        >
          {submitting ? "Redirecting…" : `Checkout · ${usd(grandTotal)}`}
        </Button>
        <p className="text-xs text-stone-500 text-center">
          Secure payment via Stripe · pick date after payment
        </p>
      </aside>
    </div>
  );
}

"use client";
import { useMemo, useState } from "react";
import { usd } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/services";

type CartItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export function BookingForm({ service }: { service: Service }) {
  const initialVariantId = service.variants?.[0]?.id;
  const [variantId, setVariantId] = useState<string | undefined>(initialVariantId);
  const [people, setPeople] = useState<number>(
    Math.max(service.minPeople ?? 1, 1),
  );
  const [addOns, setAddOns] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const variant = useMemo(
    () => service.variants?.find((v) => v.id === variantId),
    [service.variants, variantId],
  );

  const basePriceUnit = variant?.priceUnit ?? service.priceUnit;
  const basePrice = variant?.price ?? service.basePrice;

  const baseLineTotal =
    basePriceUnit === "per_person" ? basePrice * people : basePrice;

  const addOnLines = useMemo(() => {
    return service.addOns
      .map((a) => {
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
      })
      .filter(Boolean) as {
      id: string;
      name: string;
      unitPrice: number;
      quantity: number;
      total: number;
    }[];
  }, [addOns, people, service.addOns]);

  const addOnTotal = addOnLines.reduce((sum, l) => sum + l.total, 0);
  const grandTotal = baseLineTotal + addOnTotal;

  async function handleCheckout() {
    setSubmitting(true);
    setError(null);
    try {
      const items: CartItem[] = [
        {
          id: `${service.id}${variant ? `-${variant.id}` : ""}`,
          name:
            service.name + (variant ? ` · ${variant.name}` : ""),
          unitPrice: basePrice,
          quantity: basePriceUnit === "per_person" ? people : 1,
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
          serviceId: service.id,
          items,
          customer: { name: customerName, email: customerEmail },
          notes,
          metadata: {
            people: String(people),
            variant: variant?.id ?? "",
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
        {service.variants && service.variants.length > 0 && (
          <section>
            <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
              Option
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.variants.map((v) => {
                const selected = v.id === variantId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={
                      "text-left rounded-xl border p-4 transition " +
                      (selected
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-stone-800 hover:border-stone-700")
                    }
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="font-medium text-amber-50">
                          {v.name}
                        </div>
                        {v.description && (
                          <div className="text-sm text-stone-400 mt-1">
                            {v.description}
                          </div>
                        )}
                      </div>
                      <div className="text-amber-400 text-sm whitespace-nowrap">
                        {usd(v.price)}
                        {v.priceUnit === "per_person" ? " /pp" : ""}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {basePriceUnit === "per_person" && (
          <section>
            <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
              Guests
            </h3>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setPeople((p) =>
                    Math.max(service.minPeople ?? 1, p - 1),
                  )
                }
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
                onClick={() =>
                  setPeople((p) =>
                    service.maxPeople
                      ? Math.min(service.maxPeople, p + 1)
                      : p + 1,
                  )
                }
              >
                +
              </Button>
              {service.minPeople && (
                <span className="text-sm text-stone-400 ml-2">
                  min {service.minPeople}
                </span>
              )}
            </div>
          </section>
        )}

        {service.addOns.length > 0 && (
          <section>
            <h3 className="text-sm uppercase tracking-widest text-amber-400 mb-3">
              Add-ons
            </h3>
            <div className="space-y-2">
              {service.addOns.map((a) => {
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
              placeholder="Anything we should know?"
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
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-300">
              {service.name}
              {variant ? ` · ${variant.name}` : ""}
              {basePriceUnit === "per_person" ? ` × ${people}` : ""}
            </span>
            <span>{usd(baseLineTotal)}</span>
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

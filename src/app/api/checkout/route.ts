import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const ItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  unitPrice: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

const BodySchema = z.object({
  serviceId: z.string(),
  items: z.array(ItemSchema).min(1),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
  notes: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export async function POST(req: Request) {
  let parsed;
  try {
    const json = await req.json();
    parsed = BodySchema.parse(json);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request", details: String(err) },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const line_items = parsed.items.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: Math.round(item.unitPrice * 100),
      product_data: {
        name: item.name,
        metadata: { item_id: item.id },
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: parsed.customer.email,
    line_items,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
    metadata: {
      service_id: parsed.serviceId,
      customer_name: parsed.customer.name,
      notes: parsed.notes ?? "",
      ...(parsed.metadata ?? {}),
    },
  });

  return NextResponse.json({ url: session.url });
}

import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const payload = await req.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    return NextResponse.json(
      { error: `Invalid signature: ${String(err)}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      // TODO: send confirmation email, record booking, notify Maksim, etc.
      // const session = event.data.object;
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

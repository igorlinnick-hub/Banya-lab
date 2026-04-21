import Link from "next/link";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { getCalendlyForService, CALENDLY } from "@/lib/services";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type SP = Promise<{ session_id?: string }>;

async function resolveSession(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const serviceId = (session.metadata?.service_id ?? "").toString();
    return {
      serviceId,
      customerEmail:
        session.customer_details?.email ?? session.customer_email ?? null,
      customerName:
        session.customer_details?.name ??
        session.metadata?.customer_name ??
        null,
      amountTotal: session.amount_total ?? null,
    };
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const { session_id } = await searchParams;
  const info = await resolveSession(session_id);
  const calendlyUrl =
    (info && getCalendlyForService(info.serviceId)) ?? CALENDLY.retreat;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="text-center mb-10">
        <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-4">
          Payment received
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-amber-50 mb-4">
          {info?.customerName
            ? `Mahalo, ${info.customerName.split(" ")[0]}.`
            : "Mahalo. See you at the banya."}
        </h1>
        <p className="text-stone-400 max-w-xl mx-auto">
          A receipt is on its way
          {info?.customerEmail ? (
            <>
              {" "}
              to <span className="text-amber-300">{info.customerEmail}</span>
            </>
          ) : null}
          . Pick your date below — we&apos;ll confirm location and prep details
          after.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-3 text-center">
          Choose your date
        </h2>
        <CalendlyEmbed url={calendlyUrl} />
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-stone-700 text-stone-100 hover:bg-stone-900 font-medium h-11 px-6 text-base"
        >
          Back to Banya Lab
        </Link>
      </div>
    </div>
  );
}

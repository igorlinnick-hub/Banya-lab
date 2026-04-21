export const metadata = {
  title: "Privacy Policy · Banya Lab",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 text-stone-300 space-y-6">
      <p className="uppercase tracking-[0.3em] text-amber-400 text-xs">Legal</p>
      <h1 className="text-4xl font-semibold text-amber-50">Privacy Policy</h1>
      <p className="text-stone-400 text-sm">Last updated: April 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          What we collect
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-stone-300">
          <li>
            <strong>Booking info:</strong> name, email, phone (if given), notes
            you share.
          </li>
          <li>
            <strong>Payment info:</strong> processed entirely by Stripe. We
            never see or store your card.
          </li>
          <li>
            <strong>Site usage:</strong> basic analytics (pages visited, device
            type) via Google Analytics / Meta Pixel when enabled. No personal
            identifiers are sent in that stream.
          </li>
          <li>
            <strong>Cookies:</strong> functional (session continuity) and, if
            you consent, marketing cookies for retargeting.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          How we use it
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-stone-300">
          <li>To confirm bookings and contact you about your session.</li>
          <li>
            To send occasional updates (only if you opted in — we don&apos;t
            spam).
          </li>
          <li>To improve the site and understand which offers resonate.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          Who we share it with
        </h2>
        <p>
          Only our essential processors: Stripe (payment), Calendly
          (scheduling), our email service (transactional email), and analytics
          providers. We do not sell your data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">Your rights</h2>
        <p>
          Email{" "}
          <a
            href="mailto:maksimzap8@gmail.com"
            className="text-amber-300 hover:text-amber-200"
          >
            maksimzap8@gmail.com
          </a>{" "}
          to access, correct, or delete the data we hold about you. We&apos;ll
          respond within 30 days.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">Retention</h2>
        <p>
          Booking records are kept for 7 years for tax and liability reasons.
          Marketing opt-ins are kept until you unsubscribe.
        </p>
      </section>
    </article>
  );
}

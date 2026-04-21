export const metadata = {
  title: "Terms of Service · Banya Lab",
};

export default function TermsPage() {
  return (
    <article className="prose-invert mx-auto max-w-3xl px-6 py-20 text-stone-300 space-y-6">
      <p className="uppercase tracking-[0.3em] text-amber-400 text-xs">Legal</p>
      <h1 className="text-4xl font-semibold text-amber-50">
        Terms of Service
      </h1>
      <p className="text-stone-400 text-sm">Last updated: April 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">1. Who we are</h2>
        <p>
          Banya Lab (&quot;we&quot;, &quot;us&quot;) operates traditional banya,
          ice bath, and ocean cruise experiences on Oʻahu, Hawaiʻi. By booking
          or attending a session you agree to these Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">2. Bookings</h2>
        <p>
          Bookings are confirmed once payment is received and a date is
          selected in the calendar. You must be 18 or older to book. Minors
          14–17 may attend Harbor Sauna and retreat sessions only when
          accompanied by a consenting parent or legal guardian.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          3. Health disclosure &amp; waiver
        </h2>
        <p>
          Banya heat, ice plunge, and boat activities carry inherent risks.
          You are responsible for disclosing any medical condition that could
          be affected (heart conditions, pregnancy, high or low blood pressure,
          epilepsy, recent surgery, etc.). You will sign a liability waiver at
          check-in; without it, we cannot run the session.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          4. Weather &amp; conditions
        </h2>
        <p>
          We reserve the right to cancel or reschedule any boat session for
          unsafe weather or ocean conditions. In that case you get a full
          refund or reschedule at no cost — your choice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">5. Conduct</h2>
        <p>
          Banya Lab is a shared, respectful space. Harassment, intoxicated or
          unsafe behavior, or refusing reasonable crew instructions are grounds
          for ending your session without refund.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          6. Photography
        </h2>
        <p>
          Personal photography is welcome outside the steam room. We may take
          wide-angle photos and video for marketing — tell us at check-in if
          you&apos;d like to be excluded.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          7. Changes to these terms
        </h2>
        <p>
          We may update these Terms occasionally. The version in effect at the
          time of your booking is the one that applies to that booking.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">8. Contact</h2>
        <p>
          Questions:{" "}
          <a
            href="mailto:maksimzap8@gmail.com"
            className="text-amber-300 hover:text-amber-200"
          >
            maksimzap8@gmail.com
          </a>
          .
        </p>
      </section>
    </article>
  );
}

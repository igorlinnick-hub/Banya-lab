export const metadata = {
  title: "Refund & Waiver · Banya Lab",
};

export default function RefundPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 text-stone-300 space-y-6">
      <p className="uppercase tracking-[0.3em] text-amber-400 text-xs">Legal</p>
      <h1 className="text-4xl font-semibold text-amber-50">
        Refund &amp; Waiver
      </h1>
      <p className="text-stone-400 text-sm">Last updated: April 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">Refund policy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>7+ days before your session:</strong> full refund, no
            questions.
          </li>
          <li>
            <strong>48 hours to 7 days before:</strong> 50% refund, or full
            credit toward a future session.
          </li>
          <li>
            <strong>Inside 48 hours:</strong> no refund (we&apos;ve already
            prepared and held the slot). You can transfer your seat to a
            friend.
          </li>
          <li>
            <strong>Weather cancellation on our side:</strong> full refund or
            free reschedule, always.
          </li>
          <li>
            <strong>Medical emergency:</strong> full refund with a doctor&apos;s
            note.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          Reschedule window
        </h2>
        <p>
          Free reschedule up to 48 hours before your session through the
          Calendly link in your confirmation email. Inside 48 hours, contact us
          directly — we&apos;ll do our best.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          Liability waiver (summary)
        </h2>
        <p>
          By attending a Banya Lab session you acknowledge that banya heat,
          cold plunge, and ocean activities involve real risk. You confirm that
          you are in adequate health to participate and that you have disclosed
          any relevant medical condition. You release Banya Lab and its crew
          from liability for injuries arising from the normal operation of the
          session, except in cases of gross negligence.
        </p>
        <p className="text-stone-400">
          You&apos;ll sign the full waiver at check-in. If you&apos;d like to
          read it beforehand, email{" "}
          <a
            href="mailto:maksimzap8@gmail.com"
            className="text-amber-300 hover:text-amber-200"
          >
            maksimzap8@gmail.com
          </a>{" "}
          and we&apos;ll send the PDF.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-50">
          Who should not attend
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Pregnant guests (please book a non-heat alternative).</li>
          <li>
            Guests under the influence of alcohol or recreational substances.
          </li>
          <li>
            Anyone with uncontrolled heart disease, recent cardiac events, or
            seizures without medical clearance.
          </li>
        </ul>
      </section>
    </article>
  );
}

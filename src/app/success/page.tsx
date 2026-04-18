import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-4">
        Booking confirmed
      </p>
      <h1 className="text-4xl font-semibold text-amber-50 mb-4">
        See you at the banya.
      </h1>
      <p className="text-stone-400 mb-8">
        A confirmation is on its way to your inbox. We&apos;ll reach out with
        location details and anything you need to bring.
      </p>
      <Link href="/">
        <Button>Back to Banya Lab</Button>
      </Link>
    </div>
  );
}

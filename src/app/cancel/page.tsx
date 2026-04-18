import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-4xl font-semibold text-amber-50 mb-4">
        Checkout cancelled
      </h1>
      <p className="text-stone-400 mb-8">
        No payment was taken. Come back any time.
      </p>
      <Link href="/">
        <Button variant="outline">Back to services</Button>
      </Link>
    </div>
  );
}

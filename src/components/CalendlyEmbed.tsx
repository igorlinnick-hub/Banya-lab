"use client";
import { InlineWidget } from "react-calendly";

export function CalendlyEmbed({ url, height = 720 }: { url?: string; height?: number }) {
  const link = url ?? process.env.NEXT_PUBLIC_CALENDLY_URL;
  if (!link) {
    return (
      <div className="rounded-xl border border-stone-800 bg-stone-950 p-8 text-center text-stone-400">
        Calendly link not configured yet. Set{" "}
        <code className="text-amber-300">NEXT_PUBLIC_CALENDLY_URL</code> in your
        environment.
      </div>
    );
  }
  return (
    <div className="rounded-xl overflow-hidden border border-stone-800">
      <InlineWidget url={link} styles={{ height }} />
    </div>
  );
}

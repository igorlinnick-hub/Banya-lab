import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const BodySchema = z.object({
  mode: z.literal("co-retreat"),
  host: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    slug: z.string().min(1),
  }),
  people: z.number().int().positive(),
  addOns: z.record(z.string(), z.number()).optional(),
  notes: z.string().optional(),
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

  console.log("[retreat-host] co-retreat signup", {
    host: parsed.host,
    people: parsed.people,
    addOns: parsed.addOns,
    notes: parsed.notes,
    ts: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, slug: parsed.host.slug });
}

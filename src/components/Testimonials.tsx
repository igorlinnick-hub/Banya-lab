type Quote = {
  name: string;
  location: string;
  service: string;
  text: string;
};

const QUOTES: Quote[] = [
  {
    name: "Anya K.",
    location: "Kailua, HI",
    service: "Friday Fireworks",
    text: "First banya of my life. I cried, I laughed, I jumped in the ocean three times. The fireworks were just the bonus.",
  },
  {
    name: "Dmitri & Sasha",
    location: "Honolulu",
    service: "Honeymoon Private",
    text: "We booked this for our anniversary. Sunset, rose petals, Maksim's venik work, a bottle of wine on the boat. A night we'll be telling stories about forever.",
  },
  {
    name: "Leilani",
    location: "North Shore",
    service: "Harbor Sauna · Kamaʻāina",
    text: "As a local I wasn't sure what a Ukrainian banya would feel like here. Now I go every month. The crew is warm, the plunge is real, and the price for kamaʻāina is unbeatable.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-3">
          Guests
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-amber-50">
          What people carry home
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            className="rounded-2xl border border-stone-800 bg-stone-950/60 p-6 flex flex-col"
          >
            <blockquote className="text-stone-300 italic flex-1">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 pt-4 border-t border-stone-800">
              <div className="text-amber-50 font-medium">{q.name}</div>
              <div className="text-xs text-stone-500">
                {q.location} · {q.service}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

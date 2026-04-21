import Image from "next/image";

export const metadata = {
  title: "Gallery · Banya Lab",
  description:
    "Photos and videos from Banya Lab sessions on Oʻahu — harbor banya, sunset cruises, retreats.",
};

type Shot = {
  src: string;
  alt: string;
  aspect: "tall" | "wide" | "square";
  video?: string;
};

const SHOTS: Shot[] = [
  {
    src: "/media/hero.jpg",
    alt: "Banya heat and venik",
    aspect: "wide",
    video: "/media/banya-hero.mp4",
  },
  {
    src: "/media/friday-fireworks/hero.jpg",
    alt: "Friday fireworks cruise",
    aspect: "tall",
  },
  {
    src: "/media/harbor-sauna/hero.jpg",
    alt: "Harbor sauna session",
    aspect: "square",
  },
  {
    src: "/media/retreats/hero.jpg",
    alt: "Ala Wai location · the harbor",
    aspect: "wide",
    video: "/media/location.mp4",
  },
  {
    src: "/media/story.jpg",
    alt: "The story · Ukrainian banya in Oʻahu",
    aspect: "tall",
  },
  {
    src: "/media/honeymoon/hero.jpg",
    alt: "Private romantic cruise",
    aspect: "tall",
  },
  {
    src: "/media/one-on-one/hero.jpg",
    alt: "One-on-one venik ritual",
    aspect: "square",
  },
  {
    src: "/media/ocean-cruise/hero.jpg",
    alt: "Dolphins off the bow",
    aspect: "wide",
    video: "/media/boat-dolphins.mp4",
  },
  {
    src: "/media/boat-party/hero.jpg",
    alt: "Sunday boat party",
    aspect: "square",
  },
  {
    src: "/media/extras/ala-wai-harbor-panorama.jpg",
    alt: "Ala Wai Harbor panorama",
    aspect: "wide",
  },
];

const aspectClass: Record<Shot["aspect"], string> = {
  tall: "row-span-2 aspect-[3/4]",
  wide: "col-span-2 aspect-[16/9]",
  square: "aspect-square",
};

export default function GalleryPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="uppercase tracking-[0.3em] text-amber-400 text-xs mb-5">
          Gallery
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-amber-50 tracking-tight">
          Fire, water, light.
        </h1>
        <p className="mt-5 text-stone-400 max-w-2xl mx-auto">
          A few moments from sessions on Oʻahu.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[260px]">
          {SHOTS.map((shot) => (
            <div
              key={shot.src}
              className={`relative overflow-hidden rounded-xl border border-stone-800 ${aspectClass[shot.aspect]}`}
            >
              {shot.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={shot.src}
                  aria-label={shot.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={shot.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover hover:scale-[1.03] transition-transform duration-500"
                />
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-stone-500 mt-8">
          More photos and videos coming soon.
        </p>
      </section>
    </>
  );
}

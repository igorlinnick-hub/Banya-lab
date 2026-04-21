type Props = {
  image: string;
  video?: string;
  intensity?: "light" | "medium";
  fadeTop?: boolean;
};

export function HeroMedia({
  image,
  video,
  intensity = "light",
  fadeTop = false,
}: Props) {
  const overlay =
    intensity === "medium"
      ? "bg-gradient-to-b from-stone-950/40 via-stone-950/40 to-stone-950/80"
      : "bg-gradient-to-b from-stone-950/15 via-stone-950/25 to-stone-950/70";

  return (
    <>
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url('${image}')` }}
          aria-hidden
        />
      )}
      <div className={`absolute inset-0 ${overlay}`} aria-hidden />
      {fadeTop && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-56 bg-gradient-to-t from-transparent to-stone-950"
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-stone-950"
        aria-hidden
      />
    </>
  );
}

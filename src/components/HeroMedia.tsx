type Props = {
  image: string;
  video?: string;
  intensity?: "light" | "medium";
};

export function HeroMedia({ image, video, intensity = "light" }: Props) {
  const overlay =
    intensity === "medium"
      ? "bg-gradient-to-b from-stone-950/40 via-stone-950/50 to-stone-950"
      : "bg-gradient-to-b from-stone-950/15 via-stone-950/30 to-stone-950/90";

  return (
    <>
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={image}
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
    </>
  );
}

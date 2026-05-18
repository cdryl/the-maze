import Image from "next/image";

const featureCards = [
  {
    title: "Endless Jungle Run",
    description: "Keep moving forward and push your distance record.",
    icon: "/images/feature-trophy.png",
  },
  {
    title: "Deadly Arrows",
    description: "React quickly and avoid traps flying from the shadows.",
    icon: "/images/feature-arrows.png",
  },
  {
    title: "Torchlight Challenge",
    description: "Limited visibility makes every second more intense.",
    icon: "/images/feature-torch.png",
  },
];

export default function GameInfo() {
  return (
    <section className="jungle-section relative isolate z-10 px-5 py-18 text-center text-white sm:px-8 lg:px-12">
      <Image
        src="/images/section-pattern.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-75"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_4%,rgba(223,151,47,0.22),transparent_28%),radial-gradient(circle_at_80%_42%,rgba(56,93,33,0.2),transparent_24%),linear-gradient(180deg,rgba(2,6,4,0.74),rgba(2,8,5,0.58)_42%,rgba(1,3,2,0.88))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-[#030805] via-[#030805]/68 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#010302] via-[#010302]/58 to-transparent" />
      <div className="hero-leaves hero-leaves-left opacity-45" />
      <div className="hero-leaves hero-leaves-right opacity-45" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-anton text-[clamp(2.7rem,8vw,5.8rem)] leading-[0.9] text-[#f4ead3] hero-title">
            How Far Can You Run?
          </h2>
          <div className="game-info-divider mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-2xl font-poets text-lg leading-8 text-[#f7e8c4] sm:text-2xl">
            Sprint through a forgotten jungle maze, dodge deadly arrows, and rely on
            weak torchlight to survive. Every run is a fight for distance, timing,
            and focus.
          </p>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {featureCards.map((card) => (
            <article key={card.title} className="game-info-card">
              <span className="game-info-corner game-info-corner-tl" />
              <span className="game-info-corner game-info-corner-tr" />
              <span className="game-info-corner game-info-corner-bl" />
              <span className="game-info-corner game-info-corner-br" />
              <Image
                src={card.icon}
                alt=""
                width={520}
                height={520}
                className="mx-auto h-[124px] w-[124px] object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.72)] sm:h-36 sm:w-36"
              />
              <h3 className="mt-5 font-anton text-3xl leading-none text-[#f0b33e] drop-shadow-[0_3px_0_rgba(44,18,2,0.9)]">
                {card.title}
              </h3>
              <div className="game-info-card-divider mx-auto mt-4" />
              <p className="mt-4 font-poets text-base leading-7 text-[#f9e9c8] sm:text-lg">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

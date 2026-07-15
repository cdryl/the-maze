import Image from "next/image";

export default function Prizes() {
  return (
    <section
      id="prizes"
      className="jungle-section relative isolate z-20 scroll-mt-20 px-4 py-16 text-center text-white sm:px-8 sm:py-20 lg:px-12"
    >
      <Image
        src="/images/section-pattern.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_8%,rgba(223,151,47,0.22),transparent_30%),linear-gradient(180deg,rgba(2,6,4,0.82),rgba(2,8,5,0.58)_45%,rgba(1,3,2,0.9))]" />
      <div className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-56 bg-[linear-gradient(180deg,#000_0%,#000_24%,rgba(0,0,0,0.72)_62%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#030805] via-[#030805]/62 to-transparent" />

      <div className="relative mx-auto max-w-4xl">
        <h2 className="font-anton text-[clamp(2.6rem,8vw,5.8rem)] leading-[0.9] text-[#f4ead3] hero-title">
          Prizes
        </h2>
        <div className="game-info-divider mx-auto mt-6" />

        <article className="game-info-card mx-auto mt-10 max-w-md">
          <span className="game-info-corner game-info-corner-tl" />
          <span className="game-info-corner game-info-corner-tr" />
          <span className="game-info-corner game-info-corner-bl" />
          <span className="game-info-corner game-info-corner-br" />
          <Image
            src="/images/feature-trophy.png"
            alt=""
            width={520}
            height={520}
            className="mx-auto h-32 w-32 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.72)] sm:h-40 sm:w-40"
          />
          <h3 className="mt-5 font-anton text-4xl leading-none text-[#f0b33e] drop-shadow-[0_3px_0_rgba(44,18,2,0.9)]">
            Coming Soon
          </h3>
          <div className="game-info-card-divider mx-auto mt-4" />
          <p className="mt-4 font-poets text-base leading-7 text-[#f9e9c8] sm:text-lg">
            Rewards are still hidden deep in the maze. Check back soon for the first prize reveal.
          </p>
        </article>
      </div>
    </section>
  );
}

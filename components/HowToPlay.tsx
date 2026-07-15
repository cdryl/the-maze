import Image from "next/image";

const steps = [
  {
    title: "Dodge Arrows",
    description: "React fast when traps fly out of the shadows.",
  },
  {
    title: "Stay In The Light",
    description: "Use weak torchlight to read the maze before it disappears.",
  },
  {
    title: "Push Your Run",
    description: "Keep moving forward and chase a longer distance every time.",
  },
];

export default function HowToPlay() {
  return (
    <section
      id="how-to-play"
      className="jungle-section relative isolate z-0 scroll-mt-20 px-4 py-16 text-center text-white sm:px-8 sm:py-24 lg:px-12"
    >
      <Image
        src="/images/section-pattern.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-72"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_8%,rgba(223,151,47,0.2),transparent_30%),linear-gradient(180deg,rgba(2,6,4,0.82),rgba(2,8,5,0.56)_45%,rgba(1,3,2,0.9))]" />
      <div className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-56 bg-[linear-gradient(180deg,#000_0%,#000_24%,rgba(0,0,0,0.72)_62%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px -z-10 h-56 bg-[linear-gradient(0deg,#000_0%,#000_24%,rgba(0,0,0,0.72)_62%,transparent_100%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-anton text-[clamp(2.45rem,8vw,5.8rem)] leading-[0.9] text-[#f4ead3] hero-title">
            How To Play
          </h2>
          <div className="game-info-divider mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-2xl font-poets text-base leading-7 text-[#f7e8c4] sm:text-2xl sm:leading-8">
            Three quick steps, one dangerous jungle maze.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="game-info-card">
              <span className="game-info-corner game-info-corner-tl" />
              <span className="game-info-corner game-info-corner-tr" />
              <span className="game-info-corner game-info-corner-bl" />
              <span className="game-info-corner game-info-corner-br" />

              <div className="mx-auto flex aspect-[9/16] w-full max-w-[210px] items-center justify-center rounded-[22px] border-2 border-[#9a6d2e] bg-[linear-gradient(180deg,rgba(13,24,13,0.95),rgba(2,5,3,0.98))] p-3 shadow-[inset_0_0_0_1px_rgba(255,218,126,0.14),0_18px_36px_rgba(0,0,0,0.45)]">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-[16px] border border-[#31451f] bg-[radial-gradient(circle_at_50%_18%,rgba(225,150,42,0.18),transparent_34%),linear-gradient(180deg,#071108,#020403)] px-4 text-center">
                  <span className="font-anton text-6xl leading-none text-[#f0b33e] drop-shadow-[0_4px_0_rgba(44,18,2,0.9)]">
                    {index + 1}
                  </span>
                  <span className="mt-3 font-poets text-sm uppercase tracking-[0.18em] text-[#d9c987]">
                    screenshot
                  </span>
                </div>
              </div>

              <h3 className="mt-5 font-anton text-[1.7rem] leading-none text-[#f0b33e] drop-shadow-[0_3px_0_rgba(44,18,2,0.9)] sm:text-3xl">
                {step.title}
              </h3>
              <div className="game-info-card-divider mx-auto mt-4" />
              <p className="mt-4 font-poets text-[0.95rem] leading-6 text-[#f9e9c8] sm:text-lg sm:leading-7">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

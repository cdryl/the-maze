import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="jungle-section relative isolate z-30 min-h-svh scroll-mt-20 px-4 pt-24 text-white sm:px-8 sm:pt-28 lg:px-12"
    >
      <Image
        src="/images/hero.png"
        alt="Explorer entering a jungle temple maze"
        fill
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover object-[58%_center]"
        priority
      />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(248,181,61,0.16),transparent_24%),linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.28)_36%,rgba(0,0,0,0.18)_62%,rgba(0,0,0,0.75)),linear-gradient(180deg,rgba(2,7,4,0.6),rgba(2,7,4,0.08)_42%,#030805_100%)]" />
      <div className="absolute inset-x-0 -bottom-px -z-10 h-44 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.78)_24%,rgba(0,0,0,0.38)_62%,transparent_100%)] sm:h-80 sm:bg-[linear-gradient(0deg,#000_0%,#000_24%,rgba(0,0,0,0.74)_62%,transparent_100%)]" />
      <div className="hero-vignette absolute inset-0 -z-10" />
      <Image
        src="/images/leaves.png"
        alt=""
        width={870}
        height={1507}
        className="hero-foliage hero-foliage-left"
        priority
      />
      <Image
        src="/images/leaves.png"
        alt=""
        width={870}
        height={1507}
        className="hero-foliage hero-foliage-right"
        priority
      />

      <div className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-6xl flex-col items-center justify-center pb-14 text-center sm:min-h-[calc(100vh-7rem)] sm:pb-16">
        <Image
          src="/images/logo_512x512.png"
          alt="The Maze Logo"
          width={512}
          height={512}
          className="h-auto w-36 drop-shadow-[0_20px_46px_rgba(0,0,0,0.65)] animate-drop-down sm:w-48 md:w-56 lg:w-64"
          priority
        />

        <div className="relative mt-5 max-w-5xl animate-fade-in">
          <div className="absolute inset-x-6 top-1/2 -z-10 h-28 -translate-y-1/2 rounded-full bg-black/45 blur-3xl" />
          <p className="font-poets text-xs uppercase tracking-[0.22em] text-[#bed36a] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-base sm:tracking-[0.28em]">
            Endless jungle runner
          </p>
          <h1 className="mt-3 font-anton text-[clamp(2.8rem,12vw,8.8rem)] leading-[0.86] text-[#f4ead3] hero-title">
            <span className="block">RUN DEEPER</span>
            <span className="-mt-1 block tracking-[-0.03em] text-[#f1aa2e] sm:-mt-2 md:-mt-3">
              INTO THE MAZE
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-poets text-base leading-7 text-[#f7e8c4] drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)] sm:text-2xl">
            Dodge arrows, survive the jungle, and chase the highest score.
          </p>

          <div className="mt-16 flex flex-col items-center gap-3 sm:mt-24">
            <p className="font-poets text-sm text-[#d9c987] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-base">
              Coming soon on App Store and Google Play
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

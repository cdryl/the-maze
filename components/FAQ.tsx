const faqItems = [
  {
    question: "When will The Maze be available?",
    answer:
      "The game has been submitted to the App Store and Google Play. Store availability will follow once the review process is complete.",
  },
  {
    question: "What kind of game is it?",
    answer:
      "The Maze is an endless jungle runner where every run is about timing, distance, and surviving incoming arrows for as long as possible.",
  },
  {
    question: "Will scores appear on the leaderboard?",
    answer:
      "Yes. The leaderboard highlights top explorers and is split into daily, weekly, and monthly rankings.",
  },
  {
    question: "Is the game easy to learn?",
    answer:
      "Yes. The rules are simple and quick to understand, but pushing a high score takes focus, rhythm, and clean reactions.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="jungle-section relative isolate z-0 scroll-mt-20 px-4 py-16 text-white sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="faq-pattern-bg" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_8%,rgba(223,151,47,0.2),transparent_28%),linear-gradient(180deg,rgba(2,6,4,0.82),rgba(2,8,5,0.58)_42%,rgba(1,3,2,0.92))]" />
      <div className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-72 bg-[linear-gradient(180deg,#000_0%,#000_30%,rgba(0,0,0,0.72)_64%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px -z-10 h-48 bg-gradient-to-t from-[#010302] via-[#010302]/72 via-48% to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-anton text-[clamp(2.5rem,8vw,5.8rem)] leading-[0.9] text-[#f4ead3] hero-title">
          FAQ
        </h2>
        <div className="game-info-divider mx-auto mt-6" />
        <p className="mx-auto mt-6 max-w-2xl font-poets text-base leading-7 text-[#f7e8c4] sm:text-2xl sm:leading-8">
          Quick answers before you step into the maze.
        </p>

        <div className="mt-10 grid gap-4 text-left">
          {faqItems.map((item) => (
            <details key={item.question} className="faq-card group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-poets text-lg text-[#ffe6ad] sm:text-xl">
                <span>{item.question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p className="mt-4 font-poets text-[0.95rem] leading-7 text-[#f9e9c8] sm:text-lg">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { getFaqItems } from "@/lib/faq";
import FaqList from "./FaqList";

export default async function FAQ() {
  const faqItems = await getFaqItems();

  return (
    <section
      id="faq"
      className="jungle-section relative isolate z-0 scroll-mt-20 px-4 py-16 text-white sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="faq-pattern-bg" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_8%,rgba(223,151,47,0.2),transparent_28%),linear-gradient(180deg,rgba(2,6,4,0.82),rgba(2,8,5,0.58)_42%,rgba(1,3,2,0.92))]" />
      <div className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-40 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0.78)_30%,rgba(0,0,0,0.38)_64%,transparent_100%)] sm:h-72 sm:bg-[linear-gradient(180deg,#000_0%,#000_30%,rgba(0,0,0,0.72)_64%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px -z-10 h-32 bg-gradient-to-t from-[#010302] via-[#010302]/46 via-48% to-transparent sm:h-48 sm:via-[#010302]/72" />

      <div className="relative mx-auto my-10 max-w-4xl text-center">
        <h2 className="font-anton text-[clamp(2.5rem,8vw,5.8rem)] leading-[0.9] text-[#f4ead3] hero-title">
          FAQ
        </h2>
        <div className="game-info-divider mx-auto mt-6" />
        <p className="mx-auto mt-6 max-w-2xl font-poets text-base leading-7 text-[#f7e8c4] sm:text-2xl sm:leading-8">
          Quick answers before you step into the maze.
        </p>

        <FaqList initialItems={faqItems} />
      </div>
    </section>
  );
}

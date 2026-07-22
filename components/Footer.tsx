import Image from "next/image";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Prizes", href: "/#prizes" },
  { label: "Leaderboard", href: "/#leaderboard" },
  { label: "About", href: "/#about" },
  { label: "How To Play", href: "/#how-to-play" },
  { label: "FAQ", href: "/#faq" },
  { label: "Delete Account", href: "/delete-account" },
];

export default function Footer() {
  return (
    <footer className="jungle-section relative isolate px-4 pb-10 pt-16 text-white sm:px-8 lg:px-12">
      <Image
        src="/images/section-pattern.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(223,151,47,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.92),rgba(2,8,5,0.7)_42%,rgba(0,0,0,0.96))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-[#010302] via-[#010302]/54 to-transparent sm:h-40 sm:via-[#010302]/76" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 pt-10 md:grid-cols-[1.1fr_1fr_1fr] md:items-start">
          <div className="text-center md:text-left">
            <Image
              src="/images/logo_512x512.png"
              alt="The Maze Logo"
              width={160}
              height={160}
              className="mx-auto h-24 w-24 drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)] md:mx-0"
            />
            <p className="mt-4 font-poets text-base leading-7 text-[#f7e8c4] sm:text-lg">
              Run deeper, dodge faster, and chase the maze record.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="text-center md:text-left">
            <h2 className="font-anton text-2xl text-[#f0b33e] drop-shadow-[0_3px_0_rgba(44,18,2,0.9)]">
              Explore
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 font-poets text-sm text-[#f7e8c4] sm:text-base">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-[#febc33]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="text-center md:text-left">
            <h2 className="font-anton text-2xl text-[#f0b33e] drop-shadow-[0_3px_0_rgba(44,18,2,0.9)]">
              Coming Soon
            </h2>
            <p className="mt-4 font-poets text-base leading-7 text-[#f7e8c4]">
              Submitted to the App Store and Google Play.
            </p>
            <div className="mx-auto mt-5 h-px w-44 bg-gradient-to-r from-transparent via-[#b98524] to-transparent md:mx-0" />
          </div>
        </div>

        <p className="mt-10 text-center font-poets text-xs uppercase tracking-[0.22em] text-[#d9c987]/80">
          The Maze © 2026
        </p>
      </div>
    </footer>
  );
}

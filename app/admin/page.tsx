import type { Metadata } from "next";
import Image from "next/image";
import AdminFaqEditor from "@/components/AdminFaqEditor";

export const metadata: Metadata = {
  title: "Admin | The Maze",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="relative flex min-h-svh flex-1 flex-col overflow-x-hidden bg-[#030805]">
      <section className="jungle-section relative isolate px-4 pb-16 pt-28 text-white sm:px-8 sm:pt-32 lg:px-12">
        <Image
          src="/images/section-pattern.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none -z-20 object-cover opacity-72"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(223,151,47,0.2),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.78),rgba(2,8,5,0.62)_38%,rgba(0,0,0,0.94))]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <Image
            src="/images/logo_512x512.png"
            alt="The Maze Logo"
            width={512}
            height={512}
            className="mx-auto h-auto w-28 drop-shadow-[0_20px_46px_rgba(0,0,0,0.65)] sm:w-40"
            priority
          />
          <h1 className="mt-6 font-anton text-[clamp(2.7rem,10vw,6.6rem)] leading-[0.9] text-[#f4ead3] hero-title">
            Admin
          </h1>
          <div className="game-info-divider mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-2xl font-poets text-base leading-7 text-[#f7e8c4] sm:text-2xl sm:leading-8">
            Edit FAQ items shown on the landing page.
          </p>

          <AdminFaqEditor />
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import DeleteAccountForm from "@/components/DeleteAccountForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Delete Account | The Maze",
  description: "Request deletion of your The Maze player account.",
};

export default function DeleteAccountPage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-x-hidden bg-[#030805]">
      <section className="jungle-section relative isolate min-h-svh px-4 pb-16 pt-28 text-center text-white sm:px-8 sm:pt-32 lg:px-12">
        <Image
          src="/images/section-pattern.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none -z-20 object-cover opacity-72"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(223,151,47,0.22),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.76),rgba(2,8,5,0.58)_42%,rgba(0,0,0,0.94))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.72)_42%,transparent_100%)] sm:h-64" />

        <div className="relative mx-auto max-w-4xl">
          <Image
            src="/images/logo_512x512.png"
            alt="The Maze Logo"
            width={512}
            height={512}
            className="mx-auto h-auto w-32 drop-shadow-[0_20px_46px_rgba(0,0,0,0.65)] sm:w-44"
            priority
          />
          <h1 className="mt-6 font-anton text-[clamp(2.7rem,10vw,6.6rem)] leading-[0.9] text-[#f4ead3] hero-title">
            Delete Account
          </h1>
          <div className="game-info-divider mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-2xl font-poets text-base leading-7 text-[#f7e8c4] sm:text-2xl sm:leading-8">
            Enter your player ID and send us a pre-filled account deletion request.
          </p>

          <div className="game-info-card mx-auto mt-10 max-w-2xl">
            <span className="game-info-corner game-info-corner-tl" />
            <span className="game-info-corner game-info-corner-tr" />
            <span className="game-info-corner game-info-corner-bl" />
            <span className="game-info-corner game-info-corner-br" />
            <DeleteAccountForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

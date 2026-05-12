import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative h-screen flex justify-center overflow-hidden pt-32">
      <Image
        src="/images/hero.png"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-5"></div>
      <div className="relative z-10 flex flex-col items-center gap-8">
        <Image
          src="/images/logo_512x512.png"
          alt="The Maze Logo"
          width={400}
          height={400}
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-2xl animate-drop-down"
          priority
        />
        <div className="animate-fade-in mt-64">
          <Button>Watch Trailer</Button>
        </div>
      </div>
    </section>
  );
}
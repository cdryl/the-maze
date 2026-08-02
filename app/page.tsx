import Leaderboard from "@/components/Leaderboard";
import GameInfo from "@/components/GameInfo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HowToPlay from "@/components/HowToPlay";
import Prizes from "@/components/Prizes";
import SectionDivider from "@/components/SectionDivider";
import Hero from "../components/Hero";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-hidden bg-[#030805]">
      <Hero />
      <SectionDivider />
      <Prizes />
      <SectionDivider />
      <Leaderboard />
      <SectionDivider />
      <GameInfo />
      <SectionDivider />
      <HowToPlay />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <Footer />
    </div>
  );
}

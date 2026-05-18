import Leaderboard from "@/components/Leaderboard";
import GameInfo from "@/components/GameInfo";
import SectionDivider from "@/components/SectionDivider";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col bg-[#030805]">
      <Hero />
      <SectionDivider />
      <Leaderboard />
      <SectionDivider />
      <GameInfo />
    </div>
  );
}

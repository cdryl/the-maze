import type { Metadata } from "next";
import { Anton } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Maze",
  description: "The Maze is a captivating adventure game that challenges players to navigate through intricate mazes filled with puzzles and surprises. With stunning visuals, immersive soundscapes, and engaging gameplay, The Maze offers an unforgettable experience for gamers of all ages. Explore mysterious labyrinths, solve mind-bending puzzles, and uncover hidden secrets as you embark on an epic journey through The Maze.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

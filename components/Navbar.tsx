"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: "home", href: "#home" },
    { label: "leaderboard", href: "#leaderboard" },
    { label: "about", href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in ${
        !isMenuOpen && isScrolled ? "bg-[#030805]/58 md:backdrop-blur-md" : ""
      }`}
    >
      <div className="relative z-20 flex max-w-full items-center justify-between px-4 py-2 sm:px-8">
        <div className="shrink-0 -mb-4 sm:-mb-6">
          <Image
            src="/images/logo_512x512.png"
            alt="The Maze Logo"
            width={120}
            height={120}
            className="h-20 w-20 sm:h-32 sm:w-32"
          />
        </div>

        <div className="hidden gap-8 md:flex md:gap-12">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-poets text-lg text-white transition-colors duration-200 hover:text-[#febc33] md:text-xl"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg border border-[#b98524]/45 bg-[#07110a]/72 shadow-[inset_0_0_18px_rgba(255,185,65,0.08),0_8px_24px_rgba(0,0,0,0.42)] md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-5 w-6 flex-col justify-between">
            <span
              className={`h-0.5 rounded-full bg-[#ffd67a] transition-transform duration-200 ${
                isMenuOpen ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 rounded-full bg-[#ffd67a] transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 rounded-full bg-[#ffd67a] transition-transform duration-200 ${
                isMenuOpen ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <div className="hidden w-12 shrink-0 md:block" />
      </div>

      <div
        className={`fixed inset-0 z-10 bg-[#030805] md:hidden ${
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        } transition-all duration-200`}
      >
        <Image
          src="/images/section-pattern.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(222,142,36,0.2),transparent_34%),linear-gradient(180deg,rgba(3,8,5,0.72),rgba(3,8,5,0.62)_42%,rgba(1,3,2,0.88))]" />
        <div className="relative flex h-full flex-col justify-center px-6 pb-12 pt-24">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block border-b border-[#8f662d]/28 px-4 py-5 text-center font-poets text-3xl text-[#f7e8c4] transition-colors last:border-b-0 hover:bg-[#f0a22e]/10 hover:text-[#febc33]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

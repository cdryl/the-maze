"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Adventure", "Explore", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible animate-fade-in ${
        isScrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <div className="flex items-center justify-between px-8 py-2 max-w-full">
        {/* Logo */}
        <div className="flex-shrink-0 -mb-6">
          <Image
            src="/images/logo_512x512.png"
            alt="The Maze Logo"
            width={120}
            height={120}
            className="w-32 h-32"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 md:gap-12">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-poets text-white text-lg md:text-xl hover:text-[#febc33] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Spacer for right alignment */}
        <div className="flex-shrink-0 w-12"></div>
      </div>
    </nav>
  );
}

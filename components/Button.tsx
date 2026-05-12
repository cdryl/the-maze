import Image from "next/image";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center hover:scale-110 transition-transform duration-500 ease-out cursor-pointer"
    >
      <Image
        src="/images/main-button.png"
        alt="Button background"
        width={300}
        height={100}
        className="w-64 h-auto md:w-80 lg:w-[32rem]"
      />
      <span 
        className="absolute font-marker font-bold text-lg md:text-2xl lg:text-4xl drop-shadow-lg"
        style={{ color: "#4d1700" }}
      >
        {children}
      </span>
    </button>
  );
}

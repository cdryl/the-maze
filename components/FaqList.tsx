"use client";

import { useEffect, useState } from "react";
import type { FaqItem } from "@/lib/faq";

type FaqListProps = {
  initialItems: FaqItem[];
};

export default function FaqList({ initialItems }: FaqListProps) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    let cancelled = false;

    async function loadFaq() {
      try {
        const response = await fetch("/api/faq", { cache: "no-store" });
        const data = await response.json();

        if (!cancelled && response.ok && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch {
        // Keep server-rendered fallback items.
      }
    }

    void loadFaq();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mt-10 grid gap-4 text-left">
      {items.map((item) => (
        <details key={item.question} className="faq-card group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-poets text-lg text-[#ffe6ad] sm:text-xl">
            <span>{item.question}</span>
            <span className="faq-toggle" aria-hidden="true" />
          </summary>
          <p className="mt-4 font-poets text-[0.95rem] leading-7 text-[#f9e9c8] sm:text-lg">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

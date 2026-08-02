"use client";

import { FormEvent, useState } from "react";
import type { FaqItem } from "@/lib/faq";

export default function AdminFaqEditor() {
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<FaqItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function updateItem(index: number, field: keyof FaqItem, value: string) {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  }

  function addItem() {
    setItems((currentItems) => [
      ...currentItems,
      { question: "New question", answer: "New answer" },
    ]);
  }

  function removeItem(index: number) {
    setItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems((currentItems) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= currentItems.length) {
        return currentItems;
      }

      const nextItems = [...currentItems];
      [nextItems[index], nextItems[nextIndex]] = [
        nextItems[nextIndex],
        nextItems[index],
      ];

      return nextItems;
    });
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load FAQ.");
      }

      setItems(data.items);
      setIsAuthenticated(true);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not load FAQ.");
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch("/api/admin/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save FAQ.");
      }

      setItems(data.items);
      setStatus("success");
      setMessage("FAQ saved.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not save FAQ.");
    }
  }

  if (!isAuthenticated) {
    return (
      <form onSubmit={handleLogin} className="mx-auto mt-10 max-w-xl text-left">
        <div className="game-info-card">
          <label className="block font-poets text-lg text-[#ffe6ad]" htmlFor="admin-password">
            Admin Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            className="mt-3 w-full rounded-lg border-2 border-[#9a6d2e] bg-[#061008]/92 px-4 py-4 font-poets text-lg text-[#f7e8c4] shadow-[inset_0_0_20px_rgba(0,0,0,0.38)] outline-none transition-colors placeholder:text-[#d9c987]/50 focus:border-[#f0b33e]"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-7 w-full rounded-lg border-2 border-[#d3972e] bg-[linear-gradient(180deg,#f5ac21,#a75a08)] px-5 py-4 font-anton text-3xl uppercase leading-none text-[#fff7df] shadow-[inset_0_2px_0_rgba(255,234,161,0.35),0_16px_34px_rgba(0,0,0,0.48)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {status === "loading" ? "Loading..." : "Login"}
          </button>
          {message ? (
            <p className="mt-4 text-center font-poets text-sm leading-6 text-[#ffb28e]">
              {message}
            </p>
          ) : null}
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSave} className="mx-auto mt-10 max-w-4xl text-left">
      <div className="game-info-card">
        <p className="font-poets text-lg text-[#ffe6ad]">Logged in</p>
        <p className="mt-2 font-poets text-sm leading-6 text-[#d9c987]">
          FAQ questions are visible only after authentication on this page.
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        {items.map((item, index) => (
          <div key={index} className="faq-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-anton text-2xl leading-none text-[#f0b33e] drop-shadow-[0_3px_0_rgba(44,18,2,0.9)]">
                Item {index + 1}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="rounded-md border border-[#8f662d]/55 px-3 py-2 font-poets text-sm text-[#ffe6ad] transition-colors hover:border-[#f0b33e] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Up
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="rounded-md border border-[#8f662d]/55 px-3 py-2 font-poets text-sm text-[#ffe6ad] transition-colors hover:border-[#f0b33e] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Down
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="rounded-md border border-[#8f662d]/55 px-3 py-2 font-poets text-sm text-[#ffb28e] transition-colors hover:border-[#ffb28e]"
                >
                  Remove
                </button>
              </div>
            </div>

            <label className="mt-5 block font-poets text-sm text-[#d9c987]" htmlFor={`question-${index}`}>
              Question
            </label>
            <input
              id={`question-${index}`}
              type="text"
              value={item.question}
              onChange={(event) => updateItem(index, "question", event.target.value)}
              className="mt-2 w-full rounded-lg border border-[#9a6d2e]/80 bg-[#061008]/92 px-4 py-3 font-poets text-base text-[#f7e8c4] outline-none focus:border-[#f0b33e]"
              required
            />

            <label className="mt-5 block font-poets text-sm text-[#d9c987]" htmlFor={`answer-${index}`}>
              Answer
            </label>
            <textarea
              id={`answer-${index}`}
              value={item.answer}
              onChange={(event) => updateItem(index, "answer", event.target.value)}
              rows={4}
              className="mt-2 w-full resize-y rounded-lg border border-[#9a6d2e]/80 bg-[#061008]/92 px-4 py-3 font-poets text-base leading-7 text-[#f7e8c4] outline-none focus:border-[#f0b33e]"
              required
            />
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={addItem}
          className="rounded-lg border-2 border-[#9a6d2e] bg-[#061008]/88 px-5 py-4 font-anton text-2xl uppercase leading-none text-[#ffe6ad] transition-colors hover:border-[#f0b33e]"
        >
          Add Item
        </button>
        <button
          type="submit"
          disabled={status === "saving"}
          className="flex-1 rounded-lg border-2 border-[#d3972e] bg-[linear-gradient(180deg,#f5ac21,#a75a08)] px-5 py-4 font-anton text-3xl uppercase leading-none text-[#fff7df] shadow-[inset_0_2px_0_rgba(255,234,161,0.35),0_16px_34px_rgba(0,0,0,0.48)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "saving" ? "Saving..." : "Save FAQ"}
        </button>
      </div>

      {message ? (
        <p
          className={`mt-4 text-center font-poets text-sm leading-6 ${
            status === "success" ? "text-[#bfe68a]" : "text-[#ffb28e]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

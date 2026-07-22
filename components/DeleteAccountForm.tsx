"use client";

import { FormEvent, useState } from "react";

const SUPPORT_EMAIL = "labirnythgame@gmail.com";

export default function DeleteAccountForm() {
  const [playerId, setPlayerId] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not send the request.");
      }

      setStatus("success");
      setMessage("Your account deletion request has been sent.");
      setPlayerId("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not send the request. Please try again later."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl text-left">
      <label className="block font-poets text-lg text-[#ffe6ad]" htmlFor="player-id">
        Player ID
      </label>
      <input
        id="player-id"
        type="text"
        value={playerId}
        onChange={(event) => setPlayerId(event.target.value)}
        placeholder="Enter your player ID"
        className="mt-3 w-full rounded-lg border-2 border-[#9a6d2e] bg-[#061008]/92 px-4 py-4 font-poets text-lg text-[#f7e8c4] shadow-[inset_0_0_20px_rgba(0,0,0,0.38)] outline-none transition-colors placeholder:text-[#d9c987]/50 focus:border-[#f0b33e]"
        required
      />
      <p className="mt-3 font-poets text-sm leading-6 text-[#d9c987]">
        This will send an account deletion request to {SUPPORT_EMAIL}.
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-lg border-2 border-[#d3972e] bg-[linear-gradient(180deg,#f5ac21,#a75a08)] px-5 py-4 font-anton text-3xl uppercase leading-none text-[#fff7df] shadow-[inset_0_2px_0_rgba(255,234,161,0.35),0_16px_34px_rgba(0,0,0,0.48)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Sending..." : "Send Request"}
      </button>

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

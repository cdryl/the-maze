"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const TITLE_ID = process.env.NEXT_PUBLIC_PLAYFAB_TITLE_ID || "";
const VIEWER_ID = "viewer-account";

const STATS = {
  daily: "dailyStatName",
  weekly: "weeklyStatName",
  monthly: "monthlyStatName",
} as const;

const FALLBACK_LEADERBOARD: LeaderboardEntry[] = [
  {
    PlayFabId: "fallback-1",
    DisplayName: "AuspiciousPaw12",
    Position: 0,
    StatValue: 0,
  },
];

type Period = keyof typeof STATS;

type LeaderboardEntry = {
  PlayFabId: string;
  DisplayName?: string;
  AvatarUrl?: string;
  Profile?: {
    DisplayName?: string;
    AvatarUrl?: string;
    avatarurl?: string;
  };
  profile?: {
    displayName?: string;
    avatarurl?: string;
    avatarUrl?: string;
  };
  StatValue: number;
  Position: number;
};

export default function Leaderboard() {
  const [activePeriod, setActivePeriod] = useState<Period>("daily");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const resetLabel = useMemo(() => "17h 45m 58s", []);

  const loadLeaderboard = useCallback(async () => {
    if (!TITLE_ID) {
      setLeaderboard(FALLBACK_LEADERBOARD);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const loginRes = await fetch(
        `https://${TITLE_ID}.playfabapi.com/Client/LoginWithCustomID`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TitleId: TITLE_ID,
            CustomId: VIEWER_ID,
            CreateAccount: true,
          }),
        }
      );

      const loginData = await loginRes.json();
      const sessionTicket = loginData.data.SessionTicket;

      const lbRes = await fetch(
        `https://${TITLE_ID}.playfabapi.com/Client/GetLeaderboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": sessionTicket,
          },
          body: JSON.stringify({
            StatisticName: STATS[activePeriod],
            StartPosition: 0,
            MaxResultsCount: 10,
            ProfileConstraints: {
              ShowDisplayName: true,
              ShowAvatarUrl: true,
            },
          }),
        }
      );

      const lbData = await lbRes.json();
      setLeaderboard(lbData.data?.Leaderboard?.length ? lbData.data.Leaderboard : FALLBACK_LEADERBOARD);
    } catch (err) {
      console.error(err);
      setLeaderboard(FALLBACK_LEADERBOARD);
      setError("Showing sample leaderboard");
    } finally {
      setLoading(false);
    }
  }, [activePeriod]);

  useEffect(() => {
    void Promise.resolve().then(loadLeaderboard);
  }, [loadLeaderboard]);

  return (
    <section className="jungle-section relative isolate z-20 px-3 py-16 lg:py-24 text-white sm:px-6 lg:px-10">
      <Image
        src="/images/section-pattern.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-65"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_6%,rgba(222,142,36,0.18),transparent_30%),linear-gradient(180deg,rgba(2,8,4,0.72),rgba(2,7,4,0.54)_34%,rgba(2,5,3,0.84))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-[#030805] via-[#030805]/72 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#030805] via-[#030805]/58 to-transparent" />
      <div className="relative mx-auto max-w-[560px]">
        <header className="relative z-10 -mb-4 text-center">
          <div className="inline-flex items-center justify-center gap-1 sm:gap-2">
            <Image
              src="/images/liście_dwa.png"
              alt=""
              width={256}
              height={256}
              className="pointer-events-none h-9 w-9 -rotate-12 object-contain drop-shadow-[0_4px_0_rgba(0,0,0,0.78)] sm:h-11 sm:w-11"
            />
            <h2 className="font-marker text-4xl leading-none text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.9)] sm:text-5xl">
              Leaderboard
            </h2>
            <Image
              src="/images/liście_dwa.png"
              alt=""
              width={256}
              height={256}
              className="pointer-events-none h-9 w-9 rotate-12 scale-x-[-1] object-contain drop-shadow-[0_4px_0_rgba(0,0,0,0.78)] sm:h-11 sm:w-11"
            />
          </div>
          <p className="mt-4 font-marker text-lg text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.85)] sm:text-xl">
            Reset in: {resetLabel}
          </p>
        </header>

        <div className="leaderboard-panel relative min-h-[720px] overflow-hidden rounded-t-[14px] rounded-b-[18px] border-2 border-[#a85d36] bg-[#2a0f04]/88 pt-20 shadow-[0_20px_70px_rgba(0,0,0,0.65)]">
          <Image
            src="/images/hero.png"
            alt=""
            fill
            sizes="(min-width: 640px) 560px, 100vw"
            className="pointer-events-none object-cover object-center opacity-20 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(72,31,5,0.78),rgba(43,13,2,0.92)),radial-gradient(circle_at_50%_20%,rgba(210,139,35,0.22),transparent_34%)]" />

          <div className="relative z-10 px-4 pb-28 sm:px-5">
            {loading ? (
              <p className="font-marker text-center text-xl text-[#ffe6ad]">Loading leaderboard...</p>
            ) : (
              <ol className="space-y-3">
                {leaderboard.map((player) => (
                  <LeaderboardRow key={player.PlayFabId} player={player} />
                ))}
              </ol>
            )}

            {error ? (
              <p className="mt-5 text-center font-poets text-sm text-[#d99d58]">{error}</p>
            ) : null}
          </div>

          <nav className="absolute inset-x-0 bottom-0 z-20 grid h-[74px] grid-cols-3 border-t border-[#5b2b0e] bg-[#743207] font-marker text-lg text-white sm:text-xl">
            {(["daily", "weekly", "monthly"] as Period[]).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setActivePeriod(period)}
                className={`leaderboard-tab border-r border-[#3d1a07] last:border-r-0 ${
                  activePeriod === period ? "leaderboard-tab-active" : ""
                }`}
              >
                {period}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

function LeaderboardRow({ player }: { player: LeaderboardEntry }) {
  const name =
    player.DisplayName ||
    player.Profile?.DisplayName ||
    player.profile?.displayName ||
    "Unknown Player";
  const avatarUrl =
    player.AvatarUrl ||
    player.Profile?.AvatarUrl ||
    player.Profile?.avatarurl ||
    player.profile?.avatarurl ||
    player.profile?.avatarUrl;
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <li className="leaderboard-row relative flex min-h-[66px] items-center rounded-r-[18px] border border-[#c66b16] bg-[linear-gradient(180deg,#bd6b08,#965004)] pl-9 pr-4 shadow-[inset_0_2px_0_rgba(255,206,83,0.25),0_5px_12px_rgba(0,0,0,0.28)]">
      <span className="leaderboard-row-pointer" />
      <span className="w-8 shrink-0 text-center font-marker text-2xl text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.7)]">
        {player.Position + 1}
      </span>

      <span className="mx-4 flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full border-[5px] border-[#f1d7cf] bg-[#6b2a17] shadow-[0_5px_10px_rgba(0,0,0,0.42)]">
        {avatarUrl ? (
          <span
            aria-label=""
            className="h-full w-full rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${avatarUrl})` }}
          />
        ) : (
          <span className="leaderboard-avatar flex h-full w-full items-center justify-center rounded-full font-marker text-xl text-white">
            {initials}
          </span>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-marker text-lg text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.55)] sm:text-xl">
          {name}
        </p>
        <div className="mt-1 flex items-center gap-2 font-poets text-sm text-[#f4e36d]">
          <Image
            src="/images/points.png"
            alt=""
            width={22}
            height={22}
            className="h-5 w-5 object-contain drop-shadow-[0_2px_0_rgba(0,0,0,0.55)]"
          />
          <span>{player.StatValue.toLocaleString()}</span>
        </div>
      </div>
    </li>
  );
}

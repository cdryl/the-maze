"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  const sessionTicketRef = useRef("");
  const loginRequestRef = useRef<Promise<string> | null>(null);
  const leaderboardCacheRef = useRef<Partial<Record<Period, LeaderboardEntry[]>>>({});
  const leaderboardRequestsRef = useRef<Partial<Record<Period, Promise<LeaderboardEntry[]>>>>({});
  const activeRequestIdRef = useRef(0);

  const resetLabel = useMemo(() => "17h 45m 58s", []);

  const getSessionTicket = useCallback(async () => {
    if (sessionTicketRef.current) {
      return sessionTicketRef.current;
    }

    if (loginRequestRef.current) {
      return loginRequestRef.current;
    }

    loginRequestRef.current = (async () => {
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

      if (!loginRes.ok || !loginData.data?.SessionTicket) {
        throw new Error(loginData.errorMessage || "PlayFab login failed");
      }

      sessionTicketRef.current = loginData.data.SessionTicket;
      return sessionTicketRef.current;
    })().finally(() => {
      loginRequestRef.current = null;
    });

    return loginRequestRef.current;
  }, []);

  const fetchLeaderboard = useCallback(
    async (period: Period) => {
      const cachedLeaderboard = leaderboardCacheRef.current[period];
      if (cachedLeaderboard) {
        return cachedLeaderboard;
      }

      const currentRequest = leaderboardRequestsRef.current[period];
      if (currentRequest) {
        return currentRequest;
      }

      const request = (async () => {
        const sessionTicket = await getSessionTicket();

        const lbRes = await fetch(
          `https://${TITLE_ID}.playfabapi.com/Client/GetLeaderboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Authorization": sessionTicket,
            },
            body: JSON.stringify({
              StatisticName: STATS[period],
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

        if (!lbRes.ok) {
          throw new Error(lbData.errorMessage || "PlayFab leaderboard failed");
        }

        const nextLeaderboard = lbData.data?.Leaderboard?.length
          ? lbData.data.Leaderboard
          : FALLBACK_LEADERBOARD;

        leaderboardCacheRef.current[period] = nextLeaderboard;
        return nextLeaderboard;
      })().finally(() => {
        delete leaderboardRequestsRef.current[period];
      });

      leaderboardRequestsRef.current[period] = request;
      return request;
    },
    [getSessionTicket]
  );

  const loadLeaderboard = useCallback(async () => {
    if (!TITLE_ID) {
      setLeaderboard(FALLBACK_LEADERBOARD);
      setLoading(false);
      return;
    }

    const requestId = activeRequestIdRef.current + 1;
    activeRequestIdRef.current = requestId;
    const period = activePeriod;
    const cachedLeaderboard = leaderboardCacheRef.current[period];

    try {
      setLoading(!cachedLeaderboard);
      setError("");

      const nextLeaderboard = await fetchLeaderboard(period);

      if (activeRequestIdRef.current === requestId) {
        setLeaderboard(nextLeaderboard);
      }
    } catch (err) {
      console.error(err);
      if (activeRequestIdRef.current === requestId) {
        setLeaderboard(FALLBACK_LEADERBOARD);
        setError("Showing sample leaderboard");
      }
    } finally {
      if (activeRequestIdRef.current === requestId) {
        setLoading(false);
      }
    }
  }, [activePeriod, fetchLeaderboard]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadLeaderboard();
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [loadLeaderboard]);

  return (
    <section
      id="leaderboard"
      className="jungle-section relative isolate z-20 scroll-mt-20 px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24"
    >
      <Image
        src="/images/section-pattern.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-65"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_6%,rgba(222,142,36,0.18),transparent_30%),linear-gradient(180deg,rgba(2,8,4,0.72),rgba(2,7,4,0.54)_34%,rgba(2,5,3,0.84))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#030805] via-[#030805]/56 to-transparent sm:h-44 sm:via-[#030805]/72" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#030805] via-[#030805]/46 to-transparent sm:h-40 sm:via-[#030805]/58" />
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

        <div className="leaderboard-panel relative min-h-[640px] overflow-hidden rounded-t-[14px] rounded-b-[18px] border-2 border-[#a85d36] bg-[#2a0f04]/88 pt-18 shadow-[0_20px_70px_rgba(0,0,0,0.65)] sm:min-h-[720px] sm:pt-20">
          <Image
            src="/images/hero.png"
            alt=""
            fill
            sizes="(min-width: 640px) 560px, 100vw"
            className="pointer-events-none object-cover object-center opacity-20 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(72,31,5,0.78),rgba(43,13,2,0.92)),radial-gradient(circle_at_50%_20%,rgba(210,139,35,0.22),transparent_34%)]" />

          <div className="relative z-10 px-3 pb-24 sm:px-5 sm:pb-28">
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

          <nav className="absolute inset-x-0 bottom-0 z-20 grid h-16 grid-cols-3 border-t border-[#5b2b0e] bg-[#743207] font-marker text-base text-white sm:h-[74px] sm:text-xl">
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
    <li className="leaderboard-row relative flex min-h-[60px] items-center rounded-r-[16px] border border-[#c66b16] bg-[linear-gradient(180deg,#bd6b08,#965004)] pl-7 pr-3 shadow-[inset_0_2px_0_rgba(255,206,83,0.25),0_5px_12px_rgba(0,0,0,0.28)] sm:min-h-[66px] sm:rounded-r-[18px] sm:pl-9 sm:pr-4">
      <span className="leaderboard-row-pointer" />
      <span className="w-6 shrink-0 text-center font-marker text-xl text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.7)] sm:w-8 sm:text-2xl">
        {player.Position + 1}
      </span>

      <span className="mx-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#f1d7cf] bg-[#6b2a17] shadow-[0_5px_10px_rgba(0,0,0,0.42)] sm:mx-4 sm:h-[70px] sm:w-[70px] sm:border-[5px]">
        {avatarUrl ? (
          <span
            aria-label=""
            className="h-full w-full rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${avatarUrl})` }}
          />
        ) : (
          <span className="leaderboard-avatar flex h-full w-full items-center justify-center rounded-full font-marker text-base text-white sm:text-xl">
            {initials}
          </span>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-marker text-base text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.55)] sm:text-xl">
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

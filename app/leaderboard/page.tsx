"use client";

import { useMemo, useState } from "react";
import { Flame, Trophy } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/GlassCard";
import { LeaderboardList } from "@/components/LeaderboardList";
import { UserAvatar } from "@/components/UserAvatar";
import { mockLeaderboard, mockUser } from "@/lib/mockData";

const scopes = ["Друзья", "Город", "Глобально"] as const;

export default function LeaderboardPage() {
  const [scope, setScope] = useState<(typeof scopes)[number]>("Друзья");
  const leaders = useMemo(() => mockLeaderboard.slice(0, 3), []);
  const rest = useMemo(() => mockLeaderboard.slice(3), []);

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Рейтинг" title="Кто закрывает день" user={mockUser} />

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {scopes.map((item) => (
            <button
              className={[
                "pressable rounded-full px-4 py-2 text-sm font-black transition",
                scope === item
                  ? "bg-[linear-gradient(180deg,#ffffff,#e8fff8)] text-[#071017] shadow-[0_12px_34px_rgba(73,245,209,0.18)]"
                  : "border border-white/10 bg-white/[0.07] text-white/58 hover:text-white",
              ].join(" ")}
              key={item}
              onClick={() => setScope(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-3">
          {leaders.map((entry) => (
            <GlassCard
              className={[
                "pressable p-5 text-center",
                entry.userId === mockUser.id ? "border-lime-200/50 bg-lime-300/[0.08] shadow-[0_28px_86px_rgba(200,255,92,0.08)]" : "",
              ].join(" ")}
              key={entry.userId}
            >
              <div className="relative z-10">
                <Trophy className="reward-aura mx-auto mb-3 h-7 w-7 text-amber-200" />
                <UserAvatar name={entry.name} size="md" />
                <p className="mt-4 text-sm font-bold text-white/50">#{entry.rank}</p>
                <h2 className="text-2xl font-black text-white">{entry.name}</h2>
                <p className="mt-2 text-lg font-black text-gradient">
                  {entry.xp.toLocaleString("ru-RU")} XP
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-orange-200">
                  <Flame className="h-4 w-4" />
                  {entry.streak} дней
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        <LeaderboardList currentUserId={mockUser.id} entries={rest} />
      </div>
      <BottomNav />
    </main>
  );
}

import { Flame, Trophy } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { UserAvatar } from "@/components/UserAvatar";
import type { LeaderboardEntry } from "@/lib/types";

type LeaderboardListProps = {
  entries: LeaderboardEntry[];
  currentUserId: string;
};

export function LeaderboardList({ entries, currentUserId }: LeaderboardListProps) {
  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const active = entry.userId === currentUserId;

        return (
          <GlassCard
            className={[
              "p-4",
              active ? "border-lime-200/50 bg-lime-300/[0.09]" : "",
            ].join(" ")}
            key={entry.userId}
          >
            <div className="relative z-10 flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/[0.07] text-sm font-black text-white">
                #{entry.rank}
              </div>
              <UserAvatar name={entry.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-black text-white">{entry.name}</p>
                <p className="text-sm text-white/52">LVL {entry.level}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-white">{entry.xp.toLocaleString("ru-RU")} XP</p>
                <p className="inline-flex items-center gap-1 text-sm font-bold text-orange-200">
                  <Flame className="h-4 w-4" />
                  {entry.streak}
                </p>
              </div>
              {entry.rank <= 3 ? <Trophy className="h-5 w-5 text-amber-200" /> : null}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}

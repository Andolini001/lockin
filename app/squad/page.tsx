import { Copy, Flame } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/GlassCard";
import { InviteFriendButton } from "@/components/InviteFriendButton";
import { UserAvatar } from "@/components/UserAvatar";
import { mockSquad, mockSquadMembers, mockUser } from "@/lib/mockData";
import { getSquadDailyProgress } from "@/lib/squadProgress";

export default function SquadPage() {
  const squadProgress = getSquadDailyProgress(mockSquad, mockSquadMembers);

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Команда" title={mockSquad.name} user={mockUser} />

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="p-6">
            <div className="relative z-10">
              <p className="text-sm font-bold text-cyan-100">Если вся команда закроет день</p>
              <h2 className="mt-2 text-4xl font-black leading-tight text-white">
                вы получите x2 XP.
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="premium-stat rounded-[26px] p-4">
                  <p className="text-xs text-white/45">XP за неделю</p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {mockSquad.weeklyXp.toLocaleString("ru-RU")}
                  </p>
                </div>
                <div className="premium-stat rounded-[26px] p-4">
                  <p className="text-xs text-white/45">Серия squad</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-2xl font-black text-white">
                    <Flame className="h-5 w-5 text-orange-300" />
                    {mockSquad.streak}
                  </p>
                </div>
                <div className="premium-stat rounded-[26px] p-4">
                  <p className="text-xs text-white/45">Сегодня</p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {squadProgress.completed}/{squadProgress.total}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.06] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-white">
                      {squadProgress.isComplete
                        ? `x${squadProgress.bonusMultiplier} XP уже активен`
                        : `Ещё ${squadProgress.remaining} участника до x${squadProgress.bonusMultiplier} XP`}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/50">
                      Сегодня уже {squadProgress.completed}/{squadProgress.total} участников закрыли день.
                    </p>
                  </div>
                  <span className="premium-badge shrink-0">{squadProgress.percent}%</span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#49f5d1,#c8ff5c,#ffe485)] shadow-[0_0_22px_rgba(200,255,92,0.28)]"
                    style={{ width: `${squadProgress.percent}%` }}
                  />
                </div>
              </div>

              <div className="premium-stat mt-6 rounded-[28px] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Код squad</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-2xl font-black text-white">{mockSquad.inviteCode}</p>
                  <Copy className="h-5 w-5 text-cyan-100" />
                </div>
              </div>

              <InviteFriendButton className="mt-6 w-full" inviteCode={mockSquad.inviteCode} />
            </div>
          </GlassCard>

          <div className="space-y-3">
            {mockSquadMembers.map((member) => (
              <GlassCard className="pressable p-4" key={member.userId}>
                <div className="relative z-10 flex items-center gap-4">
                  <UserAvatar name={member.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-black text-white">{member.name}</p>
                    <p className="text-sm text-white/48">@{member.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">{member.xp.toLocaleString("ru-RU")} XP</p>
                    <p
                      className={[
                        "text-xs font-bold",
                        member.completedToday ? "text-lime-200" : "text-white/42",
                      ].join(" ")}
                    >
                      {member.completedToday ? "закрыл сегодня" : "ещё в игре"}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

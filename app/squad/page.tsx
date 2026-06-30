import { Copy, Flame, UserPlus } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/GlassCard";
import { LiquidButton } from "@/components/LiquidButton";
import { UserAvatar } from "@/components/UserAvatar";
import { mockSquad, mockSquadMembers, mockUser } from "@/lib/mockData";

export default function SquadPage() {
  const completedToday = mockSquadMembers.filter((member) => member.completedToday).length;

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
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-[26px] bg-white/[0.06] p-4">
                  <p className="text-xs text-white/45">Weekly XP</p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {mockSquad.weeklyXp.toLocaleString("ru-RU")}
                  </p>
                </div>
                <div className="rounded-[26px] bg-white/[0.06] p-4">
                  <p className="text-xs text-white/45">Squad streak</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-2xl font-black text-white">
                    <Flame className="h-5 w-5 text-orange-300" />
                    {mockSquad.streak}
                  </p>
                </div>
                <div className="rounded-[26px] bg-white/[0.06] p-4">
                  <p className="text-xs text-white/45">Сегодня</p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {completedToday}/{mockSquad.members}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Invite code</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-2xl font-black text-white">{mockSquad.inviteCode}</p>
                  <Copy className="h-5 w-5 text-cyan-100" />
                </div>
              </div>

              <LiquidButton className="mt-6 w-full" icon={<UserPlus className="h-5 w-5" />}>
                Пригласить друга
              </LiquidButton>
            </div>
          </GlassCard>

          <div className="space-y-3">
            {mockSquadMembers.map((member) => (
              <GlassCard className="p-4" key={member.userId}>
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

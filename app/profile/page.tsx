import { Share2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/GlassCard";
import { LiquidButton } from "@/components/LiquidButton";
import { ProgressRing } from "@/components/ProgressRing";
import { UserAvatar } from "@/components/UserAvatar";
import { XPBadge } from "@/components/XPBadge";
import { mockBadges, mockLeaderboard, mockUser } from "@/lib/mockData";
import { levelProgressPercent } from "@/lib/xp";

export default function ProfilePage() {
  const userRank = mockLeaderboard.find((entry) => entry.userId === mockUser.id)?.rank ?? 2;

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Профиль" title="Твой LOCKIN" user={mockUser} />

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <GlassCard className="p-6 text-center">
            <div className="relative z-10">
              <div className="flex justify-center">
                <UserAvatar name={mockUser.name} size="lg" />
              </div>
              <h2 className="mt-5 text-4xl font-black text-white">{mockUser.name}</h2>
              <p className="mt-1 text-white/52">@{mockUser.username}</p>
              <div className="mt-5 flex justify-center">
                <XPBadge xp={mockUser.xp} />
              </div>
              <div className="mt-6 flex justify-center">
                <ProgressRing
                  caption={`${levelProgressPercent(mockUser.xp)}%`}
                  label={`LVL ${mockUser.level}`}
                  size={120}
                  value={levelProgressPercent(mockUser.xp)}
                />
              </div>
              <LiquidButton className="mt-6 w-full" href="/share" icon={<Share2 className="h-5 w-5" />}>
                Поделиться профилем
              </LiquidButton>
            </div>
          </GlassCard>

          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                [`${mockUser.streak}`, "дней подряд"],
                [`${mockUser.completedQuests}`, "всего квестов"],
                ["8", "лучший streak"],
                [`#${userRank}`, "место в рейтинге"],
              ].map(([value, label]) => (
                <GlassCard className="pressable p-4" key={label}>
                  <div className="relative z-10">
                    <p className="text-3xl font-black text-white">{value}</p>
                    <p className="mt-1 text-sm text-white/48">{label}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-5">
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white">Бейджи</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {mockBadges.map((badge) => (
                    <div className="pressable premium-stat rounded-[24px] p-4" key={badge.id}>
                      <p className="font-black text-white">{badge.title}</p>
                      <p className="mt-1 text-sm text-white/48">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

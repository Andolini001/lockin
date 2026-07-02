import { ArrowRight, Camera, Clock3, Flame, ShieldCheck } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/GlassCard";
import { LiquidButton } from "@/components/LiquidButton";
import { ProgressRing } from "@/components/ProgressRing";
import { SquadCard } from "@/components/SquadCard";
import { SquadProgressCard } from "@/components/SquadProgressCard";
import { StreakBar } from "@/components/StreakBar";
import { XPBadge } from "@/components/XPBadge";
import {
  categoryLabels,
  mockDailyQuest,
  mockSquad,
  mockSquadMembers,
  mockUser,
} from "@/lib/mockData";
import { getSquadDailyProgress } from "@/lib/squadProgress";
import { calculateQuestReward, levelProgressPercent, xpToNextLevel } from "@/lib/xp";

export default function DashboardPage() {
  const squadProgress = getSquadDailyProgress(mockSquad, mockSquadMembers);
  const reward = calculateQuestReward(mockDailyQuest, mockUser.streak);

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Привет, Игорь" title="Готов закрыть день?" user={mockUser} />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <GlassCard className="overflow-hidden p-6">
            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-200">
                    Квест дня
                  </p>
                  <h2 className="mt-3 max-w-2xl text-4xl font-black leading-[1.02] text-white sm:text-6xl">
                    {mockDailyQuest.title}
                  </h2>
                </div>
                <div className="hidden rounded-[28px] border border-white/10 bg-cyan-200/[0.08] p-5 text-cyan-100 sm:block">
                  <ShieldCheck className="h-10 w-10" />
                </div>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
                {mockDailyQuest.description}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <LiquidButton href="/proof" icon={<ArrowRight className="h-5 w-5" />}>
                  Начать квест
                </LiquidButton>
                <LiquidButton href="/quests" icon={<Camera className="h-5 w-5" />} variant="secondary">
                  Выбрать другой
                </LiquidButton>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="premium-stat rounded-[22px] p-3 sm:rounded-[26px] sm:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/44 sm:text-xs sm:tracking-[0.18em]">
                    Награда
                  </p>
                  <p className="mt-2 text-lg font-black text-lime-200 sm:text-2xl">+{reward}</p>
                </div>
                <div className="premium-stat rounded-[22px] p-3 sm:rounded-[26px] sm:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/44 sm:text-xs sm:tracking-[0.18em]">
                    Время
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-lg font-black text-white sm:gap-2 sm:text-2xl">
                    <Clock3 className="h-5 w-5 text-cyan-200" />
                    {mockDailyQuest.durationMinutes}
                  </p>
                </div>
                <div className="premium-stat rounded-[22px] p-3 sm:rounded-[26px] sm:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/44 sm:text-xs sm:tracking-[0.18em]">
                    Категория
                  </p>
                  <p className="mt-2 text-lg font-black text-white sm:text-2xl">
                    {categoryLabels[mockDailyQuest.category]}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-5 pt-40 lg:pt-0">
            <GlassCard className="p-5">
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Твоя серия</p>
                    <h2 className="text-3xl font-black text-white">{mockUser.streak} дней</h2>
                  </div>
                  <Flame className="h-8 w-8 text-orange-300" />
                </div>
                <StreakBar streak={mockUser.streak} />
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="relative z-10 flex items-center gap-5">
                <ProgressRing
                  caption={`${levelProgressPercent(mockUser.xp)}%`}
                  label={`LVL ${mockUser.level}`}
                  value={levelProgressPercent(mockUser.xp)}
                />
                <div>
                  <XPBadge xp={mockUser.xp} />
                  <p className="mt-4 text-lg font-black text-white">
                    {xpToNextLevel(mockUser.xp)} XP до следующего уровня
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    Закрой день и ускорь прогресс серии.
                  </p>
                </div>
              </div>
            </GlassCard>

            <SquadProgressCard progress={squadProgress} squad={mockSquad} />
          </div>
        </div>

        <div className="mt-24 grid gap-5 lg:mt-28 lg:grid-cols-[0.9fr_1.1fr]">
          <SquadCard progress={squadProgress} squad={mockSquad} />
          <GlassCard className="p-6">
            <div className="relative z-10 flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-cyan-100">Поделись победой</p>
                <h2 className="mt-2 max-w-lg text-3xl font-black leading-tight text-white">
                  Закрой день и получи красивую карточку для сторис
                </h2>
              </div>
              <LiquidButton href="/share" variant="secondary">
                Открыть карточку
              </LiquidButton>
            </div>
          </GlassCard>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

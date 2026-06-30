import {
  ArrowRight,
  Camera,
  Flame,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { LiquidButton } from "@/components/LiquidButton";
import { ProgressRing } from "@/components/ProgressRing";
import { StreakBar } from "@/components/StreakBar";
import { XPBadge } from "@/components/XPBadge";
import { mockDailyQuest, mockSquad, mockUser } from "@/lib/mockData";
import { xpToNextLevel } from "@/lib/xp";

const heroStats: Array<[string, string, LucideIcon]> = [
  ["120 XP", "за квест дня", Trophy],
  [`${mockUser.streak} дней`, "текущая серия", Flame],
  [`${mockSquad.members}/5`, "в команде", Users],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden px-5 pb-10 pt-6 text-[var(--text-main)] sm:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_18px_60px_rgba(34,211,238,0.12)] backdrop-blur-2xl">
            <Sparkles className="h-4 w-4 text-lime-300" />
            LOCKIN MVP
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Закрой день.
              <span className="block text-gradient">Забери XP.</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[var(--text-muted)]">
              Ежедневные реальные квесты, proof-доказательства, streak, уровни и
              команда, которая тянет тебя вперёд.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <LiquidButton href="/dashboard" icon={<ArrowRight className="h-5 w-5" />}>
              Открыть MVP
            </LiquidButton>
            <LiquidButton href="/share" icon={<Camera className="h-5 w-5" />} variant="secondary">
              Посмотреть сторис
            </LiquidButton>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroStats.map(([value, label, Icon]) => (
              <GlassCard className="p-4" key={label}>
                <div className="relative z-10">
                  <Icon className="mb-3 h-5 w-5 text-lime-300" />
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-sm text-[var(--text-muted)]">{label}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-[430px]">
          <div className="absolute inset-x-12 top-8 h-32 rounded-[48px] bg-cyan-400/20 blur-3xl" />
          <GlassCard className="relative overflow-hidden p-5 shadow-[0_50px_140px_rgba(0,0,0,0.55)]">
            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-100">Привет, Игорь</p>
                  <h2 className="text-3xl font-black text-white">Готов закрыть день?</h2>
                </div>
                <XPBadge xp={mockUser.xp} />
              </div>

              <GlassCard className="border-cyan-200/20 bg-cyan-300/[0.08] p-5">
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-lime-200">
                      Квест дня
                    </span>
                    <ShieldCheck className="h-6 w-6 text-cyan-200" />
                  </div>
                  <h3 className="text-3xl font-black leading-tight text-white">
                    {mockDailyQuest.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                    {mockDailyQuest.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="mini-pill">+{mockDailyQuest.xpReward} XP</span>
                    <span className="mini-pill">{mockDailyQuest.durationMinutes} мин</span>
                    <span className="mini-pill">Фокус</span>
                  </div>
                </div>
              </GlassCard>

              <div className="mt-4 grid grid-cols-[1fr_auto] gap-4">
                <GlassCard className="p-4">
                  <div className="relative z-10">
                    <p className="text-sm text-[var(--text-muted)]">Твоя серия</p>
                    <p className="mb-4 text-2xl font-black text-white">{mockUser.streak} дней</p>
                    <StreakBar streak={mockUser.streak} />
                  </div>
                </GlassCard>
                <GlassCard className="flex min-w-32 flex-col items-center justify-center p-4">
                  <div className="relative z-10 flex flex-col items-center">
                    <ProgressRing value={68} label={`LVL ${mockUser.level}`} />
                    <span className="mt-3 text-center text-xs text-[var(--text-muted)]">
                      {xpToNextLevel(mockUser.xp)} XP до апа
                    </span>
                  </div>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}

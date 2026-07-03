"use client";

import { CheckCircle2, FileCheck2, Play } from "lucide-react";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/GlassCard";
import { QuestCard } from "@/components/QuestCard";
import { categoryLabels, mockUser } from "@/lib/mockData";
import { getQuestsByCategory } from "@/lib/questEngine";
import type { QuestCategory, QuestDifficulty } from "@/lib/types";

const categoryFilters: Array<{ value: QuestCategory | "all"; label: string }> = [
  { value: "all", label: "Все" },
  { value: "body", label: categoryLabels.body },
  { value: "focus", label: categoryLabels.focus },
  { value: "social", label: categoryLabels.social },
  { value: "order", label: categoryLabels.order },
  { value: "work", label: categoryLabels.work },
  { value: "mind", label: categoryLabels.mind },
];

const difficultyFilters: Array<{ value: QuestDifficulty | "all"; label: string }> = [
  { value: "all", label: "Любая" },
  { value: "easy", label: "Лёгкий" },
  { value: "medium", label: "Средний" },
  { value: "hard", label: "Жёсткий" },
];

export default function QuestsPage() {
  const [category, setCategory] = useState<QuestCategory | "all">("all");
  const [difficulty, setDifficulty] = useState<QuestDifficulty | "all">("all");

  const quests = useMemo(() => {
    return getQuestsByCategory(category).filter((quest) =>
      difficulty === "all" ? true : quest.difficulty === difficulty,
    );
  }, [category, difficulty]);

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Забери XP" title="Квесты на сегодня" user={mockUser} />

        <GlassCard className="mb-4 p-3 sm:p-4">
          <div className="relative z-10">
            <p className="text-sm font-black text-cyan-100">Выбери один квест</p>
            <h2 className="mt-1 text-base font-black leading-snug text-white sm:text-2xl">
              Нажми “Взять квест”, сделай действие и отправь короткий proof.
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { Icon: Play, label: "Принять" },
                { Icon: CheckCircle2, label: "Сделать" },
                { Icon: FileCheck2, label: "Proof" },
              ].map(({ Icon, label }) => (
                <div className="premium-stat rounded-2xl p-2 text-center sm:p-3" key={label}>
                  <Icon className="mx-auto h-4 w-4 text-lime-100" />
                  <p className="mt-2 text-xs font-black text-white/78">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="mb-5 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryFilters.map((filter) => (
              <button
                className={[
                  "pressable shrink-0 rounded-full px-4 py-2 text-sm font-black transition",
                  category === filter.value
                    ? "bg-[linear-gradient(180deg,#ffffff,#e8fff8)] text-[#071017] shadow-[0_12px_34px_rgba(73,245,209,0.18)]"
                    : "border border-white/10 bg-white/[0.07] text-white/62 hover:text-white",
                ].join(" ")}
                key={filter.value}
                onClick={() => setCategory(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {difficultyFilters.map((filter) => (
              <button
                className={[
                  "pressable shrink-0 rounded-full px-4 py-2 text-sm font-black transition",
                  difficulty === filter.value
                    ? "bg-[linear-gradient(135deg,#d9ff6a,#49f5d1)] text-[#071017] shadow-[0_12px_34px_rgba(200,255,92,0.18)]"
                    : "border border-white/10 bg-white/[0.06] text-white/55 hover:text-white",
                ].join(" ")}
                key={filter.value}
                onClick={() => setDifficulty(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quests.map((quest) => (
            <QuestCard compact key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

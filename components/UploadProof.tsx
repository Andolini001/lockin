"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Flame,
  Play,
  UploadCloud,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { LiquidButton } from "@/components/LiquidButton";
import type { Quest } from "@/lib/types";

type UploadProofProps = {
  quest: Quest;
};

type FlowStage = "accepted" | "doing" | "proof" | "submitted";

const proofCopy: Record<
  Quest["proofType"],
  {
    examples: string[];
    helper: string;
    title: string;
  }
> = {
  photo: {
    title: "Загрузи фото результата",
    helper: "Подойдёт быстрый снимок: стол после уборки, прогулка, готовый результат.",
    examples: ["Фото результата готово", "Сделал и зафиксировал", "Есть видимый результат"],
  },
  video: {
    title: "Добавь короткое видео",
    helper: "Можно загрузить короткий proof или оставить честный комментарий для MVP.",
    examples: ["Сделал подход полностью", "Записал короткий proof", "Завершил без пауз"],
  },
  text: {
    title: "Опиши, что сделал",
    helper: "Одного честного предложения достаточно, чтобы закрыть MVP-proof.",
    examples: ["Сделал полностью", "Закрыл задачу без отвлечений", "Результат готов"],
  },
  timer: {
    title: "Подтверди фокус-сессию",
    helper: "Для MVP достаточно комментария. Позже здесь будет настоящий таймер и автопроверка.",
    examples: ["30 минут без телефона", "Фокус-режим включён", "Не отвлекался до конца"],
  },
};

const flowOrder: FlowStage[] = ["accepted", "doing", "proof", "submitted"];

function formatElapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function stepState(stage: FlowStage, step: FlowStage) {
  const currentIndex = flowOrder.indexOf(stage);
  const stepIndex = flowOrder.indexOf(step);

  if (currentIndex > stepIndex) return "done";
  if (currentIndex === stepIndex) return "active";
  return "next";
}

function FlowSteps({ stage }: { stage: FlowStage }) {
  const steps: Array<{ id: FlowStage; label: string }> = [
    { id: "accepted", label: "Принят" },
    { id: "doing", label: "Делаешь" },
    { id: "proof", label: "Proof" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {steps.map((step) => {
        const state = stepState(stage, step.id);

        return (
          <div
            className={[
              "rounded-2xl border px-3 py-3 text-center text-xs font-black transition",
              state === "done" ? "border-lime-200/30 bg-lime-300/12 text-lime-100" : "",
              state === "active"
                ? "border-cyan-100/40 bg-cyan-200/12 text-white shadow-[0_0_28px_rgba(73,245,209,0.12)]"
                : "",
              state === "next" ? "border-white/10 bg-white/[0.045] text-white/42" : "",
            ].join(" ")}
            key={step.id}
          >
            {state === "done" ? "✓ " : ""}
            {step.label}
          </div>
        );
      })}
    </div>
  );
}

export function UploadProof({ quest }: UploadProofProps) {
  const [stage, setStage] = useState<FlowStage>("accepted");
  const [fileName, setFileName] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const proof = proofCopy[quest.proofType];

  const evidenceReady = useMemo(() => Boolean(fileName || comment.trim().length > 0), [comment, fileName]);

  useEffect(() => {
    localStorage.setItem(
      "lockin:active-quest",
      JSON.stringify({
        acceptedAt: new Date().toISOString(),
        questId: quest.id,
        status: "accepted",
        title: quest.title,
        xpReward: quest.xpReward,
      }),
    );
  }, [quest.id, quest.title, quest.xpReward]);

  useEffect(() => {
    if (stage !== "doing" || !startedAt) return;

    const interval = window.setInterval(() => {
      setElapsed(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [stage, startedAt]);

  function startQuest() {
    const nextStartedAt = Date.now();
    setStartedAt(nextStartedAt);
    setStage("doing");
    localStorage.setItem(
      "lockin:active-quest",
      JSON.stringify({
        acceptedAt: new Date().toISOString(),
        questId: quest.id,
        startedAt: new Date(nextStartedAt).toISOString(),
        status: "doing",
        title: quest.title,
        xpReward: quest.xpReward,
      }),
    );
  }

  function moveToProof() {
    setStage("proof");
    localStorage.setItem(
      "lockin:active-quest",
      JSON.stringify({
        questId: quest.id,
        status: "proof",
        title: quest.title,
        xpReward: quest.xpReward,
      }),
    );
  }

  function submitProof() {
    if (!evidenceReady) return;

    const payload = {
      comment,
      createdAt: new Date().toISOString(),
      fileName,
      questId: quest.id,
      status: "submitted",
    };

    localStorage.setItem("lockin:last-proof", JSON.stringify(payload));
    localStorage.setItem("lockin:active-quest", JSON.stringify({ ...payload, title: quest.title }));
    setStage("submitted");
  }

  if (stage === "submitted") {
    return (
      <GlassCard className="p-6 text-center">
        <div className="relative z-10">
          <CheckCircle2 className="reward-aura mx-auto h-16 w-16 text-lime-300" />
          <p className="premium-badge mx-auto mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black text-lime-100">
            +{quest.xpReward} XP
          </p>
          <h2 className="mt-5 text-3xl font-black text-white">День закрыт.</h2>
          <p className="mt-3 text-[var(--text-muted)]">
            Proof сохранён локально. Теперь можно забрать социальный момент: поделиться карточкой и подтянуть squad.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <LiquidButton className="w-full" href="/share">
              Поделиться победой
            </LiquidButton>
            <LiquidButton className="w-full" href="/squad" variant="secondary">
              Открыть squad
            </LiquidButton>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <div className="relative z-10 space-y-5">
        <FlowSteps stage={stage} />

        {stage === "accepted" ? (
          <div className="space-y-5">
            <div>
              <p className="premium-badge inline-flex rounded-full px-4 py-2 text-sm font-black text-lime-100">
                Квест принят
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white">{quest.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                Теперь сделай действие в реальности. {quest.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="premium-stat rounded-[24px] p-4">
                <p className="text-xs text-white/45">Награда</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xl font-black text-lime-100">
                  <Zap className="h-4 w-4" />
                  +{quest.xpReward} XP
                </p>
              </div>
              <div className="premium-stat rounded-[24px] p-4">
                <p className="text-xs text-white/45">Фокус</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xl font-black text-white">
                  <Clock3 className="h-4 w-4 text-cyan-100" />
                  {quest.durationMinutes} мин
                </p>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-white/[0.055] p-4">
              <p className="text-sm font-black text-white">Что делать сейчас</p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-white/64">
                <p className="flex gap-2">
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-lime-200" />
                  Включи фокус и начни квест.
                </p>
                <p className="flex gap-2">
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-lime-200" />
                  Сделай действие в реальности.
                </p>
                <p className="flex gap-2">
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-lime-200" />
                  Вернись и отправь короткий proof.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <LiquidButton className="w-full" icon={<Play className="h-5 w-5" />} onClick={startQuest}>
                Начать выполнение
              </LiquidButton>
              <LiquidButton className="w-full" href="/quests" variant="secondary">
                Выбрать другой
              </LiquidButton>
            </div>
          </div>
        ) : null}

        {stage === "doing" ? (
          <div className="space-y-5">
            <div className="rounded-[30px] border border-lime-200/18 bg-[radial-gradient(circle_at_50%_0%,rgba(200,255,92,0.16),transparent_62%),rgba(255,255,255,0.055)] p-5 text-center">
              <Flame className="reward-aura mx-auto h-10 w-10 text-orange-300" />
              <p className="mt-3 text-sm font-black text-lime-100">Квест идёт</p>
              <h2 className="mt-2 font-mono text-5xl font-black text-white">{formatElapsed(elapsed)}</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Не думай о приложении. Сделай квест, потом вернись сюда и зафиксируй результат.
              </p>
            </div>

            <LiquidButton className="w-full" icon={<FileCheck2 className="h-5 w-5" />} onClick={moveToProof}>
              Готово, загрузить proof
            </LiquidButton>
          </div>
        ) : null}

        {stage === "proof" ? (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold text-cyan-100">Финальный шаг</p>
              <h2 className="mt-1 text-2xl font-black leading-tight text-white sm:text-3xl">{proof.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{proof.helper}</p>
            </div>

            <label className="pressable flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-cyan-100/36 bg-[radial-gradient(circle_at_50%_0%,rgba(73,245,209,0.13),transparent_62%),rgba(73,245,209,0.055)] p-5 text-center transition hover:bg-cyan-300/[0.1] sm:min-h-44 sm:p-6">
              <UploadCloud className="reward-aura h-10 w-10 text-cyan-100" />
              <span className="mt-4 text-base font-black text-white">
                {fileName ?? "Нажми, чтобы выбрать proof"}
              </span>
              <span className="mt-1 text-sm text-white/48">Фото, видео или скрин результата</span>
              <input
                className="sr-only"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
                type="file"
              />
            </label>

            <div>
              <p className="mb-2 text-sm font-bold text-white/70">Быстрый proof</p>
              <div className="flex flex-wrap gap-2">
                {proof.examples.map((example) => (
                  <button
                    className="pressable rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-xs font-black text-white/72 transition hover:text-white"
                    key={example}
                    onClick={() => setComment(example)}
                    type="button"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white/70">Комментарий</span>
              <textarea
                className="min-h-28 w-full resize-none rounded-[26px] border border-white/12 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/34 focus:border-cyan-100/45"
                onChange={(event) => setComment(event.target.value)}
                placeholder="Что сделал? Как прошёл квест?"
                value={comment}
              />
            </label>

            {!evidenceReady ? (
              <p className="text-center text-sm font-bold text-white/45">Добавь файл или короткий комментарий, чтобы закрыть день.</p>
            ) : null}

            <LiquidButton className="w-full" disabled={!evidenceReady} onClick={submitProof}>
              Отправить proof
            </LiquidButton>
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
}

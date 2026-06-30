"use client";

import { useState } from "react";
import { CheckCircle2, UploadCloud } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { LiquidButton } from "@/components/LiquidButton";
import type { Quest } from "@/lib/types";

type UploadProofProps = {
  quest: Quest;
};

export function UploadProof({ quest }: UploadProofProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitProof() {
    const payload = {
      questId: quest.id,
      fileName,
      comment,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lockin:last-proof", JSON.stringify(payload));
    // TODO: replace localStorage with Supabase Storage upload + proofs insert.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <GlassCard className="p-6 text-center">
        <CheckCircle2 className="reward-aura mx-auto h-14 w-14 text-lime-300" />
        <h2 className="mt-5 text-3xl font-black text-white">Proof отправлен.</h2>
        <p className="mt-3 text-[var(--text-muted)]">Ты почти закрыл день. Осталось дождаться подтверждения.</p>
        <LiquidButton className="mt-6 w-full" href="/share">
          Поделиться победой
        </LiquidButton>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <div className="relative z-10 space-y-4 sm:space-y-5">
        <div>
          <p className="text-sm font-bold text-cyan-100">Выбранный квест</p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-white sm:text-3xl">{quest.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-muted)] sm:mt-3 sm:line-clamp-none">
            Загрузи фото, видео или комментарий. В MVP proof сохраняется локально, без Supabase ключей.
          </p>
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

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-white/70">Комментарий</span>
          <textarea
            className="min-h-32 w-full resize-none rounded-[26px] border border-white/12 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/34 focus:border-cyan-100/45"
            onChange={(event) => setComment(event.target.value)}
            placeholder="Что сделал? Как прошёл квест?"
            value={comment}
          />
        </label>

        <LiquidButton className="w-full" onClick={submitProof}>
          Отправить proof
        </LiquidButton>
      </div>
    </GlassCard>
  );
}

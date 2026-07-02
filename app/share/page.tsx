"use client";

import { Copy, Download } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/GlassCard";
import { InviteFriendButton } from "@/components/InviteFriendButton";
import { LiquidButton } from "@/components/LiquidButton";
import { ShareCard } from "@/components/ShareCard";
import { mockDailyQuest, mockSquad, mockUser } from "@/lib/mockData";
import { LOCKIN_SHARE_TEXT } from "@/lib/share";
import { useState } from "react";

export default function SharePage() {
  const [copied, setCopied] = useState(false);

  function copyShareText() {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(LOCKIN_SHARE_TEXT);
    }

    setCopied(true);
  }

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Поделись победой" title="Карточка для сторис" user={mockUser} />

        <div className="grid items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <ShareCard quest={mockDailyQuest} squad={mockSquad} user={mockUser} />

          <GlassCard className="p-6">
            <div className="relative z-10">
              <p className="text-sm font-bold text-cyan-100">Story-ready формат 9:16</p>
              <h2 className="mt-2 text-4xl font-black leading-tight text-white">
                Карточка должна выглядеть так, чтобы её хотелось выложить.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--text-muted)]">
                В MVP кнопка копирует текст. Экспорт изображения можно добавить через
                canvas/html-to-image на следующем шаге.
              </p>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.06] p-4 text-white/80">
                {LOCKIN_SHARE_TEXT}
              </div>

              <div className="mt-4 rounded-[28px] border border-lime-200/18 bg-lime-200/[0.06] p-4">
                <p className="text-sm font-black text-lime-100">Вступай в мой squad</p>
                <p className="mt-1 text-2xl font-black text-white">{mockSquad.inviteCode}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <LiquidButton icon={<Copy className="h-5 w-5" />} onClick={copyShareText}>
                  {copied ? "Скопировано" : "Скопировать текст"}
                </LiquidButton>
                <InviteFriendButton inviteCode={mockSquad.inviteCode} variant="secondary" />
                <LiquidButton icon={<Download className="h-5 w-5" />} variant="secondary">
                  Скачать карточку
                </LiquidButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

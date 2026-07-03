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

function fillRoundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
  context.fill();
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3,
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (context.measureText(nextLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
      return;
    }

    line = nextLine;
  });

  if (line) lines.push(line);

  lines.slice(0, maxLines).forEach((item, index) => {
    context.fillText(item, x, y + index * lineHeight);
  });

  return y + Math.min(lines.length, maxLines) * lineHeight;
}

export default function SharePage() {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  function copyShareText() {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(LOCKIN_SHARE_TEXT);
    }

    setCopied(true);
  }

  function downloadShareCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;

    const context = canvas.getContext("2d");
    if (!context) return;

    const background = context.createLinearGradient(0, 0, 1080, 1920);
    background.addColorStop(0, "#171d33");
    background.addColorStop(0.48, "#071018");
    background.addColorStop(1, "#121719");
    context.fillStyle = background;
    context.fillRect(0, 0, 1080, 1920);

    const cyanGlow = context.createRadialGradient(780, 170, 40, 780, 170, 760);
    cyanGlow.addColorStop(0, "rgba(73,245,209,0.38)");
    cyanGlow.addColorStop(1, "rgba(73,245,209,0)");
    context.fillStyle = cyanGlow;
    context.fillRect(0, 0, 1080, 1920);

    const limeGlow = context.createRadialGradient(520, 1110, 80, 520, 1110, 820);
    limeGlow.addColorStop(0, "rgba(200,255,92,0.28)");
    limeGlow.addColorStop(1, "rgba(200,255,92,0)");
    context.fillStyle = limeGlow;
    context.fillRect(0, 0, 1080, 1920);

    context.fillStyle = "rgba(255,255,255,0.16)";
    fillRoundRect(context, 72, 72, 936, 1776, 92);
    context.strokeStyle = "rgba(255,255,255,0.24)";
    context.lineWidth = 3;
    context.stroke();

    context.fillStyle = "#ffffff";
    context.font = "900 78px Inter, Segoe UI, sans-serif";
    context.fillText("LOCKIN", 132, 176);
    context.fillStyle = "rgba(255,255,255,0.54)";
    context.font = "800 26px Inter, Segoe UI, sans-serif";
    context.fillText("ДЕНЬ ЗАКРЫТ", 132, 224);

    context.fillStyle = "rgba(200,255,92,0.15)";
    fillRoundRect(context, 348, 350, 384, 384, 92);
    context.strokeStyle = "rgba(200,255,92,0.36)";
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = "#c8ff5c";
    context.font = "900 220px Inter, Segoe UI, sans-serif";
    context.textAlign = "center";
    context.fillText("⚡", 540, 605);
    context.textAlign = "left";

    context.fillStyle = "rgba(255,255,255,0.14)";
    fillRoundRect(context, 132, 850, 816, 300, 58);
    context.fillStyle = "#9cfbe8";
    context.font = "900 36px Inter, Segoe UI, sans-serif";
    context.fillText("Я закрыл день в LOCKIN", 190, 928);
    context.fillStyle = "#ffffff";
    context.font = "900 88px Inter, Segoe UI, sans-serif";
    context.fillText(mockUser.name, 190, 1030);
    context.fillStyle = "#d9ff6a";
    context.font = "900 42px Inter, Segoe UI, sans-serif";
    drawWrappedText(context, mockDailyQuest.title, 190, 1100, 700, 48, 2);

    const stats = [
      [`${mockUser.streak}`, "СЕРИЯ"],
      [`LVL ${mockUser.level}`, "УРОВЕНЬ"],
      [`+${mockDailyQuest.xpReward}`, "XP"],
    ];

    stats.forEach(([value, label], index) => {
      const x = 132 + index * 278;
      context.fillStyle = "rgba(255,255,255,0.12)";
      fillRoundRect(context, x, 1210, 250, 170, 44);
      context.fillStyle = "#ffffff";
      context.font = "900 54px Inter, Segoe UI, sans-serif";
      context.fillText(value, x + 34, 1290);
      context.fillStyle = "rgba(255,255,255,0.52)";
      context.font = "800 24px Inter, Segoe UI, sans-serif";
      context.fillText(label, x + 34, 1334);
    });

    context.fillStyle = "rgba(255,255,255,0.15)";
    fillRoundRect(context, 132, 1444, 816, 284, 54);
    context.fillStyle = "#c8ff5c";
    context.font = "900 34px Inter, Segoe UI, sans-serif";
    context.fillText("Вступай в мой squad", 190, 1524);
    context.fillStyle = "#ffffff";
    context.font = "900 58px Inter, Segoe UI, sans-serif";
    context.fillText(mockSquad.inviteCode, 190, 1614);
    context.fillStyle = "rgba(255,255,255,0.58)";
    context.font = "700 30px Inter, Segoe UI, sans-serif";
    context.fillText("Сможешь повторить мой streak?", 190, 1684);

    const link = document.createElement("a");
    link.download = `lockin-${mockUser.username}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloaded(true);
  }

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Поделись победой" title="Карточка для сторис" user={mockUser} />

        <div className="grid items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <ShareCard quest={mockDailyQuest} squad={mockSquad} user={mockUser} />

          <GlassCard className="p-6">
            <div className="relative z-10">
              <p className="text-sm font-bold text-cyan-100">Формат сторис 9:16</p>
              <h2 className="mt-2 text-4xl font-black leading-tight text-white">
                Карточка, которую не стыдно отправить друзьям.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--text-muted)]">
                Скопируй текст, скачай PNG или отправь инвайт. Смысл простой: ты закрыл день, теперь брось вызов другу.
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
                <LiquidButton icon={<Download className="h-5 w-5" />} onClick={downloadShareCard} variant="secondary">
                  {downloaded ? "PNG готов" : "Скачать PNG"}
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

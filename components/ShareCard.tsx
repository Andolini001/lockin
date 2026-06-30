import { Flame, QrCode, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { ProgressRing } from "@/components/ProgressRing";
import type { Quest, Squad, User } from "@/lib/types";

type ShareCardProps = {
  user: User;
  quest: Quest;
  squad: Squad;
};

export function ShareCard({ user, quest, squad }: ShareCardProps) {
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-[36px] border border-white/18 bg-[linear-gradient(160deg,#12182b,#071018_48%,#10161f)] p-5 shadow-[0_36px_120px_rgba(0,0,0,0.5)]">
      <div className="surface-grid absolute inset-0" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black tracking-normal text-white">LOCKIN</span>
          <Sparkles className="h-6 w-6 text-lime-300" />
        </div>

        <div className="mt-auto space-y-5">
          <GlassCard className="p-5">
            <div className="relative z-10">
              <p className="text-sm font-bold text-cyan-100">Я закрыл день в LOCKIN</p>
              <h2 className="mt-3 text-4xl font-black leading-none text-white">{user.name}</h2>
              <p className="mt-4 text-lg font-black text-gradient">{quest.title}</p>
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 gap-3">
            <GlassCard className="p-4">
              <div className="relative z-10">
                <p className="text-xs text-white/50">Streak</p>
                <p className="mt-1 inline-flex items-center gap-1 text-2xl font-black text-white">
                  <Flame className="h-5 w-5 text-orange-300" />
                  {user.streak}
                </p>
              </div>
            </GlassCard>
            <GlassCard className="grid place-items-center p-4">
              <ProgressRing value={68} label={`LVL ${user.level}`} size={82} />
            </GlassCard>
          </div>

          <GlassCard className="p-4">
            <div className="relative z-10 flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-3xl border border-white/12 bg-white text-[#071017]">
                <QrCode className="h-9 w-9" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Invite</p>
                <p className="text-xl font-black text-white">{squad.inviteCode}</p>
                <p className="text-xs text-white/48">Сможешь повторить мой streak?</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

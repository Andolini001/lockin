import { Flame, QrCode, Sparkles, Trophy, Zap } from "lucide-react";
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
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[330px] overflow-hidden rounded-[34px] border border-white/20 bg-[linear-gradient(160deg,#151a31,#071018_48%,#121719)] p-4 shadow-[0_38px_130px_rgba(0,0,0,0.58),0_0_72px_rgba(200,255,92,0.08)] sm:max-w-[360px] sm:rounded-[38px] sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(120%_72%_at_72%_8%,rgba(73,245,209,0.24),transparent_58%),radial-gradient(92%_54%_at_16%_28%,rgba(169,135,255,0.22),transparent_62%),radial-gradient(96%_52%_at_52%_62%,rgba(200,255,92,0.15),transparent_64%)]" />
      <div className="surface-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-x-8 top-28 h-52 rounded-full bg-lime-300/10 blur-3xl" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black tracking-normal text-white">LOCKIN</span>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">daily proof</p>
          </div>
          <div className="premium-badge rounded-full p-2 text-lime-200">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 grid place-items-center sm:mt-9">
          <div className="relative grid h-24 w-24 place-items-center rounded-[30px] border border-lime-200/24 bg-[linear-gradient(145deg,rgba(200,255,92,0.24),rgba(73,245,209,0.12),rgba(255,255,255,0.05))] shadow-[0_0_80px_rgba(200,255,92,0.22),inset_0_1px_0_rgba(255,255,255,0.24)] sm:h-36 sm:w-36 sm:rounded-[42px]">
            <div className="absolute inset-4 rounded-[24px] border border-white/12 sm:inset-5 sm:rounded-[30px]" />
            <Zap className="h-14 w-14 fill-lime-300 text-lime-300 drop-shadow-[0_0_24px_rgba(200,255,92,0.72)] sm:h-20 sm:w-20" />
          </div>
        </div>

        <div className="mt-auto space-y-3 sm:space-y-4">
          <GlassCard className="p-4 text-center sm:p-5">
            <div className="relative z-10">
              <p className="text-sm font-bold text-cyan-100">Я закрыл день в LOCKIN</p>
              <h2 className="mt-2 text-3xl font-black leading-none text-white sm:mt-3 sm:text-4xl">{user.name}</h2>
              <p className="mt-3 text-base font-black text-gradient sm:mt-4 sm:text-lg">{quest.title}</p>
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <GlassCard className="p-3 sm:p-4">
              <div className="relative z-10">
                <p className="text-xs text-white/50">Streak</p>
                <p className="mt-1 inline-flex items-center gap-1 text-2xl font-black text-white">
                  <Flame className="h-5 w-5 text-orange-300" />
                  {user.streak}
                </p>
              </div>
            </GlassCard>
            <GlassCard className="p-3 sm:p-4">
              <div className="relative z-10 flex items-center justify-between gap-3">
                <ProgressRing value={68} label={`LVL ${user.level}`} size={64} />
                <div className="text-right">
                  <Trophy className="ml-auto h-5 w-5 text-amber-200" />
                  <p className="mt-1 text-lg font-black text-white sm:text-xl">+120</p>
                  <p className="text-xs text-white/48">XP</p>
                </div>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-3 sm:p-4">
            <div className="relative z-10 flex items-center gap-3 sm:gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/16 bg-white text-[#071017] shadow-[0_0_34px_rgba(73,245,209,0.16)] sm:h-16 sm:w-16 sm:rounded-3xl">
                <QrCode className="h-7 w-7 sm:h-9 sm:w-9" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Invite</p>
                <p className="truncate text-lg font-black text-white sm:text-xl">{squad.inviteCode}</p>
                <p className="truncate text-xs text-white/48">Сможешь повторить мой streak?</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

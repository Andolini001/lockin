import { ArrowRight, Flame, UsersRound } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { InviteFriendButton } from "@/components/InviteFriendButton";
import { LiquidButton } from "@/components/LiquidButton";
import type { Squad } from "@/lib/types";
import type { SquadDailyProgress } from "@/lib/squadProgress";

type SquadProgressCardProps = {
  progress: SquadDailyProgress;
  squad: Squad;
};

export function SquadProgressCard({ progress, squad }: SquadProgressCardProps) {
  return (
    <GlassCard className="overflow-hidden p-5">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-cyan-100">{squad.name}</p>
            <h2 className="mt-1 text-2xl font-black leading-tight text-white">
              Команда ждёт тебя: {progress.completed}/{progress.total} закрыли день
            </h2>
          </div>
          <div className="reward-aura rounded-3xl border border-white/12 bg-white/[0.09] p-3 text-lime-200">
            <UsersRound className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#49f5d1,#c8ff5c,#ffe485)] shadow-[0_0_22px_rgba(200,255,92,0.28)]"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.06] p-3">
          <p className="inline-flex items-center gap-2 text-sm font-black text-white">
            <Flame className="h-4 w-4 text-orange-300" />
            {progress.isComplete
              ? `x${progress.bonusMultiplier} XP уже активен`
              : `Ещё ${progress.remaining} до x${progress.bonusMultiplier} XP`}
          </p>
          <p className="mt-1 text-xs leading-5 text-white/50">Код squad: {squad.inviteCode}</p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <InviteFriendButton className="w-full" inviteCode={squad.inviteCode} />
          <LiquidButton className="w-full" href="/squad" icon={<ArrowRight className="h-5 w-5" />} variant="secondary">
            Открыть squad
          </LiquidButton>
        </div>
      </div>
    </GlassCard>
  );
}

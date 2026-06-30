import { ArrowRight, Flame, UsersRound } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { LiquidButton } from "@/components/LiquidButton";
import type { Squad } from "@/lib/types";

type SquadCardProps = {
  squad: Squad;
  completedToday: number;
};

export function SquadCard({ squad, completedToday }: SquadCardProps) {
  return (
    <GlassCard className="pressable overflow-hidden p-5">
      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-cyan-100/75">Команда почти закрыла день</p>
            <h2 className="mt-1 text-3xl font-black text-white">{squad.name}</h2>
          </div>
          <div className="reward-aura rounded-3xl border border-white/12 bg-white/[0.09] p-3 text-lime-200">
            <UsersRound className="h-6 w-6" />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="premium-stat rounded-3xl p-3">
            <p className="text-xs text-white/45">Сегодня</p>
            <p className="text-xl font-black text-white">
              {completedToday}/{squad.members}
            </p>
          </div>
          <div className="premium-stat rounded-3xl p-3">
            <p className="text-xs text-white/45">Неделя</p>
            <p className="text-xl font-black text-white">{squad.weeklyXp.toLocaleString("ru-RU")}</p>
          </div>
          <div className="premium-stat rounded-3xl p-3">
            <p className="text-xs text-white/45">Серия</p>
            <p className="inline-flex items-center gap-1 text-xl font-black text-white">
              <Flame className="h-4 w-4 text-orange-300" />
              {squad.streak}
            </p>
          </div>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#49f5d1,#c8ff5c,#ffe485)] shadow-[0_0_22px_rgba(200,255,92,0.28)]"
            style={{ width: `${(completedToday / squad.members) * 100}%` }}
          />
        </div>

        <LiquidButton
          className="mt-5 w-full"
          href="/squad"
          icon={<ArrowRight className="h-5 w-5" />}
          variant="secondary"
        >
          Открыть команду
        </LiquidButton>
      </div>
    </GlassCard>
  );
}

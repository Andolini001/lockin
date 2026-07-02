import type { Squad, SquadMember } from "@/lib/types";

export const SQUAD_BONUS_MULTIPLIER = 2;

export function getSquadDailyProgress(squad: Squad, members: SquadMember[]) {
  const completed = members.filter((member) => member.completedToday).length;
  const total = squad.members;
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const remaining = Math.max(total - completed, 0);

  return {
    completed,
    total,
    percent,
    remaining,
    isComplete: total > 0 && completed >= total,
    bonusMultiplier: SQUAD_BONUS_MULTIPLIER,
  };
}

export type SquadDailyProgress = ReturnType<typeof getSquadDailyProgress>;

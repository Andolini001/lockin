import type { Quest } from "@/lib/types";

const XP_PER_LEVEL = 500;

export function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function xpToNextLevel(xp: number): number {
  const nextLevelXp = Math.ceil((xp + 1) / XP_PER_LEVEL) * XP_PER_LEVEL;
  return Math.max(nextLevelXp - xp, 0);
}

export function levelProgressPercent(xp: number): number {
  return Math.round(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100);
}

export function calculateQuestReward(
  quest: Quest,
  streak: number,
  squadComplete = false,
): number {
  let reward = quest.xpReward;

  if (streak >= 7) {
    reward *= 1.25;
  } else if (streak >= 3) {
    reward *= 1.1;
  }

  if (squadComplete) {
    reward *= 2;
  }

  return Math.round(reward);
}

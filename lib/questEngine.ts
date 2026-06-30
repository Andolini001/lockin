import { mockDailyQuest, mockQuests } from "@/lib/mockData";
import type { Quest, QuestCategory, QuestDifficulty, User } from "@/lib/types";
import { calculateLevel, calculateQuestReward } from "@/lib/xp";

export function getDailyQuest(): Quest {
  return mockDailyQuest;
}

export function getQuestsByCategory(category: QuestCategory | "all"): Quest[] {
  if (category === "all") {
    return mockQuests;
  }

  return mockQuests.filter((quest) => quest.category === category);
}

export function getQuestsByDifficulty(difficulty: QuestDifficulty | "all"): Quest[] {
  if (difficulty === "all") {
    return mockQuests;
  }

  return mockQuests.filter((quest) => quest.difficulty === difficulty);
}

export function completeQuest(user: User, quest: Quest, squadComplete = false) {
  const xpEarned = calculateQuestReward(quest, user.streak, squadComplete);
  const nextXp = user.xp + xpEarned;

  return {
    user: {
      ...user,
      xp: nextXp,
      level: calculateLevel(nextXp),
      streak: user.streak + 1,
      completedQuests: user.completedQuests + 1,
    },
    xpEarned,
  };
}

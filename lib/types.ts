export type QuestCategory = "body" | "focus" | "social" | "order" | "work" | "mind";
export type QuestDifficulty = "easy" | "medium" | "hard";
export type ProofType = "photo" | "video" | "text" | "timer";
export type ProofStatus = "pending" | "approved" | "rejected";

export type User = {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  streak: number;
  completedQuests: number;
  squadId: string;
  createdAt: string;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  xpReward: number;
  durationMinutes: number;
  proofType: ProofType;
  isDaily: boolean;
  createdAt: string;
};

export type Proof = {
  id: string;
  userId: string;
  questId: string;
  fileUrl?: string;
  text?: string;
  status: ProofStatus;
  createdAt: string;
};

export type Squad = {
  id: string;
  name: string;
  members: number;
  weeklyXp: number;
  streak: number;
  inviteCode: string;
};

export type SquadMember = {
  userId: string;
  name: string;
  username: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  streak: number;
  completedToday: boolean;
};

export type LeaderboardEntry = {
  userId: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  streak: number;
  rank: number;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
};

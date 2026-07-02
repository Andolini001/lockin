import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { QuestCard } from "@/components/QuestCard";
import { UploadProof } from "@/components/UploadProof";
import { mockDailyQuest, mockQuests, mockUser } from "@/lib/mockData";
import { Clock3, Sparkles, Zap } from "lucide-react";

type ProofPageProps = {
  searchParams: Promise<{
    quest?: string | string[];
  }>;
};

export default async function ProofPage({ searchParams }: ProofPageProps) {
  const params = await searchParams;
  const questId = Array.isArray(params.quest) ? params.quest[0] : params.quest;
  const selectedQuest = mockQuests.find((quest) => quest.id === questId) ?? mockDailyQuest;
  const proofLabels = {
    photo: "Фото",
    video: "Видео",
    text: "Текст",
    timer: "Таймер",
  };

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Шаг 2 из 3" title="Квест принят" user={mockUser} />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden">
            <div className="relative z-10 flex items-start justify-between gap-4 p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <span className="premium-badge">Квест принят</span>
                  <span className="mini-pill">{proofLabels[selectedQuest.proofType]}</span>
                </div>
                <h2 className="mt-3 text-2xl font-black leading-tight text-white">{selectedQuest.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-[var(--text-muted)]">{selectedQuest.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-white">
                  <span className="mini-pill text-lime-100">
                    <Zap className="h-3.5 w-3.5" /> +{selectedQuest.xpReward} XP
                  </span>
                  <span className="mini-pill">
                    <Clock3 className="h-3.5 w-3.5 text-cyan-100" /> {selectedQuest.durationMinutes} мин
                  </span>
                </div>
              </div>
              <div className="reward-aura flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/16 bg-white/[0.09]">
                <Sparkles className="h-5 w-5 text-cyan-100" />
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <QuestCard quest={selectedQuest} showAction={false} />
          </div>
          <UploadProof quest={selectedQuest} />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

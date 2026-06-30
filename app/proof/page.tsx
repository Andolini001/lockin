import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { QuestCard } from "@/components/QuestCard";
import { UploadProof } from "@/components/UploadProof";
import { mockDailyQuest, mockQuests, mockUser } from "@/lib/mockData";

type ProofPageProps = {
  searchParams: Promise<{
    quest?: string | string[];
  }>;
};

export default async function ProofPage({ searchParams }: ProofPageProps) {
  const params = await searchParams;
  const questId = Array.isArray(params.quest) ? params.quest[0] : params.quest;
  const selectedQuest = mockQuests.find((quest) => quest.id === questId) ?? mockDailyQuest;

  return (
    <main className="app-screen">
      <div className="app-container">
        <AppHeader subtitle="Proof-доказательство" title="Покажи результат" user={mockUser} />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <QuestCard quest={selectedQuest} />
          <UploadProof quest={selectedQuest} />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

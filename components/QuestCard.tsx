import type { ComponentType } from "react";
import { Camera, Clock3, FileText, Timer, Video } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { QuestAcceptButton } from "@/components/QuestAcceptButton";
import {
  categoryLabels,
  difficultyLabels,
  proofTypeLabels,
} from "@/lib/mockData";
import type { ProofType, Quest } from "@/lib/types";

const proofIcons: Record<ProofType, ComponentType<{ className?: string }>> = {
  photo: Camera,
  video: Video,
  text: FileText,
  timer: Timer,
};

type QuestCardProps = {
  quest: Quest;
  compact?: boolean;
  showAction?: boolean;
};

export function QuestCard({ quest, compact = false, showAction = true }: QuestCardProps) {
  const ProofIcon = proofIcons[quest.proofType];

  return (
    <GlassCard
      className={[
        "pressable overflow-hidden p-5",
        quest.isDaily ? "border-lime-200/45 bg-lime-300/[0.09] shadow-[0_28px_86px_rgba(200,255,92,0.08)]" : "",
      ].join(" ")}
    >
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {quest.isDaily ? (
              <span className="mini-pill bg-lime-300/18 text-lime-100">Квест дня</span>
            ) : null}
            <span className="mini-pill">{categoryLabels[quest.category]}</span>
            <span className="mini-pill">{difficultyLabels[quest.difficulty]}</span>
          </div>
          <div className="reward-aura rounded-2xl border border-white/12 bg-white/[0.09] p-3 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <ProofIcon className="h-5 w-5" />
          </div>
        </div>

        <h3 className="text-2xl font-black leading-tight text-white">{quest.title}</h3>
        <p className={["mt-3 leading-6 text-[var(--text-muted)]", compact ? "line-clamp-2 text-sm" : ""].join(" ")}>
          {quest.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-black text-white/82">
          <span className="premium-badge inline-flex items-center gap-2 rounded-full px-3 py-2 text-lime-100">
            <span className="text-lime-300">+{quest.xpReward}</span> XP
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-cyan-200" />
            {quest.durationMinutes} мин
          </span>
          <span>{proofTypeLabels[quest.proofType]}</span>
        </div>

        {showAction ? (
          <QuestAcceptButton
            className="mt-5 w-full"
            quest={quest}
            variant={quest.isDaily ? "primary" : "secondary"}
          />
        ) : null}
      </div>
    </GlassCard>
  );
}

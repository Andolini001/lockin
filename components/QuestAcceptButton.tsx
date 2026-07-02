"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LiquidButton } from "@/components/LiquidButton";
import type { Quest } from "@/lib/types";

type QuestAcceptButtonProps = {
  className?: string;
  quest: Quest;
  variant?: "primary" | "secondary" | "ghost";
};

export function QuestAcceptButton({
  className = "",
  quest,
  variant = "primary",
}: QuestAcceptButtonProps) {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  function acceptQuest() {
    setAccepted(true);

    localStorage.setItem(
      "lockin:active-quest",
      JSON.stringify({
        acceptedAt: new Date().toISOString(),
        questId: quest.id,
        title: quest.title,
        xpReward: quest.xpReward,
        status: "accepted",
      }),
    );

    window.setTimeout(() => {
      router.push(`/proof?quest=${quest.id}&accepted=1`);
    }, 260);
  }

  return (
    <LiquidButton
      className={className}
      disabled={accepted}
      icon={accepted ? <CheckCircle2 className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
      onClick={acceptQuest}
      variant={accepted ? "primary" : variant}
    >
      {accepted ? "Квест принят" : "Взять квест"}
    </LiquidButton>
  );
}

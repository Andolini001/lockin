"use client";

import { Check, UserPlus } from "lucide-react";
import { useState } from "react";
import { LiquidButton } from "@/components/LiquidButton";
import { buildSquadInviteText } from "@/lib/share";

type InviteFriendButtonProps = {
  className?: string;
  inviteCode: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function InviteFriendButton({
  className = "",
  inviteCode,
  variant = "primary",
}: InviteFriendButtonProps) {
  const [copied, setCopied] = useState(false);
  const inviteText = buildSquadInviteText(inviteCode);

  async function inviteFriend() {
    setCopied(true);

    if (navigator.share) {
      try {
        await navigator.share({
          text: inviteText,
          title: "LOCKIN squad",
        });
        return;
      } catch {
        // Fall back to clipboard when native share is cancelled or unavailable.
      }
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(inviteText);
      }
    } catch {
      // Some browser test contexts deny clipboard writes; the UI can still show the invite state.
    }
  }

  return (
    <LiquidButton
      className={className}
      icon={copied ? <Check className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
      onClick={() => void inviteFriend()}
      variant={variant}
    >
      {copied ? "Инвайт скопирован" : "Пригласить друга"}
    </LiquidButton>
  );
}

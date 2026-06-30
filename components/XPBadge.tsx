import { Sparkles } from "lucide-react";

type XPBadgeProps = {
  xp: number;
};

export function XPBadge({ xp }: XPBadgeProps) {
  return (
    <div className="premium-badge inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-black text-lime-100">
      <Sparkles className="h-4 w-4 text-lime-300" />
      {xp.toLocaleString("ru-RU")} XP
    </div>
  );
}

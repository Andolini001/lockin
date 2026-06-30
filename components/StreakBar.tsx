const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

type StreakBarProps = {
  streak: number;
};

export function StreakBar({ streak }: StreakBarProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => {
        const filled = index < streak;

        return (
          <div className="flex flex-col items-center gap-2" key={day}>
            <div
              className={[
                "grid aspect-square w-full min-w-0 place-items-center rounded-2xl border text-xs font-black transition",
                filled
                  ? "animate-streak-pop border-lime-200/70 bg-[linear-gradient(145deg,#d9ff6a,#9eff54)] text-[#0a120b] shadow-[0_14px_34px_rgba(200,255,92,0.24),inset_0_1px_0_rgba(255,255,255,0.45)]"
                  : "border-white/10 bg-white/[0.055] text-white/42 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
              ].join(" ")}
            >
              {filled ? "✓" : ""}
            </div>
            <span className="text-[10px] font-bold text-white/45">{day}</span>
          </div>
        );
      })}
    </div>
  );
}

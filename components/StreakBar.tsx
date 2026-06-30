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
                  ? "border-lime-200/60 bg-lime-300 text-[#0a120b] shadow-[0_12px_30px_rgba(200,255,92,0.18)]"
                  : "border-white/10 bg-white/[0.06] text-white/42",
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

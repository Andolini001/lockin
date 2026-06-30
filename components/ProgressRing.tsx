type ProgressRingProps = {
  value: number;
  label: string;
  caption?: string;
  size?: number;
};

export function ProgressRing({ value, label, caption, size = 96 }: ProgressRingProps) {
  const normalized = Math.min(Math.max(value, 0), 100);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <div className="relative grid place-items-center" style={{ height: size, width: size }}>
      <svg aria-hidden="true" className="-rotate-90" height={size} viewBox="0 0 100 100" width={size}>
        <circle
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke="rgba(255,255,255,0.11)"
          strokeWidth="9"
        />
        <circle
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke="url(#lockin-ring)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="9"
        />
        <defs>
          <linearGradient id="lockin-ring" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#49f5d1" />
            <stop offset="0.55" stopColor="#c8ff5c" />
            <stop offset="1" stopColor="#ffe485" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-lg font-black leading-none text-white">{label}</div>
        {caption ? <div className="mt-1 text-[10px] font-bold text-white/58">{caption}</div> : null}
      </div>
    </div>
  );
}

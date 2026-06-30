type UserAvatarProps = {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-24 w-24 text-3xl",
};

export function UserAvatar({ name, avatarUrl, size = "md" }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      aria-label={name}
      className={`${sizeClasses[size]} reward-aura grid shrink-0 place-items-center rounded-full border border-white/28 bg-[linear-gradient(135deg,#49f5d1,#9e7bff_50%,#c8ff5c)] bg-cover bg-center font-black text-[#071017] shadow-[0_18px_54px_rgba(73,245,209,0.22),inset_0_1px_0_rgba(255,255,255,0.55)]`}
      style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
    >
      {avatarUrl ? <span className="sr-only">{initials}</span> : initials}
    </div>
  );
}

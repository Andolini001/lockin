import { UserAvatar } from "@/components/UserAvatar";
import { XPBadge } from "@/components/XPBadge";
import type { User } from "@/lib/types";

type AppHeaderProps = {
  title: string;
  subtitle: string;
  user: User;
};

export function AppHeader({ title, subtitle, user }: AppHeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-bold text-cyan-100/80">{subtitle}</p>
        <h1 className="mt-1 text-3xl font-black leading-tight text-white sm:text-5xl">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden sm:block">
          <XPBadge xp={user.xp} />
        </div>
        <UserAvatar name={user.name} size="md" />
      </div>
    </header>
  );
}

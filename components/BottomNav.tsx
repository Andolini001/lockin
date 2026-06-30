"use client";

import { Dumbbell, LayoutDashboard, Trophy, UserRound, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "День", icon: LayoutDashboard },
  { href: "/quests", label: "Квесты", icon: Dumbbell },
  { href: "/squad", label: "Squad", icon: UsersRound },
  { href: "/leaderboard", label: "Топ", icon: Trophy },
  { href: "/profile", label: "Профиль", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="nav-dock fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[min(calc(100%-24px),540px)] items-center justify-between rounded-full border border-white/16 px-2 py-2 backdrop-blur-2xl">
      {navItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={[
              "pressable relative flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-full px-2 text-[11px] font-extrabold transition",
              active
                ? "bg-[linear-gradient(180deg,#ffffff,#dffcf8)] text-[#071017] shadow-[0_14px_40px_rgba(73,245,209,0.24),inset_0_1px_0_rgba(255,255,255,0.8)]"
                : "text-white/56 hover:bg-white/[0.075] hover:text-white",
            ].join(" ")}
            href={item.href}
            key={item.href}
          >
            <Icon
              className={["h-5 w-5", active ? "reward-aura" : ""].join(" ")}
              strokeWidth={active ? 2.7 : 2.2}
            />
            <span>{item.label}</span>
            {active ? (
              <span className="absolute -bottom-1 h-1 w-5 rounded-full bg-[linear-gradient(90deg,#49f5d1,#c8ff5c)] shadow-[0_0_16px_rgba(73,245,209,0.5)]" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

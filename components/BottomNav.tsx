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
    <nav className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[min(calc(100%-24px),520px)] items-center justify-between rounded-full border border-white/15 bg-[#0b1020]/72 px-2 py-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      {navItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={[
              "flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-full px-2 text-[11px] font-extrabold transition",
              active
                ? "bg-white text-[#071017] shadow-[0_12px_36px_rgba(73,245,209,0.24)]"
                : "text-white/58 hover:bg-white/[0.07] hover:text-white",
            ].join(" ")}
            href={item.href}
            key={item.href}
          >
            <Icon className="h-5 w-5" strokeWidth={active ? 2.7 : 2.2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

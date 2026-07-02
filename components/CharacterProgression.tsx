"use client";

import type { LucideIcon } from "lucide-react";
import { Activity, Brain, Flame, GitBranch, Lock, Target, Users, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import type { CharacterBuild, CharacterStatId, SkillBranch, SkillStatus } from "@/lib/types";

type CharacterProgressionProps = {
  build: CharacterBuild;
};

type TreeNode = {
  id: string;
  skillId: string;
  size: "major" | "minor";
  x: number;
  y: number;
};

type TreeEdge = {
  from: string;
  to: string;
};

const statStyles: Record<
  CharacterStatId,
  {
    Icon: LucideIcon;
    aura: string;
    bar: string;
    text: string;
  }
> = {
  focus: {
    Icon: Target,
    aura: "bg-cyan-300/16 text-cyan-100 shadow-[0_0_34px_rgba(73,245,209,0.18)]",
    bar: "bg-gradient-to-r from-cyan-200 to-lime-200",
    text: "text-cyan-100",
  },
  body: {
    Icon: Activity,
    aura: "bg-orange-300/14 text-orange-100 shadow-[0_0_34px_rgba(255,178,90,0.16)]",
    bar: "bg-gradient-to-r from-orange-200 to-amber-200",
    text: "text-orange-100",
  },
  social: {
    Icon: Users,
    aura: "bg-violet-300/15 text-violet-100 shadow-[0_0_34px_rgba(169,135,255,0.18)]",
    bar: "bg-gradient-to-r from-violet-200 to-cyan-200",
    text: "text-violet-100",
  },
  mind: {
    Icon: Brain,
    aura: "bg-lime-300/14 text-lime-100 shadow-[0_0_34px_rgba(200,255,92,0.16)]",
    bar: "bg-gradient-to-r from-lime-200 to-emerald-200",
    text: "text-lime-100",
  },
};

const branchStyles: Record<
  SkillBranch,
  {
    Icon: LucideIcon;
    label: string;
    shortLabel: string;
  }
> = {
  core: { Icon: Flame, label: "Core streak", shortLabel: "Streak" },
  focus: { Icon: Target, label: "Focus path", shortLabel: "Focus" },
  squad: { Icon: Users, label: "Squad path", shortLabel: "Squad" },
};

const statusCopy: Record<SkillStatus, string> = {
  active: "Активно",
  locked: "Закрыто",
  unlocked: "Открыто",
};

const nodeStyles: Record<SkillStatus, string> = {
  active:
    "border-cyan-100/70 bg-[radial-gradient(circle_at_50%_20%,rgba(73,245,209,0.42),rgba(73,245,209,0.12)_52%,rgba(255,255,255,0.06))] text-cyan-50 shadow-[0_0_34px_rgba(73,245,209,0.38)]",
  locked:
    "border-white/12 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.11),rgba(255,255,255,0.035)_58%,rgba(0,0,0,0.16))] text-white/36 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
  unlocked:
    "border-lime-200/58 bg-[radial-gradient(circle_at_50%_20%,rgba(200,255,92,0.36),rgba(200,255,92,0.10)_52%,rgba(255,255,255,0.055))] text-lime-50 shadow-[0_0_30px_rgba(200,255,92,0.28)]",
};

const treeNodes: TreeNode[] = [
  { id: "daily", skillId: "core_daily_chain", size: "minor", x: 50, y: 21 },
  { id: "shield", skillId: "core_streak_shield", size: "major", x: 31, y: 34 },
  { id: "legend", skillId: "core_legend_run", size: "minor", x: 16, y: 19 },
  { id: "deep", skillId: "focus_deep_work", size: "minor", x: 68, y: 35 },
  { id: "phone", skillId: "focus_phone_lock", size: "major", x: 84, y: 53 },
  { id: "flow", skillId: "focus_flow_state", size: "minor", x: 85, y: 20 },
  { id: "signal", skillId: "squad_signal", size: "minor", x: 30, y: 68 },
  { id: "x2", skillId: "squad_x2", size: "major", x: 50, y: 82 },
  { id: "raid", skillId: "squad_raid", size: "minor", x: 70, y: 70 },
];

const treeEdges: TreeEdge[] = [
  { from: "center", to: "daily" },
  { from: "daily", to: "shield" },
  { from: "shield", to: "legend" },
  { from: "center", to: "deep" },
  { from: "deep", to: "phone" },
  { from: "deep", to: "flow" },
  { from: "center", to: "signal" },
  { from: "signal", to: "x2" },
  { from: "x2", to: "raid" },
];

export function CharacterProgression({ build }: CharacterProgressionProps) {
  const [selectedSkillId, setSelectedSkillId] = useState("focus_phone_lock");
  const unlockedSkills = build.skills.filter((skill) => skill.status !== "locked").length;
  const skillById = useMemo(() => new Map(build.skills.map((skill) => [skill.id, skill])), [build.skills]);
  const nodeById = useMemo(() => new Map(treeNodes.map((node) => [node.id, node])), []);
  const selectedSkill = skillById.get(selectedSkillId) ?? build.skills.find((skill) => skill.status === "active");

  return (
    <GlassCard className="min-w-0 overflow-hidden p-5">
      <div className="absolute inset-0 bg-[radial-gradient(62%_42%_at_24%_0%,rgba(73,245,209,0.13),transparent_68%),radial-gradient(54%_40%_at_82%_18%,rgba(200,255,92,0.09),transparent_70%)]" />
      <div className="relative z-10 space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-black text-cyan-100">Прокачка персонажа</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-white">Билд: {build.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{build.trait}</p>
          </div>
          <div className="premium-badge w-full rounded-[24px] px-4 py-3 md:w-auto md:min-w-44">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-100/70">{build.rank}</p>
            <p className="mt-1 flex items-center gap-2 text-xl font-black text-white">
              <Zap className="h-5 w-5 text-lime-200" />
              {unlockedSkills}/{build.skills.length} узлов
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {build.stats.map((stat) => {
            const { Icon, aura, bar, text } = statStyles[stat.id];

            return (
              <div className="premium-stat pressable rounded-[24px] p-4" key={stat.id}>
                <div className="flex items-start gap-3">
                  <div className={["grid h-11 w-11 shrink-0 place-items-center rounded-2xl", aura].join(" ")}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-white">{stat.label}</p>
                      <p className={["text-sm font-black", text].join(" ")}>LVL {stat.level}</p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className={["h-full rounded-full", bar].join(" ")} style={{ width: `${stat.progress}%` }} />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/48">{stat.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-black text-white">
                <GitBranch className="h-4 w-4 text-cyan-100" />
                Пассивное дерево
              </p>
              <p className="mt-1 text-sm text-white/50">Узлы загораются от streak, focus proof и squad-действий.</p>
            </div>
            <p className="mini-pill w-fit text-lime-100">{build.nextUnlock}</p>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_42%,rgba(73,245,209,0.12),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(200,255,92,0.09),transparent_40%),rgba(0,0,0,0.12)] p-3">
            <div className="surface-grid absolute inset-0 opacity-55" />
            <div className="relative mx-auto aspect-[1/0.92] min-h-[330px] w-full max-w-[640px] sm:min-h-[420px]">
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                {treeEdges.map((edge) => {
                  const from = edge.from === "center" ? { x: 50, y: 50 } : nodeById.get(edge.from);
                  const to = nodeById.get(edge.to);
                  const toSkill = to ? skillById.get(to.skillId) : null;
                  const isLit = Boolean(toSkill && toSkill.status !== "locked");

                  if (!from || !to) return null;

                  return (
                    <line
                      className={isLit ? "stroke-cyan-100/46" : "stroke-white/10"}
                      key={`${edge.from}-${edge.to}`}
                      strokeLinecap="round"
                      strokeWidth={isLit ? 0.6 : 0.35}
                      x1={from.x}
                      x2={to.x}
                      y1={from.y}
                      y2={to.y}
                    />
                  );
                })}
              </svg>

              <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-lime-200/60 bg-[radial-gradient(circle_at_50%_22%,rgba(200,255,92,0.42),rgba(73,245,209,0.18)_58%,rgba(255,255,255,0.07))] text-lime-50 shadow-[0_0_54px_rgba(200,255,92,0.34),inset_0_1px_0_rgba(255,255,255,0.18)] sm:h-24 sm:w-24">
                <Target className="h-9 w-9" />
                <span className="absolute -bottom-7 whitespace-nowrap text-xs font-black text-white/78">
                  {build.title}
                </span>
              </div>

              <span className="absolute left-[8%] top-[38%] text-[0.66rem] font-black uppercase tracking-[0.16em] text-white/38">
                Streak
              </span>
              <span className="absolute right-[7%] top-[38%] text-[0.66rem] font-black uppercase tracking-[0.16em] text-white/38">
                Focus
              </span>
              <span className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-[0.66rem] font-black uppercase tracking-[0.16em] text-white/38">
                Squad
              </span>

              {treeNodes.map((node) => {
                const skill = skillById.get(node.skillId);
                if (!skill) return null;

                const BranchIcon = branchStyles[skill.branch].Icon;
                const isSelected = selectedSkill?.id === skill.id;
                const isLocked = skill.status === "locked";

                return (
                  <button
                    aria-label={`${skill.title}: ${statusCopy[skill.status]}`}
                    className={[
                      "pressable absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-100/70",
                      node.size === "major" ? "h-14 w-14 sm:h-16 sm:w-16" : "h-10 w-10 sm:h-12 sm:w-12",
                      nodeStyles[skill.status],
                      isSelected ? "scale-110 ring-2 ring-lime-200/70" : "",
                    ].join(" ")}
                    key={node.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    title={`${skill.title} — ${skill.bonus}`}
                    type="button"
                  >
                    {isLocked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <BranchIcon className={node.size === "major" ? "h-6 w-6" : "h-4 w-4"} />
                    )}
                    {skill.status === "active" ? (
                      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-[#071017] bg-cyan-100 shadow-[0_0_18px_rgba(73,245,209,0.9)]" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedSkill ? (
            <div className="mt-3 rounded-[24px] border border-white/10 bg-white/[0.055] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">
                    {branchStyles[selectedSkill.branch].label}
                  </p>
                  <h3 className="mt-1 text-xl font-black text-white">{selectedSkill.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/56">{selectedSkill.description}</p>
                </div>
                <span className="mini-pill shrink-0 text-lime-100">{statusCopy[selectedSkill.status]}</span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <p className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-white/58">
                  Требование: <span className="text-white/82">{selectedSkill.requirement}</span>
                </p>
                <p className="rounded-2xl border border-lime-200/16 bg-lime-200/[0.06] px-3 py-2 text-xs font-black text-lime-100">
                  Бонус: {selectedSkill.bonus}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </GlassCard>
  );
}

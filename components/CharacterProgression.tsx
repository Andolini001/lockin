"use client";

import type { LucideIcon } from "lucide-react";
import { Activity, Brain, Check, Flame, Leaf, Lock, Sparkles, Target, Users, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import type { CharacterBuild, CharacterStatId, SkillBranch, SkillStatus } from "@/lib/types";

type CharacterProgressionProps = {
  build: CharacterBuild;
  level: number;
  xpProgress: number;
};

type GrowthNode = {
  id: string;
  skillId: string;
  layer: "root" | "trunk" | "canopy";
  size: "large" | "medium" | "small";
  x: number;
  y: number;
};

type GrowthPath = {
  d: string;
  targetSkillId: string;
};

const qualityCopy: Record<
  CharacterStatId,
  {
    Icon: LucideIcon;
    accent: string;
    bar: string;
    quality: string;
    result: string;
  }
> = {
  focus: {
    Icon: Target,
    accent: "text-cyan-100 bg-cyan-200/12 border-cyan-100/22",
    bar: "bg-gradient-to-r from-cyan-100 via-teal-100 to-lime-100",
    quality: "Концентрация",
    result: "умение держать внимание и доводить фокус-сессии до конца",
  },
  body: {
    Icon: Activity,
    accent: "text-orange-100 bg-orange-200/12 border-orange-100/20",
    bar: "bg-gradient-to-r from-orange-100 via-amber-100 to-lime-100",
    quality: "Энергия",
    result: "тонус, движение, короткие физические перезагрузки",
  },
  social: {
    Icon: Users,
    accent: "text-violet-100 bg-violet-200/12 border-violet-100/22",
    bar: "bg-gradient-to-r from-violet-100 via-cyan-100 to-lime-100",
    quality: "Командность",
    result: "ответственность перед squad и привычка тянуть других",
  },
  mind: {
    Icon: Brain,
    accent: "text-lime-100 bg-lime-200/12 border-lime-100/20",
    bar: "bg-gradient-to-r from-lime-100 via-emerald-100 to-cyan-100",
    quality: "Ясность",
    result: "порядок, анти-скролл, спокойный режим и меньше шума",
  },
};

const branchCopy: Record<
  SkillBranch,
  {
    Icon: LucideIcon;
    label: string;
    tone: string;
  }
> = {
  core: { Icon: Flame, label: "Серия", tone: "text-orange-100" },
  focus: { Icon: Target, label: "Фокус", tone: "text-cyan-100" },
  squad: { Icon: Users, label: "Squad", tone: "text-violet-100" },
};

const statusCopy: Record<SkillStatus, string> = {
  active: "Активно",
  locked: "Закрыто",
  unlocked: "Открыто",
};

const nodeStyles: Record<SkillStatus, string> = {
  active:
    "border-cyan-100/65 bg-[radial-gradient(circle_at_38%_18%,rgba(255,255,255,0.72),rgba(73,245,209,0.36)_32%,rgba(73,245,209,0.13)_68%,rgba(255,255,255,0.07))] text-cyan-50 shadow-[0_0_42px_rgba(73,245,209,0.38),inset_0_1px_0_rgba(255,255,255,0.52)]",
  locked:
    "border-white/12 bg-[radial-gradient(circle_at_38%_18%,rgba(255,255,255,0.22),rgba(255,255,255,0.075)_58%,rgba(255,255,255,0.035))] text-white/34 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]",
  unlocked:
    "border-lime-100/54 bg-[radial-gradient(circle_at_38%_18%,rgba(255,255,255,0.68),rgba(200,255,92,0.34)_34%,rgba(200,255,92,0.12)_68%,rgba(255,255,255,0.06))] text-lime-50 shadow-[0_0_36px_rgba(200,255,92,0.3),inset_0_1px_0_rgba(255,255,255,0.48)]",
};

const growthNodes: GrowthNode[] = [
  { id: "daily", skillId: "core_daily_chain", layer: "root", size: "small", x: 38, y: 82 },
  { id: "deep", skillId: "focus_deep_work", layer: "root", size: "small", x: 50, y: 75 },
  { id: "signal", skillId: "squad_signal", layer: "root", size: "small", x: 62, y: 82 },
  { id: "shield", skillId: "core_streak_shield", layer: "trunk", size: "medium", x: 40, y: 58 },
  { id: "phone", skillId: "focus_phone_lock", layer: "trunk", size: "large", x: 50, y: 44 },
  { id: "x2", skillId: "squad_x2", layer: "trunk", size: "medium", x: 62, y: 58 },
  { id: "legend", skillId: "core_legend_run", layer: "canopy", size: "small", x: 32, y: 24 },
  { id: "flow", skillId: "focus_flow_state", layer: "canopy", size: "medium", x: 50, y: 14 },
  { id: "raid", skillId: "squad_raid", layer: "canopy", size: "small", x: 68, y: 24 },
];

const growthPaths: GrowthPath[] = [
  { d: "M50 88 C45 84 42 83 38 82", targetSkillId: "core_daily_chain" },
  { d: "M50 88 C50 84 50 79 50 75", targetSkillId: "focus_deep_work" },
  { d: "M50 88 C55 84 58 83 62 82", targetSkillId: "squad_signal" },
  { d: "M50 75 C47 68 44 63 40 58", targetSkillId: "core_streak_shield" },
  { d: "M50 75 C50 64 50 53 50 44", targetSkillId: "focus_phone_lock" },
  { d: "M50 75 C53 68 58 63 62 58", targetSkillId: "squad_x2" },
  { d: "M40 58 C36 48 33 36 32 24", targetSkillId: "core_legend_run" },
  { d: "M50 44 C50 34 50 23 50 14", targetSkillId: "focus_flow_state" },
  { d: "M62 58 C65 48 67 36 68 24", targetSkillId: "squad_raid" },
];

const rootPrinciples = ["ежедневность", "proof", "squad"];

export function CharacterProgression({ build, level, xpProgress }: CharacterProgressionProps) {
  const [selectedSkillId, setSelectedSkillId] = useState("focus_phone_lock");
  const skillById = useMemo(() => new Map(build.skills.map((skill) => [skill.id, skill])), [build.skills]);
  const selectedSkill = skillById.get(selectedSkillId) ?? build.skills.find((skill) => skill.status === "active");
  const openSkills = build.skills.filter((skill) => skill.status !== "locked").length;
  const activeSkills = build.skills.filter((skill) => skill.status === "active").length;

  return (
    <GlassCard className="min-w-0 overflow-hidden p-4 sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(70%_44%_at_26%_0%,rgba(255,255,255,0.16),transparent_64%),radial-gradient(58%_44%_at_86%_8%,rgba(73,245,209,0.16),transparent_72%),radial-gradient(56%_44%_at_52%_100%,rgba(200,255,92,0.12),transparent_70%)]" />

      <div className="relative z-10 space-y-4">
        <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="mirror-panel rounded-[34px] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-black text-cyan-100">Дерево роста</p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-white sm:text-4xl">{build.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">{build.trait}</p>
              </div>
              <div className="rounded-full border border-white/16 bg-white/[0.09] px-4 py-2 text-sm font-black text-lime-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                {build.rank}
              </div>
            </div>
          </div>

          <div className="mirror-panel rounded-[34px] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">Уровень персонажа</p>
                <p className="mt-2 text-4xl font-black text-white">LVL {level}</p>
                <p className="mt-1 text-sm text-white/56">
                  {openSkills}/{build.skills.length} пассивок · {activeSkills} активные
                </p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-[26px] border border-lime-100/30 bg-lime-100/[0.12] text-lime-100 shadow-[0_0_38px_rgba(200,255,92,0.18),inset_0_1px_0_rgba(255,255,255,0.28)]">
                <Zap className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#49f5d1,#c8ff5c,#ffe485)] shadow-[0_0_22px_rgba(200,255,92,0.35)]"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {build.stats.map((stat) => {
            const quality = qualityCopy[stat.id];
            const Icon = quality.Icon;

            return (
              <div className="mirror-panel pressable min-h-[132px] rounded-[28px] p-4 sm:p-5" key={stat.id}>
                <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3">
                  <div className={["grid h-11 w-11 shrink-0 place-items-center rounded-2xl border", quality.accent].join(" ")}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <p className="min-w-0 text-base font-black leading-5 text-white [overflow-wrap:anywhere]">{quality.quality}</p>
                      <p className="shrink-0 rounded-full bg-white/[0.07] px-2 py-1 text-[0.65rem] font-black leading-none text-white/52">
                        LVL {stat.level}
                      </p>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className={["h-full rounded-full", quality.bar].join(" ")} style={{ width: `${stat.progress}%` }} />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/50">{quality.result}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="growth-tree-canvas rounded-[38px] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-black text-white">
                <Leaf className="h-4 w-4 text-lime-100" />
                Пассивное дерево
              </p>
              <p className="mt-1 text-sm text-white/50">Растёт снизу вверх: корни дают стабильность, ствол держит уровень, крона открывает сильные бонусы.</p>
            </div>
            <p className="mini-pill w-fit text-lime-100">{build.nextUnlock}</p>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-[34px] border border-white/12 bg-[radial-gradient(circle_at_50%_14%,rgba(200,255,92,0.12),transparent_28%),radial-gradient(circle_at_52%_54%,rgba(73,245,209,0.10),transparent_42%),rgba(255,255,255,0.035)] px-2 py-4 sm:px-5">
            <div className="surface-grid absolute inset-0 opacity-45" />
            <div className="absolute inset-x-12 top-7 h-28 rounded-full bg-lime-200/10 blur-3xl" />
            <div className="absolute inset-x-16 bottom-2 h-24 rounded-full bg-cyan-200/10 blur-3xl" />

            <div className="relative mx-auto h-[430px] w-full max-w-[640px] sm:h-[500px] lg:h-[520px]">
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="growth-lit" x1="0" x2="0" y1="1" y2="0">
                    <stop stopColor="#49f5d1" />
                    <stop offset="0.55" stopColor="#c8ff5c" />
                    <stop offset="1" stopColor="#ffffff" />
                  </linearGradient>
                  <linearGradient id="growth-muted" x1="0" x2="0" y1="1" y2="0">
                    <stop stopColor="rgba(255,255,255,0.12)" />
                    <stop offset="1" stopColor="rgba(255,255,255,0.24)" />
                  </linearGradient>
                </defs>

                <path
                  d="M50 88 C49 74 50 59 50 44 C50 32 50 22 50 14"
                  fill="none"
                  stroke="url(#growth-lit)"
                  strokeLinecap="round"
                  strokeWidth="2.8"
                  opacity="0.52"
                />
                <path
                  d="M50 88 C49 74 50 59 50 44 C50 32 50 22 50 14"
                  fill="none"
                  stroke="rgba(255,255,255,0.42)"
                  strokeLinecap="round"
                  strokeWidth="0.7"
                  opacity="0.74"
                />

                {growthPaths.map((path) => {
                  const targetSkill = skillById.get(path.targetSkillId);
                  const isLit = targetSkill?.status !== "locked";

                  return (
                    <path
                      d={path.d}
                      fill="none"
                      key={path.targetSkillId}
                      stroke={isLit ? "url(#growth-lit)" : "url(#growth-muted)"}
                      strokeLinecap="round"
                      strokeWidth={isLit ? 1.4 : 0.85}
                      opacity={isLit ? 0.62 : 0.34}
                    />
                  );
                })}
              </svg>

              {growthNodes.map((node) => {
                const skill = skillById.get(node.skillId);
                if (!skill) return null;

                const branch = branchCopy[skill.branch];
                const Icon = skill.status === "locked" ? Lock : branch.Icon;
                const isSelected = selectedSkill?.id === skill.id;
                const sizeClass =
                  node.size === "large"
                    ? "h-16 w-16 sm:h-[72px] sm:w-[72px]"
                    : node.size === "medium"
                      ? "h-12 w-12 sm:h-14 sm:w-14"
                      : "h-10 w-10 sm:h-12 sm:w-12";

                return (
                  <button
                    aria-label={`${skill.title}: ${statusCopy[skill.status]}`}
                    className={[
                      "growth-node pressable absolute z-20 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border outline-none transition focus-visible:ring-2 focus-visible:ring-lime-100/80",
                      sizeClass,
                      nodeStyles[skill.status],
                      isSelected ? "scale-110 ring-2 ring-white/70" : "",
                    ].join(" ")}
                    key={node.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    title={`${skill.title}: ${skill.bonus}`}
                    type="button"
                  >
                    <Icon className={node.size === "large" ? "h-7 w-7" : "h-5 w-5"} />
                    {skill.status === "active" ? (
                      <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full border border-[#071017] bg-cyan-100 text-[#071017] shadow-[0_0_22px_rgba(73,245,209,0.9)]">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    ) : null}
                  </button>
                );
              })}

              <div className="absolute inset-x-0 bottom-2 z-10">
                <div className="mx-auto flex max-w-[245px] flex-wrap justify-center gap-1.5 rounded-full border border-white/12 bg-white/[0.055] px-2 py-2 backdrop-blur-2xl sm:max-w-[420px] sm:gap-2 sm:px-3">
                  {rootPrinciples.map((root) => (
                    <span className="rounded-full bg-white/[0.08] px-2 py-1 text-[0.58rem] font-black uppercase tracking-[0.08em] text-white/48 sm:px-3 sm:text-[0.68rem] sm:tracking-[0.12em]" key={root}>
                      {root}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {selectedSkill ? (
            <div className="mirror-panel mt-3 rounded-[30px] p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className={["text-xs font-black uppercase tracking-[0.18em]", branchCopy[selectedSkill.branch].tone].join(" ")}>
                    {branchCopy[selectedSkill.branch].label}
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-white">{selectedSkill.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">{selectedSkill.description}</p>
                </div>
                <span className="mini-pill w-fit shrink-0 text-lime-100">{statusCopy[selectedSkill.status]}</span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.045] px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-white/38">Требование</p>
                  <p className="mt-1 text-sm font-black text-white/82">{selectedSkill.requirement}</p>
                </div>
                <div className="rounded-[24px] border border-lime-100/18 bg-lime-100/[0.065] px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-lime-100/48">Бонус</p>
                  <p className="mt-1 text-sm font-black text-lime-50">{selectedSkill.bonus}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mirror-panel rounded-[30px] p-4">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-100/20 bg-cyan-100/[0.09] text-cyan-100">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-black text-white">Что формируется сейчас</p>
              <p className="mt-1 text-sm leading-6 text-white/56">
                Главный рост: концентрация и ясность. Командные пассивки добавляют ответственность, а streak удерживает ритм без ощущения перегруза.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  CheckCircle2,
  Flame,
  GitBranch,
  Lock,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import type { CharacterBuild, CharacterStatId, SkillBranch, SkillStatus } from "@/lib/types";

type CharacterProgressionProps = {
  build: CharacterBuild;
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
  }
> = {
  core: { Icon: Flame, label: "Core streak" },
  focus: { Icon: Target, label: "Focus path" },
  squad: { Icon: Users, label: "Squad path" },
};

const statusCopy: Record<SkillStatus, string> = {
  active: "Активно",
  locked: "Закрыто",
  unlocked: "Открыто",
};

const statusStyles: Record<SkillStatus, string> = {
  active: "border-cyan-100/36 bg-cyan-200/[0.08] text-cyan-100",
  locked: "border-white/10 bg-white/[0.035] text-white/42",
  unlocked: "border-lime-200/30 bg-lime-300/[0.08] text-lime-100",
};

export function CharacterProgression({ build }: CharacterProgressionProps) {
  const unlockedSkills = build.skills.filter((skill) => skill.status !== "locked").length;

  return (
    <GlassCard className="overflow-hidden p-5">
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
              {unlockedSkills}/{build.skills.length} perks
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
                Дерево умений
              </p>
              <p className="mt-1 text-sm text-white/50">Каждый тип квеста качает свою ветку персонажа.</p>
            </div>
            <p className="mini-pill w-fit text-lime-100">{build.nextUnlock}</p>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {(["core", "focus", "squad"] as SkillBranch[]).map((branch) => {
              const { Icon, label } = branchStyles[branch];
              const branchSkills = build.skills.filter((skill) => skill.branch === branch);

              return (
                <div className="space-y-3" key={branch}>
                  <div className="flex items-center gap-2 px-1 text-sm font-black text-white/72">
                    <Icon className="h-4 w-4 text-lime-100" />
                    {label}
                  </div>

                  {branchSkills.map((skill) => {
                    const isLocked = skill.status === "locked";
                    const StatusIcon = isLocked ? Lock : skill.status === "active" ? ShieldCheck : CheckCircle2;

                    return (
                      <div
                        className={[
                          "pressable rounded-[22px] border p-3 transition",
                          statusStyles[skill.status],
                          isLocked ? "opacity-78" : "",
                        ].join(" ")}
                        key={skill.id}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-black text-white">{skill.title}</p>
                            <p className="mt-1 text-xs leading-5 text-white/50">{skill.description}</p>
                          </div>
                          <StatusIcon className="h-5 w-5 shrink-0" />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5 text-[0.68rem] font-black leading-4">
                          <span className="rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-white/70">
                            {statusCopy[skill.status]}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-white/58">
                            {skill.requirement}
                          </span>
                          <span className="rounded-full border border-lime-200/18 bg-lime-200/[0.07] px-2.5 py-1 text-lime-100">
                            {skill.bonus}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

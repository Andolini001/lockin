import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type LiquidButtonVariant = "primary" | "secondary" | "ghost";

type LiquidButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  icon?: ReactNode;
  variant?: LiquidButtonVariant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const variantClasses: Record<LiquidButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#47f4d1,#c8ff5c)] text-[#071017] shadow-[0_20px_70px_rgba(73,245,209,0.22)] hover:shadow-[0_26px_90px_rgba(200,255,92,0.26)]",
  secondary:
    "border border-white/15 bg-white/[0.09] text-white hover:bg-white/[0.14] hover:border-cyan-100/30",
  ghost: "text-[var(--text-muted)] hover:bg-white/[0.08] hover:text-white",
};

function classes(variant: LiquidButtonVariant, className: string) {
  return [
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function LiquidButton({
  children,
  className = "",
  href,
  icon,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
}: LiquidButtonProps) {
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (href) {
    return (
      <Link className={classes(variant, className)} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes(variant, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  );
}

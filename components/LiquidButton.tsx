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
    "bg-[linear-gradient(135deg,#55f7d8_0%,#baff58_58%,#ffe485_100%)] text-[#071017] shadow-[0_20px_70px_rgba(73,245,209,0.24),inset_0_1px_0_rgba(255,255,255,0.38)] hover:shadow-[0_28px_96px_rgba(200,255,92,0.28),inset_0_1px_0_rgba(255,255,255,0.42)]",
  secondary:
    "border border-white/16 bg-white/[0.085] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_14px_38px_rgba(0,0,0,0.2)] hover:bg-white/[0.13] hover:border-cyan-100/34",
  ghost: "text-[var(--text-muted)] hover:bg-white/[0.08] hover:text-white",
};

function classes(variant: LiquidButtonVariant, className: string) {
  return [
    "liquid-button pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 disabled:pointer-events-none disabled:opacity-50",
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

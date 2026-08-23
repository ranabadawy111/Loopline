import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

const variants = {
  primary: "bg-charcoal-800 text-paper hover:bg-charcoal-700",
  accent: "bg-coral-500 text-paper hover:bg-coral-600",
  secondary: "bg-transparent text-charcoal-700 border border-charcoal-700/20 hover:bg-charcoal-700/5",
  ghost: "bg-transparent text-charcoal-600 hover:bg-charcoal-700/5",
} as const;

const sizes = {
  sm: "text-xs px-3.5 py-1.5",
  md: "text-sm px-5 py-2.5",
  lg: "text-[15px] px-6 py-3",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: LucideIcon;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={15} strokeWidth={2} />}
      {children}
    </button>
  );
}

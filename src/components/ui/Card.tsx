import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`bg-white/80 border border-charcoal-700/[0.07] rounded-2xl shadow-card ${className}`} {...props}>
      {children}
    </div>
  );
}

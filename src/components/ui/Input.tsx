import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
}

export default function Input({ icon: Icon, label, error, className = "", ...props }: InputProps) {
  return (
    <label className="block">
      {label && (
        <span className="block text-xs font-mono uppercase tracking-[0.08em] text-charcoal-600/70 mb-1.5">
          {label}
        </span>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-600/40" />
        )}
        <input
          className={`w-full bg-white border rounded-xl text-sm placeholder:text-charcoal-600/35 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 transition-shadow ${
            Icon ? "pl-10 pr-4 py-2.5" : "px-4 py-2.5"
          } ${error ? "border-coral-500/60" : "border-charcoal-700/12"} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="block text-xs text-coral-600 mt-1">{error}</span>}
    </label>
  );
}

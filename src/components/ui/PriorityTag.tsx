import type { Priority } from "../../data/types";

const styles: Record<Priority, string> = {
  low: "bg-teal-500/10 text-teal-600 border-teal-500/25",
  medium: "bg-amber-500/10 text-amber-500 border-amber-500/25",
  high: "bg-coral-500/10 text-coral-600 border-coral-500/25",
};

const labels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function PriorityTag({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-mono uppercase tracking-wide ${styles[priority]}`}
    >
      {labels[priority]}
    </span>
  );
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MessageSquare, CalendarDays } from "lucide-react";
import type { Task, Member } from "../../data/types";
import PriorityTag from "../ui/PriorityTag";
import Avatar from "../ui/Avatar";

function formatDueDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(iso: string | null): boolean {
  if (!iso) return false;
  return new Date(iso).getTime() < Date.now();
}

interface TaskCardProps {
  task: Task;
  assignee?: Member;
  onClick: () => void;
}

export default function TaskCard({ task, assignee, onClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(task.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white rounded-xl border border-charcoal-700/[0.07] p-3.5 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-card transition-shadow"
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <PriorityTag priority={task.priority} />
        <Avatar member={assignee} size={22} />
      </div>

      <p className="text-sm text-charcoal-800 leading-snug mb-3">
        {task.title}
      </p>

      <div className="flex items-center gap-3 text-[11px] text-charcoal-600/55 font-mono">
        {task.dueDate && (
          <span
            className={`flex items-center gap-1 ${
              isOverdue(task.dueDate) ? "text-coral-600" : ""
            }`}
          >
            <CalendarDays size={11} />
            {formatDueDate(task.dueDate)}
          </span>
        )}
        {task.commentCount > 0 && (
          <span className="flex items-center gap-1">
            <MessageSquare size={11} />
            {task.commentCount}
          </span>
        )}
      </div>
    </div>
  );
}

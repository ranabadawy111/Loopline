import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import type { Column, Task, Member } from "../../data/types";
import TaskCard from "./TaskCard";

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  members: Member[];
  onTaskClick: (task: Task) => void;
  onAddClick: (columnId: Column["id"]) => void;
}

const dotColors: Record<string, string> = {
  backlog: "bg-charcoal-400",
  "in-progress": "bg-amber-500",
  review: "bg-teal-500",
  done: "bg-coral-500",
};

export default function BoardColumn({
  column,
  tasks,
  members,
  onTaskClick,
  onAddClick,
}: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col w-72 shrink-0">
      <div className="flex items-center justify-between px-1 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColors[column.id]}`} />
          <h3 className="font-display text-sm text-charcoal-800">
            {column.title}
          </h3>
          <span className="text-xs font-mono text-charcoal-600/40">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddClick(column.id)}
          className="text-charcoal-600/40 hover:text-charcoal-800 transition-colors"
          aria-label={`Add task to ${column.title}`}
        >
          <Plus size={16} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 space-y-2.5 rounded-2xl p-2.5 min-h-[120px] transition-colors ${
          isOver ? "bg-coral-500/[0.06]" : "bg-charcoal-700/[0.03]"
        }`}
      >
        <SortableContext
          items={tasks.map((t) => String(t.id))}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={String(task.id)}
              task={task}
              assignee={members.find((m) => m.id === task.assigneeId)}
              onClick={() => onTaskClick(task)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

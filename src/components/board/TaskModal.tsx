import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import type { Task, Priority, ColumnId, Member } from "../../data/types";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null; // null = creating a new task
  defaultColumn: ColumnId;
  members: Member[];
  onSave: (input: {
    id?: string;
    title: string;
    description: string;
    priority: Priority;
    assigneeId: string | null;
    dueDate: string | null;
    columnId: ColumnId;
  }) => void;
  onDelete?: (id: string) => void;
}

export default function TaskModal({
  open,
  onClose,
  task,
  defaultColumn,
  members,
  onSave,
  onDelete,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setAssigneeId(task.assigneeId || "");
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setAssigneeId("");
      setDueDate("");
    }
    setTitleError("");
  }, [task, open]);

  function handleSubmit() {
    if (!title.trim()) {
      setTitleError("Give the task a title before saving.");
      return;
    }
    onSave({
      id: task?.id,
      title: title.trim(),
      description: description.trim(),
      priority,
      assigneeId: assigneeId || null,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      columnId: task?.columnId || defaultColumn,
    });
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={task ? "Edit task" : "New task"}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-[0.08em] text-charcoal-600/70 mb-1.5">
            Title
          </label>
          <input
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError("");
            }}
            placeholder="What needs doing?"
            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 ${
              titleError ? "border-coral-500/60" : "border-charcoal-700/12"
            }`}
          />
          {titleError && (
            <p className="text-xs text-coral-600 mt-1.5">{titleError}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-[0.08em] text-charcoal-600/70 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more detail (optional)"
            className="w-full bg-white border border-charcoal-700/12 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono uppercase tracking-[0.08em] text-charcoal-600/70 mb-1.5">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full bg-white border border-charcoal-700/12 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-[0.08em] text-charcoal-600/70 mb-1.5">
              Assignee
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full bg-white border border-charcoal-700/12 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
            >
              <option value="">Unassigned</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-[0.08em] text-charcoal-600/70 mb-1.5">
            Due date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-white border border-charcoal-700/12 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button variant="accent" className="flex-1" onClick={handleSubmit}>
            {task ? "Save changes" : "Add task"}
          </Button>
          {task && onDelete && (
            <button
              onClick={() => {
                onDelete(task.id);
                onClose();
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-coral-600 hover:bg-coral-500/10 transition-colors shrink-0"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

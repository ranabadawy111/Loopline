import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Search, LogOut } from "lucide-react";
import Skeleton from "../components/ui/Skeleton";
import Input from "../components/ui/Input";
import BoardColumn from "../components/board/BoardColumn";
import TaskCard from "../components/board/TaskCard";
import TaskModal from "../components/board/TaskModal";
import { useGetBoardQuery } from "../services/api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  hydrate,
  moveTask,
  addTask,
  updateTask,
  deleteTask,
  selectAllTasks,
  type NewTaskInput,
} from "../app/boardSlice";
import { logout, selectEmail } from "../app/authSlice";
import { useNavigate } from "react-router-dom";
import type { ColumnId, Task } from "../data/types";

export default function Board() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector(selectEmail);
  const { data, isLoading } = useGetBoardQuery();
  const tasks = useAppSelector(selectAllTasks);

  const [search, setSearch] = useState("");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalColumn, setModalColumn] = useState<ColumnId>("backlog");

  useEffect(() => {
    if (data) dispatch(hydrate(data.tasks));
  }, [data, dispatch]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;
    const s = search.toLowerCase();
    return tasks.filter((t) => t.title.toLowerCase().includes(s));
  }, [tasks, search]);

  function handleDragStart(event: DragStartEvent) {
    const activeId = String(event.active.id);

    const task = tasks.find((t) => String(t.id) === activeId);

    setActiveTask(task || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeTaskItem = tasks.find((t) => String(t.id) === activeId);
    if (!activeTaskItem) return;

    const overColumn = data?.columns.find((c) => String(c.id) === overId)?.id;
    const overTask = tasks.find((t) => String(t.id) === overId);
    const targetColumn = overColumn || overTask?.columnId;

    if (targetColumn && targetColumn !== activeTaskItem.columnId) {
      dispatch(moveTask({ taskId: activeTaskItem.id, toColumn: targetColumn }));
    }
  }
  function openNewTaskModal(columnId: ColumnId) {
    setEditingTask(null);
    setModalColumn(columnId);
    setModalOpen(true);
  }

  function openEditModal(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleSave(input: NewTaskInput & { id?: string }) {
    if (input.id) {
      dispatch(updateTask({ ...input, id: String(input.id) }));
    } else {
      dispatch(addTask(input));
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur-md border-b border-charcoal-700/[0.07]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-charcoal-800 text-paper flex items-center justify-center font-display text-sm">
              L
            </span>
            <span className="font-display text-lg text-charcoal-800">
              Loopline
            </span>
          </div>

          <div className="w-full max-w-xs hidden sm:block">
            <Input
              icon={Search}
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-charcoal-600/50 font-mono hidden md:inline">
              {email}
            </span>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal-600/60 hover:bg-charcoal-700/5 hover:text-charcoal-800 transition-colors"
              aria-label="Log out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-72 h-96 shrink-0" />
            ))}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-5 overflow-x-auto scrollbar-thin pb-4">
              {data?.columns.map((column) => (
                <BoardColumn
                  key={column.id}
                  column={column}
                  tasks={filteredTasks.filter((t) => t.columnId === column.id)}
                  members={data.members}
                  onTaskClick={openEditModal}
                  onAddClick={openNewTaskModal}
                />
              ))}
            </div>

            <DragOverlay>
              {activeTask && (
                <div className="w-72 rotate-2">
                  <TaskCard
                    task={activeTask}
                    assignee={data?.members.find(
                      (m) => m.id === activeTask.assigneeId,
                    )}
                    onClick={() => {}}
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </main>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        task={editingTask}
        defaultColumn={modalColumn}
        members={data?.members || []}
        onSave={handleSave}
        onDelete={(id) => dispatch(deleteTask(id))}
      />
    </div>
  );
}

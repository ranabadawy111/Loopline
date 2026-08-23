import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { Task, ColumnId } from "../data/types";
import { seedTasks } from "../data/mockDb";

interface BoardState {
  tasks: Task[];
  hydrated: boolean;
}

const initialState: BoardState = {
  tasks: [],
  hydrated: false,
};

export interface NewTaskInput {
  title: string;
  description: string;
  priority: Task["priority"];
  assigneeId: string | null;
  dueDate: string | null;
  columnId: ColumnId;
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<Task[]>) {
      if (!state.hydrated) {
        state.tasks = action.payload;
        state.hydrated = true;
      }
    },
    moveTask(
      state,
      action: PayloadAction<{ taskId: string; toColumn: ColumnId }>
    ) {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) task.columnId = action.payload.toColumn;
    },
    addTask(state, action: PayloadAction<NewTaskInput>) {
      state.tasks.unshift({
        id: nanoid(),
        createdAt: new Date().toISOString(),
        commentCount: 0,
        ...action.payload,
      });
    },
    updateTask(state, action: PayloadAction<Partial<Task> & { id: string }>) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) Object.assign(task, action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { hydrate, moveTask, addTask, updateTask, deleteTask } =
  boardSlice.actions;
export default boardSlice.reducer;

export const selectTasksByColumn = (state: { board: BoardState }, columnId: ColumnId) =>
  state.board.tasks.filter((t) => t.columnId === columnId);

export const selectAllTasks = (state: { board: BoardState }) => state.board.tasks;

// Exported standalone so it's testable without a store — see
// src/test/boardSlice.test.ts
export function countTasksByColumn(tasks: Task[], columnId: ColumnId): number {
  return tasks.filter((t) => t.columnId === columnId).length;
}

export { seedTasks };

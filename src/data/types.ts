export type Priority = "low" | "medium" | "high";

export type ColumnId = "backlog" | "in-progress" | "review" | "done";

export interface Member {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Task {
  id: string;
  columnId: ColumnId;
  title: string;
  description: string;
  priority: Priority;
  assigneeId: string | null;
  dueDate: string | null; // ISO date string
  commentCount: number;
  createdAt: string;
}

export interface Column {
  id: ColumnId;
  title: string;
}

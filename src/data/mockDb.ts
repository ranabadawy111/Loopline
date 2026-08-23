import type { Column, Member, Task } from "./types";

export const columns: Column[] = [
  { id: "backlog", title: "Backlog" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export const members: Member[] = [
  { id: "m1", name: "Rana Badawy", initials: "RB", color: "#FF6B4A" },
  { id: "m2", name: "Youssef Adel", initials: "YA", color: "#2AA198" },
  { id: "m3", name: "Salma Nabil", initials: "SN", color: "#D9A233" },
  { id: "m4", name: "Karim Fathy", initials: "KF", color: "#6D7BD9" },
];

function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

export const seedTasks: Task[] = [
  {
    id: "t1",
    columnId: "backlog",
    title: "Design empty states for the reports page",
    description: "Cover no-data, loading, and error variants for the new analytics tab.",
    priority: "medium",
    assigneeId: "m3",
    dueDate: daysFromNow(6),
    commentCount: 2,
    createdAt: daysFromNow(-4),
  },
  {
    id: "t2",
    columnId: "backlog",
    title: "Audit color contrast across dark mode",
    description: "WCAG AA check on all text/background pairs in the dashboard.",
    priority: "low",
    assigneeId: null,
    dueDate: null,
    commentCount: 0,
    createdAt: daysFromNow(-2),
  },
  {
    id: "t3",
    columnId: "in-progress",
    title: "Wire up RTK Query for the invoices table",
    description: "Replace the mocked fetch with createApi, add cache tags for row updates.",
    priority: "high",
    assigneeId: "m1",
    dueDate: daysFromNow(2),
    commentCount: 5,
    createdAt: daysFromNow(-6),
  },
  {
    id: "t4",
    columnId: "in-progress",
    title: "Build the mobile nav drawer",
    description: "Slide-in menu for screens under 768px, with focus trap.",
    priority: "medium",
    assigneeId: "m4",
    dueDate: daysFromNow(4),
    commentCount: 1,
    createdAt: daysFromNow(-3),
  },
  {
    id: "t5",
    columnId: "review",
    title: "PR #482 — refactor useDebounce hook",
    description: "Needs a second reviewer before merge. Tests already passing.",
    priority: "medium",
    assigneeId: "m2",
    dueDate: daysFromNow(1),
    commentCount: 3,
    createdAt: daysFromNow(-5),
  },
  {
    id: "t6",
    columnId: "done",
    title: "Ship the onboarding checklist widget",
    description: "Deployed behind a feature flag, rolling out to 10% of accounts.",
    priority: "low",
    assigneeId: "m1",
    dueDate: null,
    commentCount: 4,
    createdAt: daysFromNow(-9),
  },
  {
    id: "t7",
    columnId: "done",
    title: "Fix Safari flexbox gap fallback",
    description: "Older Safari versions were dropping the gap on the card grid.",
    priority: "high",
    assigneeId: "m4",
    dueDate: null,
    commentCount: 0,
    createdAt: daysFromNow(-11),
  },
];

export function findMember(id: string | null): Member | undefined {
  if (!id) return undefined;
  return members.find((m) => m.id === id);
}

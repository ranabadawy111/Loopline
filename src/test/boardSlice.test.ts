import { describe, it, expect } from "vitest";
import boardReducer, {
  hydrate,
  moveTask,
  addTask,
  updateTask,
  deleteTask,
  countTasksByColumn,
} from "../app/boardSlice";
import type { Task } from "../data/types";

const sampleTasks: Task[] = [
  {
    id: "t1",
    columnId: "backlog",
    title: "Write onboarding docs",
    description: "",
    priority: "medium",
    assigneeId: null,
    dueDate: null,
    commentCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t2",
    columnId: "in-progress",
    title: "Fix flaky test",
    description: "",
    priority: "high",
    assigneeId: "m1",
    dueDate: null,
    commentCount: 2,
    createdAt: new Date().toISOString(),
  },
];

describe("boardSlice reducer", () => {
  it("hydrates tasks only once", () => {
    let state = boardReducer(undefined, hydrate(sampleTasks));
    expect(state.tasks).toHaveLength(2);
    expect(state.hydrated).toBe(true);

    // A second hydrate call should be a no-op, the same way a
    // real app shouldn't clobber local edits with a stale refetch.
    state = boardReducer(state, hydrate([]));
    expect(state.tasks).toHaveLength(2);
  });

  it("moves a task to a different column", () => {
    const initial = boardReducer(undefined, hydrate(sampleTasks));
    const next = boardReducer(
      initial,
      moveTask({ taskId: "t1", toColumn: "done" })
    );
    const moved = next.tasks.find((t) => t.id === "t1");
    expect(moved?.columnId).toBe("done");
  });

  it("adds a new task to the front of the list", () => {
    const initial = boardReducer(undefined, hydrate(sampleTasks));
    const next = boardReducer(
      initial,
      addTask({
        title: "New task",
        description: "",
        priority: "low",
        assigneeId: null,
        dueDate: null,
        columnId: "backlog",
      })
    );
    expect(next.tasks).toHaveLength(3);
    expect(next.tasks[0].title).toBe("New task");
  });

  it("updates an existing task's fields", () => {
    const initial = boardReducer(undefined, hydrate(sampleTasks));
    const next = boardReducer(
      initial,
      updateTask({ id: "t2", priority: "low", title: "Fix flaky test (retry)" })
    );
    const updated = next.tasks.find((t) => t.id === "t2");
    expect(updated?.priority).toBe("low");
    expect(updated?.title).toBe("Fix flaky test (retry)");
  });

  it("deletes a task", () => {
    const initial = boardReducer(undefined, hydrate(sampleTasks));
    const next = boardReducer(initial, deleteTask("t1"));
    expect(next.tasks).toHaveLength(1);
    expect(next.tasks.find((t) => t.id === "t1")).toBeUndefined();
  });
});

describe("countTasksByColumn", () => {
  it("counts only tasks in the given column", () => {
    expect(countTasksByColumn(sampleTasks, "backlog")).toBe(1);
    expect(countTasksByColumn(sampleTasks, "in-progress")).toBe(1);
    expect(countTasksByColumn(sampleTasks, "done")).toBe(0);
  });
});

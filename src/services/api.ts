import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { seedTasks, members, columns } from "../data/mockDb";
import type { Task, Member, Column } from "../data/types";

interface BoardResponse {
  columns: Column[];
  members: Member[];
  tasks: Task[];
}

// Simulated latency so the board shows a real loading state on
// first load, the same way it would against a live API.
export const api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getBoard: builder.query<BoardResponse, void>({
      async queryFn() {
        await new Promise((res) => setTimeout(res, 550));
        return { data: { columns, members, tasks: seedTasks } };
      },
    }),
  }),
});

export const { useGetBoardQuery } = api;

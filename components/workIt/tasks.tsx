"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Tasks() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks?.map((task, idx) => <li key={idx}>{JSON.stringify(task)}</li>)}
      </ul>
    </div>
  );
}

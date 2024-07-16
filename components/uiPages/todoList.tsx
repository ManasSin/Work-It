"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import Task from "../uiElements/task";

type Props = {};

const TodoList = (props: Props) => {
  const todos = useQuery(api.todos.get) ?? [];
  const completdTodos = useQuery(api.todos.CompletedTodos) ?? [];
  const inCompleteTodos = useQuery(api.todos.inCompleteTodos) ?? [];

  if (
    todos === undefined ||
    completdTodos === undefined ||
    inCompleteTodos === undefined
  ) {
    <p>Loading...</p>;
  }

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col items-center gap-2">
          {inCompleteTodos?.map((task, idx) => (
            <Task {...task} key={task._id} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          {completdTodos?.map((task, idx) => <Task {...task} key={task._id} />)}
        </div>
      </div>
    </div>
  );
};

export default TodoList;

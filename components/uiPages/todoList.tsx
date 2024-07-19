"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import Task from "../uiElements/task";
import Todos from "../uiElements/todos";
import CompletedTodos from "../uiElements/completedTodos";
import { AddTaskWrapper } from "../uiElements/AddTask/AddTaskButton";

type Props = {};

const TodoList = (props: Props) => {
  const todos = useQuery(api.todos.get) ?? [];
  const completedTodos = useQuery(api.todos.CompletedTodos) ?? [];
  const inCompleteTodos = useQuery(api.todos.inCompleteTodos) ?? [];
  const totalTodos = useQuery(api.todos.totalTodos) ?? 0;

  if (
    todos === undefined ||
    completedTodos === undefined ||
    inCompleteTodos === undefined
  ) {
    <p>Loading...</p>;
  }
  return (
    // <div className="flex justify-center w-full">
    <div className="w-[90%] max-w-[1480px] mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <Todos items={inCompleteTodos} />
      </div>
      <AddTaskWrapper />
      <div className="flex flex-col gap-1 py-4">
        <Todos items={completedTodos} />
      </div>
      <CompletedTodos totalTodos={totalTodos as number} />
    </div>
    // </div>
  );
};

export default TodoList;

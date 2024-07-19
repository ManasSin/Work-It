import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import TaskPro from "./taskPro";
// import { useToast } from "../ui/use-toast";

export default function Todos({ items }: { items: Array<Doc<"todos">> }) {
  const checkATodo = useMutation(api.todos.checkATodo);
  const unCheckATodo = useMutation(api.todos.unCheckATodo);

  const handleOnChangeTodo = (task: Doc<"todos">) => {
    if (task.isCompleted) {
      unCheckATodo({ taskId: task._id });
    } else {
      checkATodo({ taskId: task._id });
    }
  };
  if (!items) {
    return (
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm">No tasks</p>
      </div>
    );
  }
  return items?.map((task: Doc<"todos">, idx: number) => (
    <TaskPro
      key={task._id}
      data={task}
      isCompleted={task.isCompleted}
      handleOnChange={() => handleOnChangeTodo(task)}
    />
  ));
}

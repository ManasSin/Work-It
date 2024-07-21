"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AddTaskWrapper } from "@/components/uiElements/AddTask/AddTaskButton";
import { Dot } from "lucide-react";
import moment from "moment";
import Todos from "../uiElements/todos";
import TotalTodos from "../uiElements/totalTodos";

export default function Upcoming() {
  const groupTodosByDate = useQuery(api.todos.groupTodosByDate) ?? [];
  const overdueTodos = useQuery(api.todos.overdueTodos) ?? [];
  console.log(groupTodosByDate);

  //   if (todos === undefined || groupedTodosByDate === undefined) {
  //     return <p>Loading...</p>;
  //   }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Upcoming</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm">Overdue</p>
        <Todos items={overdueTodos} />
        <div className="py-3">
          <TotalTodos totalTodos={Object.keys(overdueTodos).length} />
        </div>
      </div>

      <div className="flex flex-col gap-1 py-4">
        {Object.keys(groupTodosByDate).length > 0 ? (
          Object.keys(groupTodosByDate || {}).map((dueDate) => {
            return (
              <div key={dueDate} className="mb-6">
                <p className="font-bold flex text-sm items-center">
                  {moment(dueDate).format("LL")} <Dot />
                  {moment(dueDate).format("dddd")}
                </p>
                <ul className="py-4">
                  <Todos items={groupTodosByDate[dueDate]} />
                </ul>
              </div>
            );
          })
        ) : (
          <div className="mb-6">
            <p className="font-bold flex text-sm items-center">
              {moment(new Date()).format("LL")} <Dot />
              {moment(new Date()).format("dddd")}
            </p>
            <ul>
              <p className="text-sm font-medium text-black/50 dark:text-white/50 py-4 mx-3">
                No upcoming tasks
              </p>
            </ul>
          </div>
        )}
        <div className="pb-6">
          <AddTaskWrapper />
        </div>
      </div>
    </div>
  );
}

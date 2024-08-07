"use client";

import MobileNav from "@/components/nav/mobileNav";
import { Sidebar } from "@/components/nav/sideBar";
import { AddTaskWrapper } from "@/components/uiElements/AddTask/AddTaskButton";
import SuggestMissingTasks from "@/components/uiElements/AddTask/SuggestTask";
import CompletedTodos from "@/components/uiElements/completedTodos";
import DeleteProject from "@/components/uiElements/DeleteAProject/DeleteProject";
import Todos from "@/components/uiElements/todos";
import TotalTodos from "@/components/uiElements/totalTodos";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
// @ts-ignore
import { useParams } from "next/navigation";

export default function ProjectIdPage() {
  const { projectId } = useParams<{ projectId: Id<"projects"> }>();

  const inCompletedTodosByProject =
    useQuery(api.todos.getInCompleteTodosByProjectId, {
      projectId,
    }) ?? [];
  const completedTodosByProject =
    useQuery(api.todos.getCompletedTodosByProjectId, {
      projectId,
    }) ?? [];

  const project = useQuery(api.projects.getProjectByProjectId, {
    projectId,
  });
  const projectTodosTotal = useQuery(api.todos.getTodosTotalByProjectId, {
    projectId,
  });

  // @ts-ignore
  const projectName = project?.name || "";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav navTitle={"My Projects"} navLink="/loggedin/projects" />
        <main className="flex flex-1 flex-col gap-2 p-2 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-2 lg:gap-0">
            <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
            <div className="flex gap-6 lg:gap-12 items-center">
              <SuggestMissingTasks projectId={projectId} />
              <DeleteProject projectId={projectId} />
            </div>
          </div>
          <Todos items={inCompletedTodosByProject} />
          <TotalTodos totalTodos={inCompletedTodosByProject.length} />

          <div className="pb-6">
            <AddTaskWrapper projectId={projectId} />
          </div>

          <Todos items={completedTodosByProject} />
          <div className="flex items-center space-x-4 gap-2 border-b-2 p-2 border-gray-100 text-sm text-foreground/80">
            <CompletedTodos totalTodos={projectTodosTotal as number} />
          </div>
        </main>
      </div>
    </div>
  );
}

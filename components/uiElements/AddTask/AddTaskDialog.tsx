import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, ChevronDown, Flag, Hash, Tag } from "lucide-react";
import { format } from "date-fns";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import TaskPro from "../taskPro";
import { AddTaskWrapper } from "./AddTaskButton";
import SuggestMissingTasks from "./SuggestTask";
import DeleteProject from "../DeleteAProject/DeleteProject";
import TotalTodos from "../totalTodos";

export default function AddTaskDialog({ data }: { data: Doc<"todos"> }) {
  const { taskName, description, projectId, labelId, priority, dueDate, _id } =
    data;
  const project = useQuery(api.projects.getProjectByProjectId, { projectId });
  const label = useQuery(api.labels.getLabelByLabelId, { labelId });

  const inCompletedSubtodosByProject =
    useQuery(api.subTodos.inCompleteSubTodos, { parentId: _id }) ?? [];

  const completedSubtodosByProject =
    useQuery(api.subTodos.completedSubTodos, { parentId: _id }) ?? [];

  const checkASubTodoMutation = useMutation(api.subTodos.checkASubTodo);
  const unCheckASubTodoMutation = useMutation(api.subTodos.unCheckASubTodo);
  const getTaskByProjectId = useQuery(api.todos.getTodosByProjectId, {
    projectId: projectId,
  });

  const [todoDetails, setTodoDetails] = useState<
    Array<{ labelName: string; value: string; icon: React.ReactNode }>
  >([]);

  useEffect(() => {
    const data = [
      {
        labelName: "Project",
        // @ts-ignore
        value: project?.name || "",
        icon: <Hash className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Due date",
        // @ts-ignore
        value: format(dueDate || new Date(), "MMM dd yyyy"),
        icon: <Calendar className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Priority",
        // @ts-ignore
        value: priority?.toString() || "",
        icon: <Flag className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Label",
        // @ts-ignore
        value: label?.name || "",
        icon: <Tag className="w-4 h-4 text-primary capitalize" />,
      },
    ];
    if (data) {
      setTodoDetails(data);
    }
    // @ts-ignore
  }, [dueDate, label?.name, priority, project]);

  return (
    <DialogContent className="max-w-4xl lg:h-fit flex flex-col md:flex-row lg:justify-between text-right h-fit overflow-auto transition-transform scroll-smooth">
      <DialogHeader className="w-full grow">
        <DialogTitle>{taskName}</DialogTitle>
        <DialogDescription>
          <p className="my-2 capitalize">{description}</p>
          <div className="flex items-center gap-1 mt-12 border-b-2 border-gray-100 pb-2 flex-wrap justify-between lg:gap-0 ">
            <div className="flex gap-1">
              <ChevronDown className="w-5 h-5 text-primary" />
              <p className="font-bold flex text-sm text-gray-900 dark:text-white/70">
                Sub-tasks
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div>
                <SuggestMissingTasks
                  projectId={projectId}
                  taskName={taskName}
                  description={description}
                  parentId={_id}
                  isSubTask={true}
                />
              </div>
              <DeleteProject
                projectId={projectId}
                taskId={
                  getTaskByProjectId &&
                  (getTaskByProjectId[0]._id as Id<"todos">)
                }
              />
            </div>
          </div>
          <div className="pl-4">
            {inCompletedSubtodosByProject.map((task) => {
              return (
                <TaskPro
                  key={task._id}
                  data={task}
                  isCompleted={task.isCompleted}
                  handleOnChange={() =>
                    checkASubTodoMutation({ taskId: task._id })
                  }
                />
              );
            })}
            <div className="pb-4">
              <TotalTodos totalTodos={inCompletedSubtodosByProject.length} />
            </div>
            <div className="pb-4">
              <AddTaskWrapper parentTask={data} />
            </div>
            {completedSubtodosByProject.map((task) => {
              return (
                <TaskPro
                  key={task._id}
                  data={task}
                  isCompleted={task.isCompleted}
                  handleOnChange={() =>
                    unCheckASubTodoMutation({ taskId: task._id })
                  }
                />
              );
            })}
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 bg-gray-100 md:w-1/2">
        {todoDetails.map(({ labelName, value, icon }, idx) => (
          <div
            key={`${value}-${idx}`}
            className="grid gap-2 p-4 border-b-2 w-full"
          >
            <Label className="dark:text-black/80 flex items-start">
              {labelName}
            </Label>
            <div className="dark:text-black/80 flex text-left items-center justify-start gap-2 pb-2">
              {icon}
              <p className="text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
}

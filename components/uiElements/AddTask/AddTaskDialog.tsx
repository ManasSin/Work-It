import { Doc } from "@/convex/_generated/dataModel";
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

export default function AddTaskDialog({ data }: { data: Doc<"todos"> }) {
  const { taskName, description, projectId, labelId, priority, dueDate, _id } =
    data;

  const project = useQuery(api.projects.getProjectByProjectId, { projectId });
  const label = useQuery(api.labels.getLabelByLabelId, { labelId });

  // console.log({ project });

  const [todoDetails, setTodoDetails] = useState<
    Array<{ labelName: string; value: string; icon: React.ReactNode }>
  >([]);

  const inCompleteSubsubTodosByProject = useQuery(
    api.subTodos.inCompleteSubTodos ?? []
  );

  const CompleteSubsubTodosByProject = useQuery(
    api.subTodos.completedSubTodos ?? []
  );

  const checkASubTodoMutation = useMutation(api.subTodos.checkASubTodo);
  const unCheckASubTodoMutation = useMutation(api.subTodos.unCheckASubTodo);

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
    <DialogContent className="max-w-4xl lg:h-4/6 flex flex-col md:flex-row lg:justify-between text-right">
      <DialogHeader className="md:w-2/3">
        <DialogTitle>{taskName}</DialogTitle>
        <DialogDescription>
          <p className="my-2 capitalize">{description}</p>
          <div className="flex items-center gap-1 mt-12 border-2 border-gray-100 pb-2 flex-wrap justify-between lg:gap-0">
            <div className="flex gap-1">
              <ChevronDown className="w-5 h-5 text-primary" />
              <p className="text-sm font-bold flex text-gray-900 dark:text-white/80 ">
                Sub tasks
              </p>
            </div>
            <div className="">
              <Button variant={"outline"}>Suggest missing tasks AI</Button>
            </div>
          </div>
          <div className="pl-4">
            {inCompleteSubsubTodosByProject?.map((task, idx) => {
              return (
                <TaskPro
                  isCompleted={task.isCompleted}
                  data={task}
                  showDetails={true}
                  handleOnChange={() =>
                    checkASubTodoMutation({ taskId: task._id })
                  }
                />
              );
            })}

            <div className="pb-4">
              <AddTaskWrapper parentTask={data} />
            </div>

            {CompleteSubsubTodosByProject?.map((task, idx) => {
              return (
                <TaskPro
                  isCompleted={task.isCompleted}
                  data={task}
                  showDetails={true}
                  handleOnChange={() =>
                    unCheckASubTodoMutation({ taskId: task._id })
                  }
                />
              );
            })}
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 bg-gray-100 md:w-1/3 ">
        {todoDetails.map(({ labelName, value, icon }, idx) => (
          <div
            key={`${value}-${idx}`}
            className="grid gap-2 p-4 border-b-2 w-full"
          >
            <Label className="flex items-start text-black/90">
              {labelName}
            </Label>
            <div className="flex text-left items-center text-black/60 justify-start gap-2 pb-2">
              {icon}
              <p className="text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
}
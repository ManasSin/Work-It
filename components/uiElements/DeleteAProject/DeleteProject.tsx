import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import { EllipsisIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Id } from "@/convex/_generated/dataModel";
import { GET_STARTED_PROJECT_ID } from "@/utils";
import { cn } from "@/lib/utils";

export default function DeleteProject({
  projectId,
  taskId,
}: {
  projectId: Id<"projects">;
  taskId?: Id<"todos">;
}) {
  const form = useForm({ defaultValues: { name: "" } });
  const { toast } = useToast();
  const router = useRouter();

  const deleteProject = useAction(api.projects.deleteProjectAndItsTasks);
  const deleteTask = useMutation(api.todos.deleteATodo);

  const onSubmit = async () => {
    if (taskId) {
      try {
        const deleteTaskId = await deleteTask({ taskId });
        if (deleteTaskId !== undefined) {
          toast({
            title: "🗑️ Successfully Deleted A Task",
            duration: 3000,
          });
          router.push(`/loggedin/projects/${projectId.toString()}`);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong with deletion of this task.",
          duration: 3000,
        });
      }
    } else {
      if (projectId === GET_STARTED_PROJECT_ID) {
        toast({
          title: "🤗 Just a reminder",
          description: "System projects are protected from deletion.",
          duration: 3000,
        });
      } else {
        const deleteTaskId = await deleteProject({ projectId });

        if (deleteTaskId !== undefined) {
          toast({
            title: "🗑️ Successfully Deleted a project",
            duration: 3000,
          });
          router.push(`/loggedin/projects`);
        }
      }
    }
  };

  return (
    <div className={cn(taskId ? "mt-3 grow-0 w-7 h-full px-2 " : "")}>
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full w-full">
          <EllipsisIcon className="w-5 h-5 text-foreground hover:cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="w-40 lg:w-56">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <button type="submit" className="flex gap-2">
                <Trash2 className="w-5 h-5 rotate-45 text-foreground/40" />
                {taskId ? "Delete Task" : "Delete Project"}
              </button>
            </form>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

"use client";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";

export default function AddProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger id="closeDialog">
        <PlusIcon className="h-5 w-5" aria-label="Add a Project" />
      </DialogTrigger>
      <AddProjectDialogContent />
    </Dialog>
  );
}

function AddProjectDialogContent() {
  const form = useForm({ defaultValues: { name: "", description: "" } });
  const { toast } = useToast();
  const router = useRouter();

  const createAProject = useMutation(api.projects.createAProject);

  const onSubmit = async ({ name, description }: any) => {
    // console.log("submitted", { name, description });

    const projectId = await createAProject({ name, description });

    if (projectId !== undefined) {
      toast({
        title: "🚀 Successfully created a project!",
        duration: 3000,
      });
      form.reset({ name: "" });
      router.push(`/loggedin/projects/${projectId}`);
    }
  };
  return (
    <DialogContent className="max-w-xl lg:h-fit flex flex-col md:flex-row lg:justify-between text-right">
      <DialogHeader className="w-full">
        <DialogTitle>Add a Project</DialogTitle>
        <DialogDescription className="capitalize">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 border-2 p-6 border-gray-200 my-2 rounded-sm border-foreground/20"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Project name"
                        required
                        className="border-0 font-semibold text-lg"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        type="text"
                        placeholder="Project description"
                        required
                        className="border-0 font-semibold text-lg"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button className="">Add</Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}

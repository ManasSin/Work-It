import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import React, { useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function SuggestMissingTasks({
  projectId,
  taskName = "",
  description = "",
  parentId,
  isSubTask = false,
}: {
  projectId: Id<"projects">;
  taskName?: string;
  description?: string;
  parentId?: Id<"todos">;
  isSubTask?: boolean;
}) {
  const { toast } = useToast();
  const [isLoadingSuggestMissingTasks, setIsLoadingSuggestMissingTasks] =
    useState(false);

  const [suggestAiTaskResponse, setSuggestAiTaskResponse] =
    useState<string>("");

  const suggestMissingTasks =
    useAction(api.openai.suggestMissingItemsWithAi) || [];

  const suggestMissingSubTasks =
    useAction(api.openai.suggestMissingSubItemsWithAi) || [];

  const handleMissingTasks = async () => {
    setIsLoadingSuggestMissingTasks(true);
    try {
      if (parentId) {
        await suggestMissingSubTasks({
          projectId,
          taskName,
          description,
          parentId,
        });
      }
    } catch (error) {
      console.log("Error in suggestMissingTasks", error);
      setSuggestAiTaskResponse(
        "My openAI credit limit must be exhausted, Sorry for the poor experience"
      );
      toast({
        title:
          "My openAI credit limit must be exhausted, Sorry for the poor experience",
        description: "Please mail me for reminder",
      });
    } finally {
      setIsLoadingSuggestMissingTasks(false);
    }
  };

  const handleMissingSubTasks = async () => {
    setIsLoadingSuggestMissingTasks(true);
    try {
      if (parentId) {
        await suggestMissingSubTasks({
          projectId,
          parentId,
          taskName,
          description,
        });
      }
    } catch (error) {
      console.log("Error in suggestMissingTasks", error);
      setSuggestAiTaskResponse(
        "My openAI credit limit must be exhausted, Sorry for the poor experience"
      );
      toast({
        title:
          "My openAI credit limit must be exhausted, Sorry for the poor experience",
        description: "Please mail me for reminder",
      });
    } finally {
      setIsLoadingSuggestMissingTasks(false);
    }
  };

  return (
    <>
      <Button
        variant={"outline"}
        disabled={isLoadingSuggestMissingTasks}
        onClick={isSubTask ? handleMissingTasks : handleMissingSubTasks}
      >
        {isLoadingSuggestMissingTasks ? (
          <div className="flex gap-2">
            Loading Tasks (AI)
            <Loader className="h-5 w-5 text-primary" />
          </div>
        ) : (
          "Suggest Missing Tasks (AI) 💖"
        )}
      </Button>
    </>
  );
}

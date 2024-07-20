import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import React, { useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function SuggestMissingTasks({
  projectId,
}: {
  projectId: Id<"projects">;
}) {
  const { toast } = useToast();
  const [isLoadingSuggestMissingTasks, setIsLoadingSuggestMissingTasks] =
    useState(false);

  const [suggestAiTaskResponse, setSuggestAiTaskResponse] =
    useState<string>("");

  const suggestMissingTasks =
    useAction(api.openai.suggestMissingItemsWithAi, { projectId }) || [];

  const handleMissingTasks = async () => {
    setIsLoadingSuggestMissingTasks(true);
    try {
      await suggestMissingTasks({ projectId });
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
        onClick={handleMissingTasks}
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
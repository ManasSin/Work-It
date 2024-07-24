import { GoogleGenerativeAI } from "@google/generative-ai";
import { Id } from "./_generated/dataModel";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY!);

export const suggestMissingItemsWithAi = action({
  args: {
    projectId: v.id("projects"),
  },

  handler: async (
    ctx: any,
    {
      projectId,
    }: {
      projectId: Id<"projects">;
    }
  ) => {
    const modal = genAi.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const todos = await ctx.runQuery(api.todos.getTodosByProjectId, {
      projectId,
    });

    const projects = await ctx.runQuery(api.projects.getProjectByProjectId, {
      projectId,
    });
    const requestbody = JSON.stringify({
      ...todos,
    });

    //@ts-ignore
    const projectName = projects?.name || "";
    // @ts-ignore
    const projectDescription = projects?.description || "";

    const prompt = `use this as context, 
    the project name is ${projectName},
    the project description is ${projectDescription},
    all the previous sub todos and the parent todo is ${requestbody}
    I'm a project manager and I need help identifying missing to-do items. I have a list of existing tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify additional to-do items that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions.Let the number of todos be more then one if needed but try not to make it too large, by limiting the number to five todos. for the context of the existing to-dos, use this list of todos as reference: ${JSON.stringify(todos)}.`;

    const response = await modal.generateContent(prompt);
    const text = response?.response.text();
    // console.log({ "from project page": text });

    if (text) {
      const items = JSON.parse(text)?.todos ?? [];
      const AI_LABEL_ID = "jx747k6cpsn5b4a4saz43y62796x9t07";

      for (let i = 0; i < items.length; i++) {
        const { taskName, description } = items[i];
        const embedding = await getEmbeddingsWithAI(taskName);
        await ctx.runMutation(api.todos.createATodo, {
          taskName,
          description,
          priority: 1,
          dueDate: new Date().getTime(),
          projectId,
          labelId: AI_LABEL_ID as Id<"labels">,
          embedding,
        });
      }
    }
    // await getEmbeddingsWithAI(text);
  },
});

export const suggestMissingSubItemsWithAi = action({
  args: {
    projectId: v.id("projects"),
    parentId: v.id("todos"),
    taskName: v.optional(v.string()),
    description: v.optional(v.string()),
  },

  handler: async (
    ctx: any,
    {
      projectId,
      parentId,
      taskName,
      description,
    }: {
      projectId: Id<"projects">;
      parentId: Id<"todos">;
      taskName?: string;
      description?: string;
    }
  ) => {
    const modal = genAi.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const todos = await ctx.runQuery(api.subTodos.getSubTodosByParentId, {
      parentId,
    });

    const projects = await ctx.runQuery(api.projects.getProjectByProjectId, {
      projectId,
    });
    const requestbody = JSON.stringify({
      ...todos,
      ...{ parentTodo: { taskName, description } },
    });

    //@ts-ignore
    const projectName = projects?.name || "";

    const prompt = `use this as context, 
    the project name is ${projectName},
    all the previous sub todos and the parent todo is ${requestbody}
    . I'm a project manager and I need help identifying missing sub tasks for a parent todo. I have a list of existing sub tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 2 additional sub tasks that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions.`;

    // @ts-ignore

    const response = await modal.generateContent(prompt);

    // console.log(response);

    const messageContent = response?.response.text();

    // console.log({ "from subtodo": messageContent });

    // create the todos
    if (messageContent) {
      const items = JSON.parse(messageContent)?.todos ?? [];
      const AI_LABEL_ID = "jx747k6cpsn5b4a4saz43y62796x9t07";

      for (let i = 0; i < items.length; i++) {
        const { taskName, description } = items[i];
        const embedding = await getEmbeddingsWithAI(taskName);
        await ctx.runMutation(api.subTodos.createASubTodo, {
          taskName,
          description,
          priority: 1,
          dueDate: new Date().getTime(),
          projectId,
          labelId: AI_LABEL_ID as Id<"labels">,
          embedding,
          parentId,
        });
      }
    }

    // await getEmbeddingsWithAI(todos[0].taskName);
  },
});

export async function getEmbeddingsWithAI(searchText: string) {
  if (!genAi) {
    throw new Error("genAi key is not defined");
  }

  const model = genAi.getGenerativeModel({
    model: "text-embedding-004",
    generationConfig: { responseMimeType: "application/json" },
  });

  // const responseText = "The quick brown fox jumps over the lazy dog.";

  const result = await model.embedContent(searchText);
  // if (!result) {
  //   throw new Error("no result");
  // }
  const embedding = result.embedding;
  // console.log(embedding.values);
  return embedding ? embedding.values : undefined;
}

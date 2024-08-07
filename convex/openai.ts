import { v } from "convex/values";
import { api } from "./_generated/api";
import { action } from "./_generated/server";

import OpenAI from "openai";
import { Id } from "./_generated/dataModel";

const apiKey = process.env.OPEN_AI_KEY;
// const openai = new OpenAI({ apiKey });
const openai = new OpenAI({
  apiKey: "anykey",
  baseURL: "http://localhost:3040/vi",
});

export const suggestMissingItemsWithAi = action({
  args: {
    projectId: v.id("projects"),
  },

  handler: async (ctx, { projectId }) => {
    const todos = await ctx.runQuery(api.todos.getTodosByProjectId, {
      projectId,
    });

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "I'm a project manager and I need help identifying missing to-do items. I have a list of existing tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 1 additional to-do items that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions.",
        },
        {
          role: "user",
          content: JSON.stringify(todos),
        },
      ],
      response_format: {
        type: "json_object",
      },
      model: "gpt-3.5-turbo",
    });

    // console.log(response);

    const messageContent = response.choices[0].message?.content;

    // console.log({ messageContent });

    //create the todos
    if (messageContent) {
      const items = JSON.parse(messageContent)?.todos ?? [];
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
  },
});
export const suggestMissingSubItemsWithAi = action({
  args: {
    projectId: v.id("projects"),
    parentId: v.id("todos"),
    taskName: v.optional(v.string()),
    description: v.optional(v.string()),
  },

  handler: async (ctx, { projectId, parentId, taskName, description }) => {
    const todos = await ctx.runQuery(api.subTodos.getSubTodosByParentId, {
      parentId,
    });

    const projects = await ctx.runQuery(api.projects.getProjectByProjectId, {
      projectId,
    });

    // @ts-ignore
    const projectName = projects?.name || "";

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "I'm a project manager and I need help identifying missing sub tasks for a parent todo. I have a list of existing sub tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 2 additional sub tasks that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions.",
        },
        {
          role: "user",
          content: JSON.stringify(
            todos,
            projectName,
            // @ts-expect-error
            ...{ parentTodo: { taskName, description } }
          ),
        },
      ],
      response_format: {
        type: "json_object",
      },
      model: "gpt-3.5-turbo",
    });

    // console.log(response);

    const messageContent = response.choices[0].message?.content;

    // console.log({ messageContent });s

    //create the todos
    if (messageContent) {
      const items = JSON.parse(messageContent)?.todos ?? [];
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
  },
});

export const getEmbeddingsWithAI = async (searchText: string) => {
  if (!apiKey) {
    throw new Error("Open AI Key is not defined");
  }

  const req = {
    input: searchText,
    model: "text-embedding-ada-002",
    encoding_format: "float",
  };

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`OpenAI Error, ${msg}`);
  }

  const json = await response.json();
  const vector = json["data"][0]["embedding"];

  // console.log(`Embedding of ${searchText}: , ${vector.length} dimensions`);

  return vector;
};

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { handleUserID } from "./auth";

export const checkASubTodo = mutation({
  args: { taskId: v.id("subTodos") },
  handler: async (ctx, { taskId }) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const unCheckASubTodo = mutation({
  args: { taskId: v.id("subTodos") },
  handler: async (ctx, { taskId }) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

export const completedSubTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);
    if (userId) {
      const subTodos = await ctx.db
        .query("subTodos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();

      return subTodos;
    }
    return [];
  },
});

export const inCompleteSubTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);
    // if (userId) {
    const todos = await ctx.db
      .query("subTodos")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
    return todos;
    // }
    // return [];
  },
});

export const createASubTodo = mutation({
  args: {
    parentId: v.id("todos"),
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },
  handler: async (
    ctx,
    { parentId, taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    try {
      const newTaskId = await ctx.db.insert("subTodos", {
        userId: userId,
        parentId,
        taskName,
        description,
        priority,
        dueDate,
        projectId,
        labelId,
        isCompleted: false,
      });
      console.log({ "new task id is": newTaskId });
      return newTaskId;
    } catch (err) {
      console.log("Error occurred during createATodo mutation", err);

      return "";
    }
  },
});

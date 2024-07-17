import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { handleUserID } from "./auth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});

export const CompletedTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
  },
});

export const inCompleteTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
  },
});

export const totalTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    const todos = await ctx.db.query("todos").collect();
    return todos.length || 0;
    return 0;
  },
});

export const createATodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    try {
      const newTaskId = await ctx.db.insert("todos", {
        userId: userId,
        taskName,
        description,
        priority,
        dueDate,
        projectId,
        labelId,
        isCompleted: false,
      });
      return newTaskId;
    } catch (err) {
      console.log("Error occurred during createATodo mutation", err);

      return "";
    }
  },
});

export const checkATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const unCheckATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

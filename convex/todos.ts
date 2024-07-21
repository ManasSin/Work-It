import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { handleUserID } from "./auth";
import moment from "moment";
import { getEmbeddingsWithAI } from "./openai";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});

export const todayTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);

    if (userId) {
      const todayStart = moment().startOf("day");
      const todayEnd = moment().endOf("day");

      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter(
          (q) =>
            q.gte(q.field("dueDate"), todayStart.valueOf()) &&
            q.lte(todayEnd.valueOf(), q.field("dueDate"))
        )
        .collect();
    }
    return [];
  },
});

export const overdueTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);

    if (userId) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.lt(q.field("dueDate"), todayStart.getTime()))
        .collect();
    }
    return [];
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
    embedding: v.optional(v.array(v.float64())),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, embedding }
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
        embedding,
      });
      return newTaskId;
    } catch (err) {
      console.log("Error occurred during createATodo mutation", err);

      return null;
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

export const groupTodosByDate = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);

    if (userId) {
      const todos = await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.gt(q.field("dueDate"), new Date().getTime()))
        .collect();

      const groupTodos = todos.reduce((acc: any, todo: any) => {
        const date = new Date(todo.dueDate).toDateString();
        acc[date] = (acc[date] || []).concat(todo);
        return acc;
      }, {});

      return groupTodos;
    }
    return {};
  },
});

export const getCompletedTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserID(ctx);
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();
    }
    return [];
  },
});

export const getInCompleteTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserID(ctx);
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), false))
        .collect();
    }
    return [];
  },
});

export const getTodosTotalByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserID(ctx);
    if (userId) {
      const todos = await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();

      return todos?.length || 0;
    }
    return [];
  },
});

export const getTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserID(ctx);
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .collect();
    }
    return [];
  },
});

export const createTodoAndEmbeddings = action({
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
    const embedding = await getEmbeddingsWithAI(taskName);
    await ctx.runMutation(api.todos.createATodo, {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      embedding,
    });
  },
});

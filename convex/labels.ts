import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { handleUserID } from "./auth";

export const getLabels = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    const userLables = await ctx.db
      .query("labels")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    const systemLables = await ctx.db.query("labels").collect();

    return [...userLables, ...systemLables];
  },
});

export const getLabelByLabelId = query({
  args: {
    labelId: v.id("labels"),
  },
  handler: async (ctx, { labelId }) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    const project = await ctx.db
      .query("labels")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("_id"), labelId))
      .collect();

    return project?.[0] || null;
  },
});

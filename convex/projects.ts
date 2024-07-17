import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { handleUserID } from "./auth";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    const userProjects = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    const systemProjects = await ctx.db.query("projects").collect();

    return [...userProjects, ...systemProjects];
  },
});

export const getProjectByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserID(ctx);
    if (userId === null || userId === undefined) return [];
    if (userId) {
      const project = await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("_id"), projectId))
        .collect();

      return project?.[0] || null;
    }

    return null;
  },
});

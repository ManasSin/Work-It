import { v } from "convex/values";
import { action, internalQuery } from "./_generated/server";
import { getEmbeddingsWithAI } from "./gemini";
import { internal } from "./_generated/api";
import { handleUserID } from "./auth";

export const fetchSearchResults = internalQuery({
  args: {
    results: v.array(v.object({ _id: v.id("todos"), _score: v.float64() })),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const result of args.results) {
      const doc = await ctx.db.get(result._id);
      if (doc === null) {
        continue;
      }
      results.push({ ...doc });
    }
    return results;
  },
});

export const searchTasks = action({
  args: {
    query: v.string(),
  },
  handler: async (ctx, { query }) => {
    try {
      const userId = await handleUserID(ctx);
      if (userId) {
        const embedding = await getEmbeddingsWithAI(query);

        const results = await ctx.vectorSearch("todos", "by_embedding", {
          vector: embedding ? embedding : [],
          limit: 16,
          filter: (q) => q.eq("userId", userId),
        });
        const rows: any = await ctx.runQuery(
          internal.search.fetchSearchResults,
          {
            results,
          }
        );
        return rows;
      }
    } catch (err) {
      console.error("Error searching", err);
    }
  },
});

import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctr) => {
    return await ctr.db.query("todos").collect();
  },
});

export const CompletedTodos = query({
  args: {},
  handler: async (ctr) => {
    return await ctr.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
  },
});

export const inCompleteTodos = query({
  args: {},
  handler: async (ctr) => {
    return await ctr.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
  },
});

import { Auth } from "convex/server";
import { Id } from "./_generated/dataModel";

async function getViewerId(ctr: { auth: Auth }) {
  const identity = await ctr.auth.getUserIdentity();

  if (identity) {
    return identity.subject as Id<"users">;
  }

  return null;
}

export const handleUserID = async (ctr: { auth: Auth }) => {
  const viewerId = await getViewerId(ctr);

  if (viewerId === null)
    console.error("You are not authorized to perform this action");
  return viewerId;
};

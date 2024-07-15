"use server";
import { signIn, signOut } from "@/auth";

export const SignInActon = async () => {
  await signIn("google", { redirectTo: "/loggedin" });
};
export const SignOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

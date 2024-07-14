"use server";
import { signIn } from "@/auth";

export const SignInActon = async () => {
  await signIn("google", { redirectTo: "/loggedin" });
};

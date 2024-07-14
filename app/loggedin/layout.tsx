import { Session } from "next-auth";
import React from "react";
import { Providers } from "../Providers";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const session = await auth();
  return <Providers session={session}>{children}</Providers>;
};
export default layout;

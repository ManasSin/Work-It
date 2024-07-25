"use client";

import { SignInActon } from "@/actions/auth-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {};

function LandingHome({}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session !== null) {
    // router.push("/loggedin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">nav</main>
  );
}
async function reuseSignBtn() {
  <form action={SignInActon}>
    <Button variant={"default"}>Sign In</Button>
  </form>;
}

export default LandingHome;

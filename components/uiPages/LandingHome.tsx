"use client";

import { SignInActon } from "@/actions/auth-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Spotlight } from "../ui/Spotlight";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import { primaryNavItems } from "@/utils";
import FloatingNavbar from "../ui/FloatingNavbar";

type Props = {};

function LandingHome({}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session !== null) {
    router.push("/loggedin");
  }

  return (
    <div>
      <FloatingNavbar
        navList={primaryNavItems}
        actionLable={`${session ? "Sign Out" : "Login"}`}
      />
      <Hero />
      <Spotlight />
    </div>
  );
}

function Hero() {
  return (
    <div className="flex justify-center relative my-20 z-10 h-fit">
      <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
        <p className="uppercase tracking-widest text-xs text-center text-blue-500 max-w-96 bg-gray-100 px-4 py-2 border-blue-500 border-2 rounded-full">
          TODOIST clone made with the power of AI
        </p>
        <TextGenerateEffect
          words="Transform the way the you use TODO and project with power of AI"
          className="text-center text-primary-foreground text-[40px] md:text-5xl lg:text-6xl"
        />
        <p className="text-center text-blue-500 md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
          Create, manage and track your projects with ease
        </p>
        <form action={SignInActon}>
          <Button type="submit" variant="default">
            Get Started
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LandingHome;

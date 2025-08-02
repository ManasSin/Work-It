import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { SignInActon } from "@/actions/auth-action";

type Props = {
  navList: { name: string; link: string }[];
  actionLable: string;
};

const FloatingNavbar = ({ navList, actionLable }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="w-full h-20 px-6 md:px-10 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <p className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Work IT
            </p>
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navList.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <form action={SignInActon}>
            <Button
              type="submit"
              variant="default"
              className="rounded-full px-6"
            >
              {actionLable}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingNavbar;

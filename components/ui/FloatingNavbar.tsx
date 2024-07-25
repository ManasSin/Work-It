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
    <div className="w-full h-20 px-10 flex items-center justify-between max-w-4xl mx-auto">
      <div className="md:w-3/4 w-full h-full flex items-center md:justify-start justify-center">
        <Link href="/">
          <p className="text-xl font-extrabold text-primary-foreground">
            Work IT
          </p>
        </Link>
      </div>
      <div className=" hidden md:flex w-1/4 h-full  items-center gap-6 justify-center">
        {/* {navList.map((item, idx) => (
          <Link key={idx} href={item.link}>
            <div className="min-w-fit h-full flex items-center justify-center">
              <span className="text-lg truncate tracking-wide font-semibold text-primary">
                {item.name}
              </span>
            </div>
          </Link>
        ))} */}
        <form action={SignInActon}>
          <Button type="submit" variant="default">
            {actionLable}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FloatingNavbar;

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { SignOutAction } from "@/actions/auth-action";

type Props = {};

const UserProfile = (props: Props) => {
  const session = useSession();
  if (session?.status === "loading") return <p>Loading...</p>;
  if (session?.status === "unauthenticated")
    return <p className="truncate">Unauthenticated</p>;
  const imageUrl = session?.data?.user?.image;
  const name = session?.data?.user?.name;
  const email = session?.data?.user?.email || `${name}'s email`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        <Button
          variant={"secondary"}
          className="flex items-center justify-start gap-1 lg:gap-2 m-0 p-0 lg:px-3 lg:w-full bg-white"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`${email} profile picture`}
              width={24}
              height={24}
              className="rounded-full flex-shrink justify-self-auto ring-4 "
            />
          )}
          <p className="truncate">{email}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="lg:w-full flex items-center justify-center">
          <form action={SignOutAction}>
            <Button
              variant={"ghost"}
              size={"lg"}
              className="w-full h-full hover:text-primary p-2 text-center"
            >
              Sign Out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;

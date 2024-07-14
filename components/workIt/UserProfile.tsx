import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {};

const UserProfile = (props: Props) => {
  const session = useSession();
  return (
    <Image
      src={session?.data?.user?.image || "/images/placeholder.jpg"}
      alt="User Profile"
      width={100}
      height={100}
      className="rounded-full"
    />
  );
};

export default UserProfile;

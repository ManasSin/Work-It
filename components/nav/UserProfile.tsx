import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {};

const UserProfile = (props: Props) => {
  const session = useSession();
  console.log(session);
  if (session?.status === "loading") return <p>Loading...</p>;
  if (session?.status === "unauthenticated") return <p>Unauthenticated</p>;
  const imageUrl = session?.data?.user?.image;
  const name = session?.data?.user?.name || "User";
  return (
    <div className="flex items-center justify-start gap-1 lg:gap-2 m-0 p-0 lg:px-3 lg:w-full bg-white">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="User Profile"
          width={50}
          height={50}
          className="rounded-full flex-shrink justify-self-auto"
        />
      )}
      <p className="truncate">{name}</p>
    </div>
  );
};

export default UserProfile;

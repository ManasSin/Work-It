"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useAuth = () => {
  const { data: session, update } = useSession();
  const convexToken = convexTokenFromSession(session);
  return useMemo(
    () => ({
      isLoading: false,
      isAuthenticated: session !== null,
      fetchAccessToken: async ({
        forceRefreshToken,
      }: {
        forceRefreshToken: boolean;
      }) => {
        if (forceRefreshToken) {
          const session = await update();
          return convexTokenFromSession(session);
        }
        return convexToken;
      },
    }),
    [JSON.stringify(session?.user)]
  );
};

declare module "next-auth" {
  interface Session {
    convexToken: string;
  }
}

function convexTokenFromSession(session: Session | null): string | null {
  return session?.convexToken ?? null;
}

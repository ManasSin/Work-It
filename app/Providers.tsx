"use client";

import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";
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
    [JSON.stringify(session?.user)] // eslint-disable-line react-hooks/exhaustive-deps
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

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <ConvexProviderWithAuth client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithAuth>
    </SessionProvider>
  );
}

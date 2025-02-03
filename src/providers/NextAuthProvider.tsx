"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type NextAuthProviderProps = {
  children: React.ReactNode;
};

export default function NextAuthProvider({
  children,
}: NextAuthProviderProps): ReactNode {
  return <SessionProvider>{children}</SessionProvider>;
}

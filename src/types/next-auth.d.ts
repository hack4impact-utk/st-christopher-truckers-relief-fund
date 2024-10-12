/* eslint-disable @typescript-eslint/consistent-type-definitions */
import "next-auth";

import { User } from "@/types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}

import { Session } from "next-auth";

import { ApiResponse } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import getUserSession from "@/utils/getUserSession";

export default async function authenticateServerFunction(
  role?: "admin" | "client",
): Promise<ApiResponse<Session>> {
  const session = await getUserSession();

  if (!session) {
    return [null, apiErrors.unauthorized];
  }

  if (role && session.user.role !== role) {
    return [null, apiErrors.unauthorized];
  }

  return [session, null];
}

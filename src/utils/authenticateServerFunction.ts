import { ApiResponse } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import getUserSession from "@/utils/getUserSession";

export default async function authenticateServerFunction(
  role?: "admin" | "client",
): Promise<ApiResponse<null>> {
  const session = await getUserSession();

  if (!session) {
    return { success: false, error: apiErrors.unauthorized };
  }

  if (role && session.user.role !== role) {
    return { success: false, error: apiErrors.unauthorized };
  }

  return { success: true, data: null };
}

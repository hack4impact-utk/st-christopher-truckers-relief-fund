import { PasswordResetTokenModel } from "@/server/models";
import { ApiResponse, PasswordResetToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { create } from "@/utils/db/create";
import { findOneAndDelete } from "@/utils/db/delete";

import { getPasswordResetTokenByToken } from "./queries";

export async function createPasswordResetToken(
  token: string,
  userId: string,
  expires: string,
): Promise<ApiResponse<PasswordResetToken>> {
  const [existingToken] = await getPasswordResetTokenByToken(token);

  if (existingToken) {
    return [null, apiErrors.duplicate];
  }

  return await create(PasswordResetTokenModel, {
    userId,
    token,
    expires,
  });
}

export async function deletePasswordResetToken(
  token: string,
): Promise<ApiResponse<PasswordResetToken>> {
  return await findOneAndDelete(PasswordResetTokenModel, {
    token,
  });
}

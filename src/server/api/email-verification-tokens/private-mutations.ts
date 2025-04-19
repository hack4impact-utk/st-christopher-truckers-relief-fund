import { EmailVerificationTokenModel } from "@/server/models";
import { ApiResponse, EmailVerificationToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { create } from "@/utils/db/create";
import { findOneAndDelete } from "@/utils/db/delete";

import { getEmailVerificationTokenByToken } from "./queries";

export async function createEmailVerificationToken(
  token: string,
  userId: string,
): Promise<ApiResponse<EmailVerificationToken>> {
  const [existingEmailVerificationToken] =
    await getEmailVerificationTokenByToken(token);

  if (existingEmailVerificationToken) {
    return [null, apiErrors.duplicate];
  }

  return await create(EmailVerificationTokenModel, {
    token,
    userId,
  });
}

export async function deleteEmailVerificationToken(
  token: string,
): Promise<ApiResponse<EmailVerificationToken>> {
  return await findOneAndDelete(EmailVerificationTokenModel, {
    token,
  });
}

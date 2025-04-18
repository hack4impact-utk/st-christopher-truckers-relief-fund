import { EmailVerificationTokenModel } from "@/server/models";
import { ApiResponse, EmailVerificationToken } from "@/types";
import { findOne } from "@/utils/db/find";

export async function getEmailVerificationTokenByToken(
  token: string,
): Promise<ApiResponse<EmailVerificationToken>> {
  return await findOne(EmailVerificationTokenModel, {
    filters: { token },
  });
}

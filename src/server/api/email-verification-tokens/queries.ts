import { EmailVerificationTokenModel } from "@/server/models";
import { ApiResponse, EmailVerificationToken } from "@/types";
import { findOne } from "@/utils/db/find";

export async function getEmailVerificationTokenByToken(
  token: string,
): Promise<ApiResponse<EmailVerificationToken>> {
  const [response, error] = await findOne(EmailVerificationTokenModel, {
    filters: { token },
  });

  if (error !== null) {
    return [null, error];
  }

  return [response, null];
}

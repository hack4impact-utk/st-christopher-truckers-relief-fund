import { getPasswordResetTokenByToken } from "@/server/api/password-reset-tokens/queries";
import dbConnect from "@/server/dbConnect";
import { PasswordResetTokenModel } from "@/server/models";
import { ApiResponse, PasswordResetToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createPasswordResetToken(
  token: string,
  userId: string,
  expires: string,
): Promise<ApiResponse<PasswordResetToken>> {
  await dbConnect();

  try {
    // don't create password reset token if one already exists
    const [existingToken] = await getPasswordResetTokenByToken(token);

    if (existingToken) {
      return [
        null,
        apiErrors.passwordResetToken.passwordResetTokenAlreadyExists,
      ];
    }

    const newPasswordResetToken: PasswordResetToken = {
      token,
      userId,
      expires,
    };

    const newPasswordResetTokenDocument = await PasswordResetTokenModel.create(
      newPasswordResetToken,
    );

    const passwordResetToken = newPasswordResetTokenDocument.toObject();

    // convert ObjectId to string
    passwordResetToken._id = String(passwordResetToken._id);

    return [passwordResetToken, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

export async function deletePasswordResetToken(
  token: string,
): Promise<ApiResponse<null>> {
  await dbConnect();

  try {
    const passwordResetToken = await PasswordResetTokenModel.findOneAndDelete({
      token,
    });

    if (!passwordResetToken) {
      return [null, apiErrors.passwordResetToken.passwordResetTokenNotFound];
    }

    return [null, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

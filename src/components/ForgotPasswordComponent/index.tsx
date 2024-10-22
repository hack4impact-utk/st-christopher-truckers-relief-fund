import { Typography } from "@mui/material";
import Link from "next/link";

import ForgotPasswordForm from "@/components/ForgotPasswordComponent/ForgotPasswordForm";
import ResetPasswordForm from "@/components/ForgotPasswordComponent/ResetPasswordForm";
import { getPasswordResetTokenByToken } from "@/server/api/password-reset-tokens/queries";
import apiErrors from "@/utils/constants/apiErrors";

type ForgotPasswordComponentProps = {
  token?: string | string[];
};

export default async function ForgotPasswordComponent({
  token,
}: ForgotPasswordComponentProps) {
  if (!token) {
    return <ForgotPasswordForm />;
  }

  if (typeof token === "object") {
    return <Typography variant="body1">Invalid token</Typography>;
  }

  const passwordResetToken = await getPasswordResetTokenByToken(token);

  if (
    !passwordResetToken.success &&
    passwordResetToken.error ===
      apiErrors.passwordResetToken.passwordResetTokenExpired
  ) {
    return (
      <>
        <Typography variant="body1">
          This token has expired. Please fill out the form again.
        </Typography>
        <Link href="/forgot-password" style={{ textDecoration: "none" }}>
          <Typography variant="body1" color="primary">
            Click here to request a new password reset link.
          </Typography>
        </Link>
      </>
    );
  }

  if (!passwordResetToken.success) {
    return <Typography variant="body1">Invalid token</Typography>;
  }

  return <ResetPasswordForm token={passwordResetToken.data.token} />;
}

import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type ResetPasswordEmailProps = {
  token: string;
};

export default function ResetPasswordEmail({
  token,
}: Readonly<ResetPasswordEmailProps>): ReactNode {
  const preview = "Reset your SCF password";
  const text = `We have received a request to reset your password. Please click on the link below.`;
  const buttonText = "Reset Password";
  const buttonUrl = `${process.env.BASE_URL}/forgot-password/${token}`;

  return (
    <SCFEmail
      type="text-and-button"
      previewText={preview}
      text={text}
      buttonText={buttonText}
      buttonUrl={buttonUrl}
    />
  );
}

import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type EmailVerificationEmailProps = {
  token: string;
};

export default function EmailVerificationEmail({
  token,
}: Readonly<EmailVerificationEmailProps>): ReactNode {
  const preview = "Verify your SCF email address";
  const text = `Please click on the link below to verify your email address.`;
  const buttonText = "Verify Email Address";
  const buttonUrl = `${process.env.BASE_URL}/verify-email/${token}`;

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

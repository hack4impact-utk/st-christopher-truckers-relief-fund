import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type PasswordChangedEmailProps = {
  firstName: string;
};

export default function PasswordChangedEmail({
  firstName,
}: PasswordChangedEmailProps): ReactNode {
  const preview = "Your SCF password was changed";
  const text = `Hello ${firstName}, your password to the SCF Dashboard has been changed. If this was you, you can safely disregard this email.`;

  return <SCFEmail type="text-only" previewText={preview} text={text} />;
}

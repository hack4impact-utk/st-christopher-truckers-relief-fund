"use server";

import { render } from "@react-email/components";

import PasswordChanged from "@/components/emails/PasswordChanged";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import WelcomeEmail from "@/components/emails/WelcomeEmail";
import sendEmail from "@/server/api/emails/helpers";

export async function sendPasswordChangeEmail(
  recipient_email: string,
  firstName: string,
) {
  const html = await render(<PasswordChanged firstName={firstName} />);

  await sendEmail(recipient_email, "Your SCF password has been changed", html);
}

export async function sendPasswordResetEmail(
  recipient_email: string,
  token: string,
) {
  const html = await render(<ResetPasswordEmail token={token} />);

  await sendEmail(recipient_email, "Reset your SCF password", html);
}

export async function sendWelcomeEmail(
  recipient_email: string,
  firstName: string,
  programName: string,
) {
  const html = await render(
    <WelcomeEmail firstName={firstName} programName={programName} />,
  );

  await sendEmail(recipient_email, "Welcome to SCF", html);
}

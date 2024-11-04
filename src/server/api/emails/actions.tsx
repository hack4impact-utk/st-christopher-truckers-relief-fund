"use server";

import { render } from "@react-email/components";

import PasswordChanged from "@/components/emails/PasswordChanged";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import WelcomeEmail from "@/components/emails/WelcomeEmail";
import sendEmail from "@/server/api/emails/helpers";

export async function sendPasswordChangeEmail(
  recipientEmail: string,
  firstName: string,
) {
  const html = await render(<PasswordChanged firstName={firstName} />);

  await sendEmail(recipientEmail, "Your SCF password has been changed", html);
}

export async function sendPasswordResetEmail(
  recipientEmail: string,
  token: string,
) {
  const html = await render(<ResetPasswordEmail token={token} />);

  await sendEmail(recipientEmail, "Reset your SCF password", html);
}

export async function sendWelcomeEmail(
  recipientEmail: string,
  firstName: string,
  programName: string,
) {
  const html = await render(
    <WelcomeEmail firstName={firstName} programName={programName} />,
  );

  await sendEmail(recipientEmail, "Welcome to SCF", html);
}

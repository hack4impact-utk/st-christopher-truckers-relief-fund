"use server";

import { render } from "@react-email/components";

import WelcomeEmail from "@/components/emails/WelcomeEmail";
import sendEmail from "@/server/api/emails/helpers";

export async function sendPasswordResetEmail(recipient_email: string) {
  const html = `<p>Hello ${recipient_email}</p>`;

  await sendEmail(recipient_email, "Please reset your password", html);
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

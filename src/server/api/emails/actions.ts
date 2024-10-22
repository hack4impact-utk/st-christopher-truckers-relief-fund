"use server";

import sendEmail from "@/server/api/emails/helpers";

export async function sendPasswordChangedEmail(recipient_email: string) {
  const html = `<p>Hello ${recipient_email}</p>`;

  await sendEmail(recipient_email, "Your password has been changed", html);
}

export async function sendWelcomeEmail(recipient_email: string) {
  const html = `<p>Hello ${recipient_email}</p>`;

  await sendEmail(recipient_email, "Welcome to SCF", html);
}

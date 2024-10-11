"use server";

import sendEmail from "@/server/api/emails/helpers";

export async function sendPasswordResetEmail(recipient_email: string) {
  const html = `<p>Hello ${recipient_email}</p>`;

  await sendEmail(recipient_email, "Please reset your password", html);
}

export async function sendWelcomeEmail(recipient_email: string) {
  const html = `<p>Hello ${recipient_email}</p>`;

  await sendEmail(recipient_email, "Welcome to SCF", html);
}

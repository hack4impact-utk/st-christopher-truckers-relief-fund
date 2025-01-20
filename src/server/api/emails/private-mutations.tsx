import { render } from "@react-email/components";

import EmailVerificationEmail from "@/components/emails/EmailVerificationEmail";
import PasswordChangedEmail from "@/components/emails/PasswordChangedEmail";
import RejectionEmail from "@/components/emails/RejectionEmail";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import WelcomeEmail from "@/components/emails/WelcomeEmail";
import ZoomReminderEmail from "@/components/emails/ZoomReminderEmail";

import sendEmail from "./helpers";

export async function sendPasswordChangeEmail(
  recipientEmail: string,
  firstName: string,
) {
  const html = await render(<PasswordChangedEmail firstName={firstName} />);

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

export async function sendRejectionEmail(
  recipientEmail: string,
  programName: string,
  rejectReason: string,
) {
  const html = await render(
    <RejectionEmail programName={programName} rejectReason={rejectReason} />,
  );

  await sendEmail(
    recipientEmail,
    "Your SCF Program Application Has Been Rejected",
    html,
  );
}

export async function sendEmailVerificationEmail(
  recipientEmail: string,
  token: string,
) {
  const html = await render(<EmailVerificationEmail token={token} />);

  await sendEmail(recipientEmail, "Verify your SCF email address", html);
}

export async function sendZoomReminderEmail(
  meetingName: string,
  meetingLink: string,
  recipientEmail: string,
) {
  const html = await render(
    <ZoomReminderEmail meetingName={meetingName} meetingLink={meetingLink} />,
  );

  await sendEmail(
    recipientEmail,
    `Reminder: You have an upcoming meeting for ${meetingName}.`,
    html,
  );
}

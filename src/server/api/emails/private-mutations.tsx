import { render } from "@react-email/components";

import EmailVerificationEmail from "@/components/emails/EmailVerificationEmail";
import PasswordChangedEmail from "@/components/emails/PasswordChangedEmail";
import RejectionEmail from "@/components/emails/RejectionEmail";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import UrgentMeetingRequestCreated from "@/components/emails/UrgentMeetingRequestCreated";
import WelcomeEmail from "@/components/emails/WelcomeEmail";
import ZoomReminderEmail from "@/components/emails/ZoomReminderEmail";

import { getUsers } from "../users/queries";
import sendEmail from "./helpers";

export async function sendPasswordChangeEmail(
  recipientEmail: string,
  firstName: string,
): Promise<void> {
  const html = await render(<PasswordChangedEmail firstName={firstName} />);

  await sendEmail(recipientEmail, "Your SCF password has been changed", html);
}

export async function sendPasswordResetEmail(
  recipientEmail: string,
  token: string,
): Promise<void> {
  const html = await render(<ResetPasswordEmail token={token} />);

  await sendEmail(recipientEmail, "Reset your SCF password", html);
}

export async function sendWelcomeEmail(
  recipientEmail: string,
  firstName: string,
  programName: string,
): Promise<void> {
  const html = await render(
    <WelcomeEmail firstName={firstName} programName={programName} />,
  );

  await sendEmail(recipientEmail, "Welcome to SCF", html);
}

export async function sendRejectionEmail(
  recipientEmail: string,
  programName: string,
  rejectReason: string,
): Promise<void> {
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
): Promise<void> {
  const html = await render(<EmailVerificationEmail token={token} />);

  await sendEmail(recipientEmail, "Verify your SCF email address", html);
}

export async function sendZoomReminderEmail(
  meetingName: string,
  meetingLink: string,
  recipientEmail: string,
): Promise<void> {
  const html = await render(
    <ZoomReminderEmail meetingName={meetingName} meetingLink={meetingLink} />,
  );

  await sendEmail(
    recipientEmail,
    `Reminder: You have an upcoming meeting for ${meetingName}.`,
    html,
  );
}

export async function sendUrgentMeetingRequestCreatedEmail(
  firstName: string,
  lastName: string,
  reason: string,
): Promise<void> {
  const html = await render(
    <UrgentMeetingRequestCreated
      firstName={firstName}
      lastName={lastName}
      reason={reason}
    />,
  );

  const [allAdmins, error] = await getUsers({ role: "admin" });

  if (error !== null) {
    console.error("Error sending urgent meeting request created email:", error);
    return;
  }

  await Promise.all(
    allAdmins.map(async (admin) => {
      await sendEmail(
        admin.email,
        `Urgent meeting requested for ${firstName} ${lastName}.`,
        html,
      );
    }),
  );
}

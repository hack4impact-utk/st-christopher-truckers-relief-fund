"use server";

import {
  sendRejectionEmail,
  sendWelcomeEmail,
} from "@/server/api/emails/private-mutations";
import {
  approveProgramEnrollment,
  rejectProgramEnrollment,
} from "@/server/api/program-enrollments/private-mutations";
import { ProgramEnrollment } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";

export async function handleRejectProgramApplication(
  programEnrollment: ProgramEnrollment,
  reason: string,
) {
  const [, authError] = await authenticateServerFunction("admin");

  if (authError !== null) {
    return [null, authError];
  }

  await rejectProgramEnrollment(programEnrollment);
  await sendRejectionEmail(
    programEnrollment.user.email,
    programEnrollment.program,
    reason,
  );
}

export async function handleApproveProgramApplication(
  programEnrollment: ProgramEnrollment,
) {
  const [, authError] = await authenticateServerFunction("admin");

  if (authError !== null) {
    return [null, authError];
  }

  await approveProgramEnrollment(programEnrollment);
  await sendWelcomeEmail(
    programEnrollment.user.email,
    programEnrollment.user.firstName,
    programEnrollment.program,
  );
}

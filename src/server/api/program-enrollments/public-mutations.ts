"use server";

import {
  sendRejectionEmail,
  sendWelcomeEmail,
} from "@/server/api/emails/private-mutations";
import {
  approveProgramEnrollment,
  createProgramEnrollment,
  rejectProgramEnrollment,
} from "@/server/api/program-enrollments/private-mutations";
import { EnrollmentForm, Program } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import dayjsUtil from "@/utils/dayjsUtil";

export async function createProgramEnrollmentsFromEnrollmentForm(
  enrollmentForm: EnrollmentForm,
) {
  if (enrollmentForm.programSelectionSection.optedInToHealthyHabits) {
    await createProgramEnrollment({
      program: "Healthy Habits For The Long Haul",
      status: "pending",
      email: enrollmentForm.generalInformationSection.email,
      enrollmentForm,
      dateEnrolled: dayjsUtil().utc().toISOString(),
    });
  }

  if (enrollmentForm.programSelectionSection.optedInToDiabetesPrevention) {
    await createProgramEnrollment({
      program: "Diabetes Prevention",
      status: "pending",
      email: enrollmentForm.generalInformationSection.email,
      enrollmentForm,
      dateEnrolled: dayjsUtil().utc().toISOString(),
    });
  }

  if (enrollmentForm.programSelectionSection.optedInToRigsWithoutCigs) {
    await createProgramEnrollment({
      program: "Rigs Without Cigs",
      status: "pending",
      email: enrollmentForm.generalInformationSection.email,
      enrollmentForm,
      dateEnrolled: dayjsUtil().utc().toISOString(),
    });
  }

  if (enrollmentForm.programSelectionSection.optedInToVaccineVoucher) {
    await createProgramEnrollment({
      program: "Vaccine Voucher",
      status: "pending",
      email: enrollmentForm.generalInformationSection.email,
      enrollmentForm,
      dateEnrolled: dayjsUtil().utc().toISOString(),
    });
  }

  if (
    enrollmentForm.programSelectionSection.optedInToGetPreventativeScreenings
  ) {
    await createProgramEnrollment({
      program: "GPS (Get Preventative Screenings)",
      status: "pending",
      email: enrollmentForm.generalInformationSection.email,
      enrollmentForm,
      dateEnrolled: dayjsUtil().utc().toISOString(),
    });
  }
}

export async function handleRejectProgramApplication(
  email: string,
  program: Program,
  reason: string,
) {
  const [, authError] = await authenticateServerFunction("admin");

  if (authError !== null) {
    return [null, authError];
  }

  await rejectProgramEnrollment(email, program);
  await sendRejectionEmail(email, program, reason);
}

export async function handleApproveProgramApplication(
  email: string,
  firstName: string,
  program: Program,
) {
  const [, authError] = await authenticateServerFunction("admin");

  if (authError !== null) {
    return [null, authError];
  }

  await approveProgramEnrollment(email, program);
  await sendWelcomeEmail(email, firstName, program);
}

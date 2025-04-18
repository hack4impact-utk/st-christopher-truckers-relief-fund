import dbConnect from "@/server/dbConnect";
import { ProgramEnrollmentModel } from "@/server/models";
import { ApiResponse, EnrollmentForm, ProgramEnrollment, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import dayjsUtil from "@/utils/dayjsUtil";
import { create } from "@/utils/db/create";
import { findOneAndUpdate } from "@/utils/db/update";

import { getProgramEnrollmentForUser } from "./queries";

export async function createProgramEnrollment(
  programEnrollment: ProgramEnrollment,
): Promise<ApiResponse<ProgramEnrollment>> {
  const [existingProgramEnrollment] = await getProgramEnrollmentForUser(
    programEnrollment.user.email,
    programEnrollment.program,
  );

  if (existingProgramEnrollment) {
    return [null, apiErrors.duplicate];
  }

  return await create(ProgramEnrollmentModel, programEnrollment);
}

export async function createProgramEnrollmentsFromEnrollmentForm(
  enrollmentForm: EnrollmentForm,
  user: User,
): Promise<void> {
  await createProgramEnrollment({
    user,
    program: "Healthy Habits For The Long Haul",
    status: enrollmentForm.programSelectionSection.optedInToHealthyHabits
      ? "pending"
      : "rejected",
    dateEnrolled: dayjsUtil().utc().toISOString(),
  });
  await createProgramEnrollment({
    user,
    program: "Diabetes Prevention",
    status: enrollmentForm.programSelectionSection.optedInToDiabetesPrevention
      ? "pending"
      : "rejected",
    dateEnrolled: dayjsUtil().utc().toISOString(),
  });
  await createProgramEnrollment({
    user,
    program: "Rigs Without Cigs",
    status: enrollmentForm.programSelectionSection.optedInToRigsWithoutCigs
      ? "pending"
      : "rejected",
    dateEnrolled: dayjsUtil().utc().toISOString(),
  });
  await createProgramEnrollment({
    user,
    program: "Vaccine Voucher",
    status: enrollmentForm.programSelectionSection.optedInToVaccineVoucher
      ? "pending"
      : "rejected",
    dateEnrolled: dayjsUtil().utc().toISOString(),
  });
  await createProgramEnrollment({
    user,
    program: "GPS (Get Preventative Screenings)",
    status: enrollmentForm.programSelectionSection
      .optedInToGetPreventativeScreenings
      ? "pending"
      : "rejected",
    dateEnrolled: dayjsUtil().utc().toISOString(),
  });
}

async function updateProgramEnrollment(
  newProgramEnrollment: ProgramEnrollment,
): Promise<ApiResponse<ProgramEnrollment>> {
  return await findOneAndUpdate(ProgramEnrollmentModel, newProgramEnrollment);
}

export async function rejectProgramEnrollment(
  programEnrollment: ProgramEnrollment,
): Promise<ApiResponse<null>> {
  await dbConnect();

  const [, updateProgramEnrollmentError] = await updateProgramEnrollment({
    ...programEnrollment,
    status: "rejected",
  });

  if (updateProgramEnrollmentError !== null) {
    return [null, updateProgramEnrollmentError];
  }

  return [null, null];
}

export async function approveProgramEnrollment(
  programEnrollment: ProgramEnrollment,
): Promise<ApiResponse<null>> {
  await dbConnect();

  const [, updateProgramEnrollmentError] = await updateProgramEnrollment({
    ...programEnrollment,
    status: "accepted",
    dateEnrolled: dayjsUtil().utc().toISOString(),
  });

  if (updateProgramEnrollmentError !== null) {
    return [null, updateProgramEnrollmentError];
  }

  return [null, null];
}

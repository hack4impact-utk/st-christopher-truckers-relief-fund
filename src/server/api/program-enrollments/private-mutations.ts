import { getProgramEnrollmentForUser } from "@/server/api/program-enrollments/queries";
import dbConnect from "@/server/dbConnect";
import { ProgramEnrollmentModel } from "@/server/models";
import { ApiResponse, Program, ProgramEnrollment } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createProgramEnrollment(
  programEnrollment: ProgramEnrollment,
): Promise<ApiResponse<ProgramEnrollment>> {
  await dbConnect();

  try {
    // don't create program enrollment if one already exists
    const [existingProgramEnrollment] = await getProgramEnrollmentForUser(
      programEnrollment.email,
      programEnrollment.program,
    );

    if (existingProgramEnrollment) {
      return [null, apiErrors.programEnrollment.programEnrollmentAlreadyExists];
    }

    const newProgramEnrollmentDocument =
      await ProgramEnrollmentModel.create(programEnrollment);

    // convert ObjectId to string
    const newProgramEnrollment = newProgramEnrollmentDocument.toObject();
    newProgramEnrollment._id = String(newProgramEnrollment._id);

    return [newProgramEnrollment, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

export async function updateProgramEnrollment(
  newProgramEnrollment: ProgramEnrollment,
): Promise<ApiResponse<ProgramEnrollment>> {
  await dbConnect();

  try {
    const updatedProgramEnrollment =
      await ProgramEnrollmentModel.findOneAndUpdate(
        { _id: newProgramEnrollment._id },
        newProgramEnrollment,
        { new: true, lean: true },
      ).exec();

    if (!updatedProgramEnrollment) {
      return [null, apiErrors.programEnrollment.programEnrollmentNotFound];
    }

    // convert ObjectId to string
    updatedProgramEnrollment._id = String(updatedProgramEnrollment._id);

    return [updatedProgramEnrollment, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

export async function rejectProgramEnrollment(
  email: string,
  program: Program,
): Promise<ApiResponse<null>> {
  await dbConnect();

  const [programEnrollment, programEnrollmentError] =
    await getProgramEnrollmentForUser(email, program);

  if (programEnrollmentError !== null) {
    return [null, programEnrollmentError];
  }

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
  email: string,
  program: Program,
): Promise<ApiResponse<null>> {
  await dbConnect();

  const [programEnrollment, programEnrollmentError] =
    await getProgramEnrollmentForUser(email, program);

  if (programEnrollmentError !== null) {
    return [null, programEnrollmentError];
  }

  const [, updateProgramEnrollmentError] = await updateProgramEnrollment({
    ...programEnrollment,
    status: "accepted",
  });

  if (updateProgramEnrollmentError !== null) {
    return [null, updateProgramEnrollmentError];
  }

  return [null, null];
}

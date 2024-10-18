"use server";

import { ProgramEnrollmentModel } from "@/server/models";
import { ApiResponse, ProgramEnrollment } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createProgramEnrollment(
  programEnrollment: ProgramEnrollment,
): Promise<ApiResponse<ProgramEnrollment>> {
  try {
    // don't create program enrollment if one already exists
    const existingProgramEnrollment = await ProgramEnrollmentModel.findOne({
      email: programEnrollment.email,
      program: programEnrollment.program,
    });

    if (existingProgramEnrollment) {
      return {
        success: false,
        error: apiErrors.programEnrollment.programEnrollmentAlreadyExists,
      };
    }

    const newProgramEnrollmentDocument =
      await ProgramEnrollmentModel.create(programEnrollment);

    // convert ObjectId to string
    const newProgramEnrollment = newProgramEnrollmentDocument.toObject();
    newProgramEnrollment._id = String(newProgramEnrollment._id);

    return { success: true, data: newProgramEnrollment };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}

export async function updateProgramEnrollment(
  newProgramEnrollment: ProgramEnrollment,
): Promise<ApiResponse<ProgramEnrollment>> {
  const authResponse = await authenticateServerFunction("admin");

  if (!authResponse.success) {
    return authResponse;
  }

  try {
    const updatedProgramEnrollment =
      await ProgramEnrollmentModel.findOneAndUpdate(
        { _id: newProgramEnrollment._id },
        newProgramEnrollment,
        { new: true, lean: true },
      ).exec();

    if (!updatedProgramEnrollment) {
      return {
        success: false,
        error: apiErrors.programEnrollment.programEnrollmentNotFound,
      };
    }

    // convert ObjectId to string
    updatedProgramEnrollment._id = String(updatedProgramEnrollment._id);

    return { success: true, data: updatedProgramEnrollment };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}

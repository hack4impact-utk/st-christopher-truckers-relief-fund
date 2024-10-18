import dbConnect from "@/server/dbConnect";
import { ProgramEnrollmentModel } from "@/server/models";
import { ProgramEnrollment } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import handleMongooseError from "@/utils/handleMongooseError";

type ProgramEnrollmentFilters = Partial<ProgramEnrollment>;

export async function getProgramEnrollments(filters: ProgramEnrollmentFilters) {
  await dbConnect();

  const authResponse = await authenticateServerFunction();

  if (!authResponse.success) {
    return authResponse;
  }

  try {
    const programEnrollments = await ProgramEnrollmentModel.find(filters)
      .lean<ProgramEnrollment[]>()
      .exec();

    // convert ObjectId to string
    programEnrollments.forEach((programEnrollment) => {
      programEnrollment._id = String(programEnrollment._id);
    });

    return { success: true, data: programEnrollments };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}

export async function getPendingProgramEnrollments() {
  return getProgramEnrollments({ status: "pending" });
}

export async function getClientProgramEnrollments(email: string) {
  return getProgramEnrollments({ email, status: "accepted" });
}

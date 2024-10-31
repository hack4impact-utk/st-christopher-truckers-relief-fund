import dbConnect from "@/server/dbConnect";
import { ProgramEnrollmentModel } from "@/server/models";
import { ApiResponse, Program, ProgramEnrollment } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

type ProgramEnrollmentFilters = Partial<ProgramEnrollment>;

async function getProgramEnrollments(
  filters: ProgramEnrollmentFilters,
  populateEnrollmentForm = false,
): Promise<ApiResponse<ProgramEnrollment[]>> {
  await dbConnect();

  const [, error] = await authenticateServerFunction();

  if (error) {
    return [null, error];
  }

  try {
    const programEnrollmentsQuery = ProgramEnrollmentModel.find(filters);

    if (populateEnrollmentForm) {
      programEnrollmentsQuery.populate("enrollmentForm");
    }

    const programEnrollments = await programEnrollmentsQuery
      .lean<ProgramEnrollment[]>()
      .exec();

    // convert ObjectId to string
    programEnrollments.forEach((programEnrollment) => {
      programEnrollment._id = String(programEnrollment._id);
    });

    return [programEnrollments, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

async function getProgramEnrollment(
  filters: ProgramEnrollmentFilters,
): Promise<ApiResponse<ProgramEnrollment>> {
  await dbConnect();

  const programEnrollment = await ProgramEnrollmentModel.findOne(filters)
    .lean<ProgramEnrollment>()
    .exec();

  if (!programEnrollment) {
    return [null, apiErrors.programEnrollment.programEnrollmentNotFound];
  }

  // convert ObjectId to string
  programEnrollment._id = String(programEnrollment._id);

  return [programEnrollment, null];
}

export async function getPendingProgramEnrollments() {
  return getProgramEnrollments({ status: "pending" }, false);
}

export async function getClientActivePrograms(email: string) {
  return getProgramEnrollments({ email, status: "accepted" });
}

export async function getProgramEnrollmentForUser(
  email: string,
  program: Program,
) {
  return getProgramEnrollment({ email, program });
}

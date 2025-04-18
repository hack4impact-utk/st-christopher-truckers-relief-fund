import dbConnect from "@/server/dbConnect";
import { ProgramEnrollmentModel } from "@/server/models";
import { ApiResponse, Program, ProgramEnrollment } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { findAll } from "@/utils/db/findAll";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getPendingProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  const [response, error] = await findAll(ProgramEnrollmentModel, {
    filter: { status: "pending" },
    populate: {
      path: "user",
      populate: {
        path: "enrollmentForm",
      },
    },
    fetchAll: true,
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}

export async function getProgramEnrollmentForUser(
  email: string,
  program: Program,
): Promise<ApiResponse<ProgramEnrollment>> {
  await dbConnect();
  try {
    /*
     * Find the first program enrollment where
     * 1. programEnrollment.program === program
     * 2. programEnrollment.user.email === email
     * Reference: https://stackoverflow.com/questions/45311823/filter-by-referenced-property-in-the-mongoose
     */
    const userProgramEnrollment = (await ProgramEnrollmentModel.aggregate([
      {
        $match: { program },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: { "user.email": email },
      },
      {
        $limit: 1,
      },
    ]).exec()) as ProgramEnrollment[];

    if (!userProgramEnrollment.length) {
      return [null, apiErrors.notFound];
    }

    return [serializeMongooseObject(userProgramEnrollment[0]), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function getHealthyHabitsProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  const [response, error] = await findAll(ProgramEnrollmentModel, {
    filter: { status: "accepted", program: "Healthy Habits For The Long Haul" },
    populate: {
      path: "user",
      populate: [
        {
          path: "healthyHabitsTrackingForms",
          options: { sort: { submittedDate: -1 } },
        },
      ],
    },
    fetchAll: true,
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}

export async function getRigsWithoutCigsProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  const [response, error] = await findAll(ProgramEnrollmentModel, {
    filter: { status: "accepted", program: "Rigs Without Cigs" },
    populate: {
      path: "user",
      populate: [
        {
          path: "fagerstromTests",
          options: { sort: { submittedDate: -1 } },
        },
      ],
    },
    fetchAll: true,
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}

export async function getDiabetesPreventionProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  const [response, error] = await findAll(ProgramEnrollmentModel, {
    filter: { status: "accepted", program: "Diabetes Prevention" },
    populate: {
      path: "user",
      populate: [
        {
          // Rename in the future
          path: "healthyHabitsTrackingForms",
          options: { sort: { submittedDate: -1 } },
        },
      ],
    },
    fetchAll: true,
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}

export async function getVaccineVoucherProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  const [response, error] = await findAll(ProgramEnrollmentModel, {
    filter: { status: "accepted", program: "Vaccine Voucher" },
    populate: {
      path: "user",
      populate: [
        {
          path: "vaccineVoucherRequests",
          options: { sort: { submittedDate: -1 } },
        },
      ],
    },
    fetchAll: true,
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}

export async function getGetPreventativeScreeningsProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  const [response, error] = await findAll(ProgramEnrollmentModel, {
    filter: {
      status: "accepted",
      program: "GPS (Get Preventative Screenings)",
    },
    populate: {
      path: "user",
      populate: [
        {
          path: "screeningRequests",
          options: { sort: { submittedDate: -1 } },
        },
      ],
    },
    fetchAll: true,
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}

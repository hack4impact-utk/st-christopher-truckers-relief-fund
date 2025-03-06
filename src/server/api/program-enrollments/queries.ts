import dbConnect from "@/server/dbConnect";
import { ProgramEnrollmentModel } from "@/server/models";
import { ApiResponse, Program, ProgramEnrollment } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getPendingProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  await dbConnect();

  try {
    const pendingEnrollments = await ProgramEnrollmentModel.find({
      status: "pending",
    })
      .populate({
        path: "user",
        populate: {
          path: "enrollmentForm",
        },
      })
      .lean<ProgramEnrollment[]>()
      .exec();

    return [serializeMongooseObject(pendingEnrollments), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
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
      return [null, apiErrors.programEnrollment.programEnrollmentNotFound];
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
  await dbConnect();
  try {
    const healthyHabitsEnrollments = await ProgramEnrollmentModel.find({
      status: "accepted",
      program: "Healthy Habits For The Long Haul",
    })
      .populate({
        path: "user",
        populate: [
          {
            path: "healthyHabitsTrackingForms",
            options: { sort: { submittedDate: -1 } },
          },
        ],
      })
      .lean<ProgramEnrollment[]>()
      .exec();

    return [serializeMongooseObject(healthyHabitsEnrollments), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function getRigsWithoutCigsProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  await dbConnect();
  try {
    const rigsWithoutCigsEnrollments = await ProgramEnrollmentModel.find({
      status: "accepted",
      program: "Rigs Without Cigs",
    })
      .populate({
        path: "user",
        populate: [
          {
            path: "fagerstromTests",
            options: { sort: { submittedDate: -1 } },
          },
        ],
      })
      .lean<ProgramEnrollment[]>()
      .exec();

    return [serializeMongooseObject(rigsWithoutCigsEnrollments), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function getDiabetesPreventionProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  await dbConnect();
  try {
    const diabetesPreventionEnrollments = await ProgramEnrollmentModel.find({
      status: "accepted",
      program: "Diabetes Prevention",
    })
      .populate({
        path: "user",
        populate: [
          {
            // Rename in the future
            path: "healthyHabitsTrackingForms",
            options: { sort: { submittedDate: -1 } },
          },
        ],
      })
      .lean<ProgramEnrollment[]>()
      .exec();

    return [serializeMongooseObject(diabetesPreventionEnrollments), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function getVaccineVoucherProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  await dbConnect();
  try {
    const vaccineVoucherEnrollments = await ProgramEnrollmentModel.find({
      status: "accepted",
      program: "Vaccine Voucher",
    })
      .populate({
        path: "user",
      })
      .lean<ProgramEnrollment[]>()
      .exec();

    return [serializeMongooseObject(vaccineVoucherEnrollments), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function getGetPreventativeScreeningsProgramEnrollments(): Promise<
  ApiResponse<ProgramEnrollment[]>
> {
  await dbConnect();
  try {
    const getPreventativeScreeningsEnrollments =
      await ProgramEnrollmentModel.find({
        status: "accepted",
        program: "GPS (Get Preventative Screenings)",
      })
        .populate({
          path: "user",
          populate: [
            {
              path: "screeningRequests",
              options: { sort: { submittedDate: -1 } },
            },
          ],
        })
        .lean<ProgramEnrollment[]>()
        .exec();

    return [
      serializeMongooseObject(getPreventativeScreeningsEnrollments),
      null,
    ];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

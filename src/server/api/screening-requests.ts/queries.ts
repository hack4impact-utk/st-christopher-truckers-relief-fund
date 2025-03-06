import dbConnect from "@/server/dbConnect";
import { ScreeningRequestModel } from "@/server/models";
import { ApiResponse, ScreeningRequest } from "@/types";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getAllScreeningRequests(): Promise<
  ApiResponse<ScreeningRequest[]>
> {
  await dbConnect();

  try {
    const screeningRequests = await ScreeningRequestModel.find()
      .sort({ submittedDate: -1 })
      .populate({
        path: "user",
        populate: {
          path: "enrollmentForm",
        },
      })
      .lean<ScreeningRequest[]>()
      .exec();

    return [serializeMongooseObject(screeningRequests), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

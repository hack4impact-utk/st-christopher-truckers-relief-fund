import dbConnect from "@/server/dbConnect";
import { VaccineVoucherRequestModel } from "@/server/models";
import { ApiResponse, VaccineVoucherRequest } from "@/types";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getAllVaccineVoucherRequests(): Promise<
  ApiResponse<VaccineVoucherRequest[]>
> {
  await dbConnect();

  try {
    const vaccineVoucherRequests = await VaccineVoucherRequestModel.find()
      .lean<VaccineVoucherRequest[]>()
      .populate("user")
      .sort({ submittedDate: -1 })
      .exec();

    return [serializeMongooseObject(vaccineVoucherRequests), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

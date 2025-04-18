import dbConnect from "@/server/dbConnect";
import { UserModel, VaccineVoucherRequestModel } from "@/server/models";
import { ApiResponse, VaccineVoucherRequest } from "@/types";
import { findByIdAndDelete } from "@/utils/db/delete";
import { findOneAndUpdate } from "@/utils/db/update";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function createVaccineVoucherRequest(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<VaccineVoucherRequest>> {
  await dbConnect();

  try {
    const newVaccineVoucherRequestDocument =
      await VaccineVoucherRequestModel.create(vaccineVoucherRequest);

    const newVaccineVoucherRequest =
      newVaccineVoucherRequestDocument.toObject();

    // add to User object
    await UserModel.findByIdAndUpdate(vaccineVoucherRequest.user._id, {
      $push: { vaccineVoucherRequests: newVaccineVoucherRequest._id },
    });

    return [serializeMongooseObject(newVaccineVoucherRequest), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function updateVaccineVoucherRequest(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<VaccineVoucherRequest>> {
  return await findOneAndUpdate(
    VaccineVoucherRequestModel,
    vaccineVoucherRequest,
  );
}

export async function deleteVaccineVoucherRequest(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<VaccineVoucherRequest>> {
  return await findByIdAndDelete(
    VaccineVoucherRequestModel,
    vaccineVoucherRequest._id!,
  );
}

import dbConnect from "@/server/dbConnect";
import { UserModel, VaccineVoucherRequestModel } from "@/server/models";
import { ApiResponse, VaccineVoucherRequest } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { findByIdAndDelete } from "@/utils/db/delete";
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
  await dbConnect();

  try {
    const updatedVaccineVoucherRequest =
      await VaccineVoucherRequestModel.findOneAndUpdate(
        { _id: vaccineVoucherRequest._id },
        vaccineVoucherRequest,
        { new: true, lean: true },
      ).exec();

    if (!updatedVaccineVoucherRequest) {
      return [
        null,
        apiErrors.vaccineVoucherRequest.vaccineVoucherRequestNotFound,
      ];
    }

    return [serializeMongooseObject(updatedVaccineVoucherRequest), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function deleteVaccineVoucherRequest(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<null>> {
  const [, error] = await findByIdAndDelete(
    VaccineVoucherRequestModel,
    vaccineVoucherRequest._id!,
  );

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}

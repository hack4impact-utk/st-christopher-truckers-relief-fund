import dbConnect from "@/server/dbConnect";
import { FeatureFlagModel } from "@/server/models";
import { ApiResponse, FeatureFlag } from "@/types";
import { create } from "@/utils/db/create";
import handleMongooseError from "@/utils/db/handleMongooseError";

export async function createFeatureFlag(
  featureFlag: FeatureFlag,
): Promise<ApiResponse<FeatureFlag>> {
  return await create(FeatureFlagModel, featureFlag);
}

export async function updateFeatureFlag(
  featureFlag: FeatureFlag,
): Promise<ApiResponse<null>> {
  await dbConnect();

  try {
    await FeatureFlagModel.findOneAndUpdate(
      { name: featureFlag.name },
      featureFlag,
      { new: true, lean: true },
    ).exec();

    return [null, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

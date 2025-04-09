import dbConnect from "@/server/dbConnect";
import { FeatureFlagModel } from "@/server/models";
import { ApiResponse, FeatureFlag } from "@/types";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createFeatureFlag(
  featureFlag: FeatureFlag,
): Promise<ApiResponse<null>> {
  await dbConnect();

  try {
    await FeatureFlagModel.create(featureFlag);

    return [null, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
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

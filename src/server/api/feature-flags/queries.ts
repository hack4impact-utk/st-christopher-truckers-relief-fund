import dbConnect from "@/server/dbConnect";
import { FeatureFlagModel } from "@/server/models";

export async function getFeatureFlag(name: string): Promise<boolean> {
  await dbConnect();

  try {
    const featureFlag = await FeatureFlagModel.findOne({ name });

    if (!featureFlag) {
      return false;
    }

    return featureFlag.enabled;
  } catch (error) {
    console.error(error);
    return false;
  }
}

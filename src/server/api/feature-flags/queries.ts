import { FeatureFlagModel } from "@/server/models";
import { findOne } from "@/utils/db/find";

export async function getFeatureFlag(name: string): Promise<boolean> {
  const [featureFlag, error] = await findOne(FeatureFlagModel, {
    filters: { name },
  });

  if (error !== null) {
    return false;
  }

  return featureFlag.enabled;
}

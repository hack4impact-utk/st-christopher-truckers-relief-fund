import dbConnect from "@/server/dbConnect";
import { HealthyHabitsTrackingFormModel } from "@/server/models";
import { ApiResponse, HealthyHabitsTrackingForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

import { getUserByEmail } from "../users/queries";

export async function getHealthyHabitsTrackingForm(
  email: string,
  weekOfSubmission: string,
): Promise<ApiResponse<HealthyHabitsTrackingForm>> {
  await dbConnect();

  try {
    const [user] = await getUserByEmail(email);

    if (!user) {
      return [
        null,
        apiErrors.healthyHabitsTrackingForm.healthyHabitsTrackingFormNotFound,
      ];
    }

    const healthyHabitsTrackingForm =
      await HealthyHabitsTrackingFormModel.findOne({
        user: user._id,
        weekOfSubmission,
      })
        .lean<HealthyHabitsTrackingForm>()
        .exec();

    if (!healthyHabitsTrackingForm) {
      return [
        null,
        apiErrors.healthyHabitsTrackingForm.healthyHabitsTrackingFormNotFound,
      ];
    }

    return [serializeMongooseObject(healthyHabitsTrackingForm), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

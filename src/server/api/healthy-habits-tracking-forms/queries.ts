import { HealthyHabitsTrackingFormModel } from "@/server/models";
import { ApiResponse, HealthyHabitsTrackingForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { findOne } from "@/utils/db/find";

import { getUserByEmail } from "../users/queries";

export async function getHealthyHabitsTrackingForm(
  email: string,
  weekOfSubmission: string,
): Promise<ApiResponse<HealthyHabitsTrackingForm>> {
  const [user, userError] = await getUserByEmail(email);

  if (userError !== null) {
    return [null, apiErrors.notFound];
  }

  const [healthyHabitsTrackingForm, error] = await findOne(
    HealthyHabitsTrackingFormModel,
    {
      filters: {
        user: user._id,
        weekOfSubmission,
      },
    },
  );

  if (error !== null) {
    return [null, error];
  }

  return [healthyHabitsTrackingForm, null];
}

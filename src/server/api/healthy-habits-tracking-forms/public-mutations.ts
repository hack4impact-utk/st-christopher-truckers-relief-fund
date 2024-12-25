"use server";

import { createHealthyHabitsTrackingForm } from "@/server/api/healthy-habits-tracking-forms/private-mutations";
import { ApiResponse, HealthyHabitsTrackingForm } from "@/types";

export async function handleHealthyHabitsTrackingFormSubmission(
  healthyHabitsTrackingForm: HealthyHabitsTrackingForm,
): Promise<ApiResponse<null>> {
  const [, error] = await createHealthyHabitsTrackingForm(
    healthyHabitsTrackingForm,
  );

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}

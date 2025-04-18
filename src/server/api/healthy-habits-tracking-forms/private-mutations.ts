import { HealthyHabitsTrackingFormModel } from "@/server/models";
import { ApiResponse, HealthyHabitsTrackingForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { create } from "@/utils/db/create";
import { findByIdAndDelete } from "@/utils/db/delete";

import { getHealthyHabitsTrackingForm } from "./queries";

export async function createHealthyHabitsTrackingForm(
  healthyHabitsTrackingForm: HealthyHabitsTrackingForm,
): Promise<ApiResponse<HealthyHabitsTrackingForm>> {
  const [existingHealthyHabitsTrackingForm] =
    await getHealthyHabitsTrackingForm(
      healthyHabitsTrackingForm.user.email,
      healthyHabitsTrackingForm.weekOfSubmission,
    );

  if (existingHealthyHabitsTrackingForm) {
    return [null, apiErrors.duplicate];
  }

  return await create(
    HealthyHabitsTrackingFormModel,
    healthyHabitsTrackingForm,
  );
}

export async function deleteHealthyHabitsTrackingForm(
  form: HealthyHabitsTrackingForm,
): Promise<ApiResponse<HealthyHabitsTrackingForm>> {
  return await findByIdAndDelete(HealthyHabitsTrackingFormModel, form._id!);
}

import { getHealthyHabitsTrackingForm } from "@/server/api/healthy-habits-tracking-forms/queries";
import dbConnect from "@/server/dbConnect";
import { HealthyHabitsTrackingFormModel, UserModel } from "@/server/models";
import { ApiResponse, HealthyHabitsTrackingForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function createHealthyHabitsTrackingForm(
  healthyHabitsTrackingForm: HealthyHabitsTrackingForm,
): Promise<ApiResponse<HealthyHabitsTrackingForm>> {
  await dbConnect();

  try {
    const [existingHealthyHabitsTrackingForm] =
      await getHealthyHabitsTrackingForm(
        healthyHabitsTrackingForm.user.email,
        healthyHabitsTrackingForm.submittedDate,
      );

    if (existingHealthyHabitsTrackingForm) {
      return [
        null,
        apiErrors.healthyHabitsTrackingForm
          .healthyHabitsTrackingFormAlreadyExists,
      ];
    }

    const newHealthyHabitsTrackingFormDocument =
      await HealthyHabitsTrackingFormModel.create(healthyHabitsTrackingForm);

    const newHealthyHabitsTrackingForm =
      newHealthyHabitsTrackingFormDocument.toObject();

    // Update the User's healthyHabitsTrackingForms array with the new form ID
    await UserModel.findByIdAndUpdate(healthyHabitsTrackingForm.user._id, {
      $push: { healthyHabitsTrackingForms: newHealthyHabitsTrackingForm._id },
    });

    return [serializeMongooseObject(newHealthyHabitsTrackingForm), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

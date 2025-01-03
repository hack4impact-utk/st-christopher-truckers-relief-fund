import { getHealthyHabitsTrackingForm } from "@/server/api/healthy-habits-tracking-forms/queries";
import dbConnect from "@/server/dbConnect";
import { HealthyHabitsTrackingFormModel } from "@/server/models";
import { ApiResponse, HealthyHabitsTrackingForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createHealthyHabitsTrackingForm(
  healthyHabitsTrackingForm: HealthyHabitsTrackingForm,
): Promise<ApiResponse<HealthyHabitsTrackingForm>> {
  await dbConnect();

  try {
    const [existingHealthyHabitsTrackingForm] =
      await getHealthyHabitsTrackingForm({
        email: healthyHabitsTrackingForm.email,
        submittedDate: healthyHabitsTrackingForm.submittedDate,
      });

    if (existingHealthyHabitsTrackingForm) {
      return [
        null,
        apiErrors.healthyHabitsTrackingForm
          .healthyHabitsTrackingFormAlreadyExists,
      ];
    }

    const newHealthyHabitsTrackingFormDocument =
      await HealthyHabitsTrackingFormModel.create(healthyHabitsTrackingForm);

    // convert ObjectId to string
    const newHealthyHabitsTrackingForm =
      newHealthyHabitsTrackingFormDocument.toObject();
    newHealthyHabitsTrackingForm._id = String(newHealthyHabitsTrackingForm._id);

    return [newHealthyHabitsTrackingForm, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

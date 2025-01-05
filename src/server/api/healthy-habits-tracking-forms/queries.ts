import dbConnect from "@/server/dbConnect";
import { HealthyHabitsTrackingFormModel } from "@/server/models";
import { ApiResponse, HealthyHabitsTrackingForm } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

type HealthyHabitsTrackingFormFilters = Partial<HealthyHabitsTrackingForm>;

async function getHealthyHabitsTrackingForms(
  filters: HealthyHabitsTrackingFormFilters,
): Promise<ApiResponse<HealthyHabitsTrackingForm[]>> {
  await dbConnect();

  try {
    const healthyHabitsTrackingForms =
      await HealthyHabitsTrackingFormModel.find(filters)
        .lean<HealthyHabitsTrackingForm[]>()
        .exec();

    // convert ObjectId to string
    healthyHabitsTrackingForms.forEach((healthyHabitsTrackingForm) => {
      healthyHabitsTrackingForm._id = String(healthyHabitsTrackingForm._id);
    });

    return [healthyHabitsTrackingForms, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

export async function getHealthyHabitsTrackingForm(
  filters: HealthyHabitsTrackingFormFilters,
): Promise<ApiResponse<HealthyHabitsTrackingForm>> {
  await dbConnect();

  try {
    const healthyHabitsTrackingForm =
      await HealthyHabitsTrackingFormModel.findOne(filters)
        .lean<HealthyHabitsTrackingForm>()
        .exec();

    if (!healthyHabitsTrackingForm) {
      return [
        null,
        apiErrors.healthyHabitsTrackingForm.healthyHabitsTrackingFormNotFound,
      ];
    }

    // convert ObjectId to string
    healthyHabitsTrackingForm._id = String(healthyHabitsTrackingForm._id);

    return [healthyHabitsTrackingForm, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

export async function getHealthyHabitsTrackingFormsByEmail(email: string) {
  return getHealthyHabitsTrackingForms({ email });
}

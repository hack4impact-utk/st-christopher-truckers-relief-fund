import dbConnect from "@/server/dbConnect";
import { FagerstromTestModel, UserModel } from "@/server/models";
import { ApiResponse, FagerstromTest } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function createFagerstromTest(
  fagerstromTest: FagerstromTest,
): Promise<ApiResponse<FagerstromTest>> {
  await dbConnect();

  try {
    const newFagerstromTestDocument =
      await FagerstromTestModel.create(fagerstromTest);

    const newFagerstromTest = newFagerstromTestDocument.toObject();

    // update the user's fagerstrom tests array with the new form ID
    await UserModel.findByIdAndUpdate(fagerstromTest.client._id, {
      $push: { fagerstromTests: newFagerstromTest._id },
    });

    return [serializeMongooseObject(newFagerstromTest), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function deleteFagerstromTest(
  fagerstromTest: FagerstromTest,
): Promise<ApiResponse<null>> {
  await dbConnect();

  try {
    const deletedFagerstromTest = await FagerstromTestModel.findByIdAndDelete(
      fagerstromTest._id,
    ).exec();

    if (!deletedFagerstromTest) {
      return [null, apiErrors.fagerstromTest.fagerstromTestNotFound];
    }

    // delete the user's fagerstrom test if it exists
    await UserModel.findByIdAndUpdate(fagerstromTest.client._id, {
      $pull: { fagerstromTests: fagerstromTest._id },
    });

    return [null, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

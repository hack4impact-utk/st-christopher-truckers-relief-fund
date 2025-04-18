import dbConnect from "@/server/dbConnect";
import { FagerstromTestModel, UserModel } from "@/server/models";
import { ApiResponse, FagerstromTest } from "@/types";
import { findByIdAndDelete } from "@/utils/db/delete";
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
  const [, error] = await findByIdAndDelete(
    FagerstromTestModel,
    fagerstromTest._id!,
  );

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}

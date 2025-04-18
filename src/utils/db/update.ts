import { Model } from "mongoose";

import dbConnect from "@/server/dbConnect";
import { ApiResponse } from "@/types";

import apiErrors from "../constants/apiErrors";
import handleMongooseError from "../handleMongooseError";
import { serializeMongooseObject } from "../serializeMongooseObject";

// Enforces that T has an _id field of type string
type WithId = { _id?: string };

export async function findOneAndUpdate<T extends WithId>(
  model: Model<T>,
  newObject: T,
): Promise<ApiResponse<T>> {
  await dbConnect();

  try {
    const updatedObject = await model
      .findOneAndUpdate({ _id: newObject._id }, newObject, {
        new: true,
        lean: true,
      })
      .exec();

    if (!updatedObject) {
      return [null, apiErrors.notFound];
    }

    return [serializeMongooseObject(updatedObject) as T, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

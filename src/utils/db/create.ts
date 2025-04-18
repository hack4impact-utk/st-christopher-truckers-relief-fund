import { Model } from "mongoose";

import dbConnect from "@/server/dbConnect";
import { ApiResponse } from "@/types";

import handleMongooseError from "./handleMongooseError";
import { serializeMongooseObject } from "./serializeMongooseObject";

export async function create<T>(
  model: Model<T>,
  object: T,
): Promise<ApiResponse<T>> {
  await dbConnect();

  try {
    const newObjectDocument = await model.create(object);

    const newObject = newObjectDocument.toObject();

    return [serializeMongooseObject(newObject) as T, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

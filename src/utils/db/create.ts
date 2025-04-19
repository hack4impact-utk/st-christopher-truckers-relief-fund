/* eslint-disable @typescript-eslint/no-explicit-any */
import { HydratedDocument, Model, PopulateOptions } from "mongoose";

import dbConnect from "@/server/dbConnect";
import { ApiResponse } from "@/types";

import handleMongooseError from "./handleMongooseError";
import { serializeMongooseObject } from "./serializeMongooseObject";

type CreateOptions = {
  populate?: PopulateOptions | (string | PopulateOptions)[];
};

export async function create<T>(
  model: Model<T>,
  object: T,
  options: CreateOptions = {},
): Promise<ApiResponse<T>> {
  const { populate } = options;
  await dbConnect();

  try {
    let newObjectDocument: HydratedDocument<T> = await model.create(object);

    if (populate) {
      newObjectDocument = await (newObjectDocument as any).populate(populate);
    }

    const newObject = newObjectDocument.toObject();

    return [serializeMongooseObject(newObject) as T, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

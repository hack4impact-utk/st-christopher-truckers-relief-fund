import { FilterQuery, Model } from "mongoose";

import dbConnect from "@/server/dbConnect";
import { ApiResponse } from "@/types";

import apiErrors from "../constants/apiErrors";
import handleMongooseError from "./handleMongooseError";
import { serializeMongooseObject } from "./serializeMongooseObject";

export async function findOneAndDelete<T>(
  model: Model<T>,
  filter: FilterQuery<T>,
): Promise<ApiResponse<T>> {
  await dbConnect();

  try {
    const result = await model.findOneAndDelete(filter).exec();

    if (!result) {
      return [null, apiErrors.notFound];
    }

    return [serializeMongooseObject(result) as T, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function findByIdAndDelete<T>(
  model: Model<T>,
  id: string,
): Promise<ApiResponse<T>> {
  await dbConnect();

  try {
    const result = await model.findByIdAndDelete(id).exec();

    if (!result) {
      return [null, apiErrors.notFound];
    }

    return [serializeMongooseObject(result) as T, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

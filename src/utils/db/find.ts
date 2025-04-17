import { FilterQuery, Model, PopulateOptions } from "mongoose";

import dbConnect from "@/server/dbConnect";
import { ApiResponse } from "@/types";

import apiErrors from "../constants/apiErrors";
import handleMongooseError from "../handleMongooseError";

type FindOneByIdOptions = {
  populate?: PopulateOptions | (string | PopulateOptions)[];
};

export async function findOneById<T>(
  model: Model<T>,
  id: string,
  options: FindOneByIdOptions = {},
): Promise<ApiResponse<T>> {
  await dbConnect();

  const { populate } = options;

  try {
    let query = model.findById(id);

    if (populate) {
      query = query.populate(populate);
    }

    const result = await query.lean<T>().exec();

    if (!result) {
      return [null, apiErrors.notFound];
    }

    return [result as T, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

type FindOneOptions<T> = {
  filters?: FilterQuery<T>;
  populate?: PopulateOptions | (string | PopulateOptions)[];
};

export async function findOne<T>(
  model: Model<T>,
  options: FindOneOptions<T> = {},
): Promise<ApiResponse<T>> {
  await dbConnect();

  const { filters = {}, populate } = options;

  try {
    let query = model.findOne(filters);

    if (populate) {
      query = query.populate(populate);
    }

    const result = await query.lean<T>().exec();

    if (!result) {
      return [null, apiErrors.notFound];
    }

    return [result as T, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

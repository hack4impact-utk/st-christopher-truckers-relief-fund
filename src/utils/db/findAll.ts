import { FilterQuery, Model, PopulateOptions } from "mongoose";

import dbConnect from "@/server/dbConnect";
import { ApiResponse } from "@/types";

import handleMongooseError from "../handleMongooseError";

type FindAllOptions<T> = {
  filter?: FilterQuery<T>;
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1 | "asc" | "desc">;
  populate?: PopulateOptions | (string | PopulateOptions)[];
  fetchAll?: boolean;
};

type FindAllResponse<T> = {
  results: T[];
  count: number;
  total: number;
};

export async function findAll<T>(
  model: Model<T>,
  options: FindAllOptions<T> = {},
): Promise<ApiResponse<FindAllResponse<T>>> {
  await dbConnect();

  const {
    filter = {},
    page = 0,
    limit = 10,
    sort = {},
    populate,
    fetchAll = false,
  } = options;

  try {
    const query = model.find(filter).sort(sort);

    if (populate) {
      query.populate(populate);
    }

    if (!fetchAll) {
      const skip = page * limit;
      query.skip(skip).limit(limit);
    }

    const [results, total] = await Promise.all([
      query.lean<T[]>().exec(),
      model.countDocuments(filter),
    ]);

    return [
      {
        results: results,
        count: results.length,
        total,
      },
      null,
    ];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

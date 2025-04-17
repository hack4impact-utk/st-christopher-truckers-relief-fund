import { PopulateOptions } from "mongoose";

import { UserModel } from "@/server/models";
import { ApiResponse, ClientUser, User } from "@/types";
import { findOne } from "@/utils/db/find";
import { findAll } from "@/utils/db/findAll";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

type UserFilters = Partial<User>;

type UserPopulateOptions = {
  populateHealthyHabitsTrackingForms?: boolean;
  populateProgramEnrollments?: boolean;
  populateEnrollmentForm?: boolean;
  populateFagerstromTests?: boolean;
  populateScreeningRequests?: boolean;
  populateVaccineVoucherRequests?: boolean;
};

function getUserPopulateArray(
  options?: UserPopulateOptions,
): PopulateOptions[] {
  const populationArray: PopulateOptions[] = [];

  if (options?.populateHealthyHabitsTrackingForms) {
    populationArray.push({
      path: "healthyHabitsTrackingForms",
      options: { sort: { weekOfSubmission: -1 } },
    });
  }

  if (options?.populateProgramEnrollments) {
    populationArray.push({
      path: "programEnrollments",
      populate: {
        path: "user",
      },
    });
  }

  if (options?.populateEnrollmentForm) {
    populationArray.push({
      path: "enrollmentForm",
    });
  }

  if (options?.populateFagerstromTests) {
    populationArray.push({
      path: "fagerstromTests",
      options: { sort: { submittedDate: -1 } },
    });
  }

  if (options?.populateScreeningRequests) {
    populationArray.push({
      path: "screeningRequests",
      options: { sort: { submittedDate: -1 } },
      populate: {
        path: "user",
      },
    });
  }

  if (options?.populateVaccineVoucherRequests) {
    populationArray.push({
      path: "vaccineVoucherRequests",
      options: { sort: { submittedDate: -1 } },
      populate: {
        path: "user",
      },
    });
  }

  return populationArray;
}

async function getUser(
  filters: UserFilters,
  options?: UserPopulateOptions,
): Promise<ApiResponse<User>> {
  const [user, error] = await findOne(UserModel, {
    filters,
    populate: getUserPopulateArray(options),
  });

  if (error !== null) {
    return [null, error];
  }

  return [serializeMongooseObject(user), null];
}

export async function getUserByEmail(
  email: string,
  options?: UserPopulateOptions,
): Promise<ApiResponse<User>> {
  return getUser({ email }, options);
}

export async function getUserById(id: string): Promise<ApiResponse<User>> {
  return getUser({ _id: id });
}

export async function getUsers(
  filters: UserFilters,
  options?: UserPopulateOptions,
): Promise<ApiResponse<User[]>> {
  const [response, error] = await findAll(UserModel, {
    filter: filters,
    populate: getUserPopulateArray(options),
  });

  if (error !== null) {
    return [null, error];
  }

  return [serializeMongooseObject(response.results), null];
}

export async function getClients(
  options?: UserPopulateOptions,
): Promise<ApiResponse<ClientUser[]>> {
  return getUsers({ role: "client" }, options) as unknown as Promise<
    ApiResponse<ClientUser[]>
  >;
}

type GetPaginatedClientsParams = {
  page: number;
  pageSize: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  options?: UserPopulateOptions;
};

export async function getPaginatedClients({
  page,
  pageSize,
  search = "",
  sortField = "lastName",
  sortOrder = "asc",
  options,
}: GetPaginatedClientsParams): Promise<ApiResponse<[ClientUser[], number]>> {
  const filters: Record<string, unknown> = {
    role: "client",
  };

  if (search) {
    const searchRegex = new RegExp(search, "i");
    filters.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { email: searchRegex },
      { phoneNumber: searchRegex },
    ];
  }
  const [response, error] = await findAll(UserModel, {
    filter: filters,
    populate: getUserPopulateArray(options),
    sort: {
      [sortField]: sortOrder,
    },
    page: page,
    limit: pageSize,
  });

  if (error !== null) {
    return [null, error];
  }

  return [[serializeMongooseObject(response.results), response.total], null];
}

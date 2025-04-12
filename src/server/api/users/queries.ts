import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, ClientUser, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
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

async function getUser(
  filters: UserFilters,
  options?: UserPopulateOptions,
): Promise<ApiResponse<User>> {
  await dbConnect();

  try {
    const userQuery = UserModel.findOne(filters);

    if (options?.populateHealthyHabitsTrackingForms) {
      userQuery.populate({
        path: "healthyHabitsTrackingForms",
        options: { sort: { weekOfSubmission: -1 } },
      });
    }

    if (options?.populateProgramEnrollments) {
      userQuery.populate({
        path: "programEnrollments",
        populate: {
          path: "user",
        },
      });
    }

    if (options?.populateEnrollmentForm) {
      userQuery.populate("enrollmentForm");
    }

    if (options?.populateFagerstromTests) {
      userQuery.populate({
        path: "fagerstromTests",
        options: { sort: { submittedDate: -1 } },
      });
    }

    if (options?.populateScreeningRequests) {
      userQuery.populate({
        path: "screeningRequests",
        options: { sort: { submittedDate: -1 } },
        populate: {
          path: "user",
        },
      });
    }

    if (options?.populateVaccineVoucherRequests) {
      userQuery.populate({
        path: "vaccineVoucherRequests",
        options: { sort: { submittedDate: -1 } },
        populate: {
          path: "user",
        },
      });
    }

    const user = await userQuery.lean<User>().exec();

    if (!user) {
      return [null, apiErrors.user.userNotFound];
    }

    return [serializeMongooseObject(user), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
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
  await dbConnect();

  try {
    const usersQuery = UserModel.find(filters);

    if (options?.populateHealthyHabitsTrackingForms) {
      usersQuery.populate({
        path: "healthyHabitsTrackingForms",
        options: { sort: { submittedDate: -1 } },
      });
    }

    if (options?.populateProgramEnrollments) {
      usersQuery.populate({
        path: "programEnrollments",
        populate: {
          path: "user",
        },
      });
    }

    if (options?.populateEnrollmentForm) {
      usersQuery.populate("enrollmentForm");
    }

    if (options?.populateFagerstromTests) {
      usersQuery.populate({
        path: "fagerstromTests",
        options: { sort: { submittedDate: -1 } },
      });
    }

    if (options?.populateScreeningRequests) {
      usersQuery.populate({
        path: "screeningRequests",
        options: { sort: { submittedDate: -1 } },
        populate: {
          path: "user",
        },
      });
    }

    if (options?.populateVaccineVoucherRequests) {
      usersQuery.populate({
        path: "vaccineVoucherRequests",
        options: { sort: { submittedDate: -1 } },
        populate: {
          path: "user",
        },
      });
    }

    const users = await usersQuery.lean<User>().exec();

    if (!users) {
      return [null, apiErrors.user.userNotFound];
    }

    return [serializeMongooseObject(users), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
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
  await dbConnect();

  try {
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

    const sort = {
      [sortField]: sortOrder,
    };

    const usersQuery = UserModel.find(filters)
      .sort(sort)
      .skip(page * pageSize)
      .limit(pageSize);

    if (options?.populateHealthyHabitsTrackingForms) {
      usersQuery.populate({
        path: "healthyHabitsTrackingForms",
        options: { sort: { submittedDate: -1 } },
      });
    }

    if (options?.populateProgramEnrollments) {
      usersQuery.populate({
        path: "programEnrollments",
        populate: {
          path: "user",
        },
      });
    }

    if (options?.populateEnrollmentForm) {
      usersQuery.populate("enrollmentForm");
    }

    if (options?.populateFagerstromTests) {
      usersQuery.populate({
        path: "fagerstromTests",
        options: { sort: { submittedDate: -1 } },
      });
    }

    if (options?.populateScreeningRequests) {
      usersQuery.populate({
        path: "screeningRequests",
        options: { sort: { submittedDate: -1 } },
        populate: {
          path: "user",
        },
      });
    }

    if (options?.populateVaccineVoucherRequests) {
      usersQuery.populate({
        path: "vaccineVoucherRequests",
        options: { sort: { submittedDate: -1 } },
        populate: {
          path: "user",
        },
      });
    }

    const [users, count] = await Promise.all([
      usersQuery.lean<User>().exec(),
      UserModel.countDocuments(filters),
    ]);

    return [[serializeMongooseObject(users), count], null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

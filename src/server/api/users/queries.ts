import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

type UserFilters = Partial<User>;

async function getUsers(filters: UserFilters): Promise<ApiResponse<User[]>> {
  await dbConnect();
  try {
    const users = await UserModel.find(filters).lean<User[]>().exec();

    if (!users) {
      return { success: false, error: apiErrors.user.userNotFound };
    }

    // convert ObjectId to string
    users.forEach((user) => {
      user._id = String(user._id);
    });

    return { success: true, data: users };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}

async function getUser(filters: UserFilters): Promise<ApiResponse<User>> {
  await dbConnect();
  try {
    const user = await UserModel.findOne(filters).lean<User>().exec();

    if (!user) {
      return { success: false, error: apiErrors.user.userNotFound };
    }

    // convert ObjectId to string
    user._id = String(user._id);

    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}

export async function getAllUsers(): Promise<ApiResponse<User[]>> {
  return getUsers({});
}

export async function getUserByEmail(
  email: string,
): Promise<ApiResponse<User>> {
  return getUser({ email });
}

export async function getUserById(id: string): Promise<ApiResponse<User>> {
  return getUser({ _id: id });
}

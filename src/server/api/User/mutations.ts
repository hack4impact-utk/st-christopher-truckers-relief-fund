"use server";

import { ApiResponse, User } from "@/types";
import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { getUserByEmail } from "./queries";
import bcrypt from "bcrypt";
import handleMongooseError from "@/utils/handleMongooseError";
import apiErrors from "@/utils/constants/apiErrors";

export async function createUser(user: User): Promise<ApiResponse<User>> {
  await dbConnect();

  try {
    // don't create user if one already exists
    const existingUser = await getUserByEmail(user.email);
    if (existingUser.success) {
      return { success: false, error: apiErrors.user.userAlreadyExists };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUserDocument = await UserModel.create(user);

    // convert ObjectId to string
    const newUser = newUserDocument.toObject();
    newUser._id = String(newUser._id);

    return { success: true, data: newUser };
  } catch (error) {
    console.error(error);
    return { success: false, error: handleMongooseError(error) };
  }
}

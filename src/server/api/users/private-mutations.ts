import bcrypt from "bcrypt";
import mongoose from "mongoose";

import { AdminUserRequest } from "@/app/api/users/actions/create-admin-account/route";
import dbConnect from "@/server/dbConnect";
import { ProgramEnrollmentModel, UserModel } from "@/server/models";
import {
  AdminUser,
  ApiResponse,
  ClientUser,
  ProgramEnrollment,
  User,
} from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";
import dayjsUtil from "@/utils/dayjsUtil";
import handleMongooseError from "@/utils/handleMongooseError";

import { getUserByEmail } from "./queries";

export async function createAdminUser(
  adminUserRequest: AdminUserRequest,
): Promise<ApiResponse<AdminUser>> {
  await dbConnect();

  try {
    const [existingUser] = await getUserByEmail(adminUserRequest.email);

    if (existingUser) {
      return [null, apiErrors.user.userAlreadyExists];
    }

    const objectid = new mongoose.Types.ObjectId().toString();
    const user: User = {
      _id: objectid,
      firstName: adminUserRequest.firstName,
      lastName: adminUserRequest.lastName,
      email: adminUserRequest.email,
      password: adminUserRequest.password,
      role: "admin",
      dateCreated: dayjsUtil.utc().toISOString(),
      isEmailVerified: false,
    };

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    user.dateCreated = dayjsUtil.utc().toISOString();

    const adminUserDocument = await UserModel.create(user);

    const adminUser = adminUserDocument.toObject() as AdminUser;

    return [adminUser, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function createClientUser(
  user: ClientUser,
): Promise<ApiResponse<ClientUser>> {
  await dbConnect();

  try {
    // don't create user if one already exists
    const [userInDatabase] = await getUserByEmail(user.email);

    if (userInDatabase) {
      return [null, apiErrors.user.userAlreadyExists];
    }

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUserDocument = await UserModel.create(user);

    const newUser = newUserDocument.toObject() as ClientUser;

    return [newUser, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

export async function updateUser(newUser: User): Promise<ApiResponse<User>> {
  await dbConnect();

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: newUser._id },
    newUser,
    { new: true, lean: true },
  ).exec();

  if (!updatedUser) {
    return [null, apiErrors.user.userNotFound];
  }

  return [updatedUser, null];
}

export async function changePassword(
  email: string,
  oldPassword: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  await dbConnect();

  const [session, sessionError] = await authenticateServerFunction();

  if (sessionError !== null) {
    return [null, sessionError];
  }

  if (oldPassword.length < 8 || newPassword.length < 8) {
    return [null, apiErrors.user.userInvalidCredentials];
  }

  if (session.user.email !== email) {
    return [null, apiErrors.user.userInvalidCredentials];
  }

  const [user, userError] = await getUserByEmail(email);

  if (userError !== null) {
    return [null, userError];
  }

  const doesOldPasswordsMatch = await bcrypt.compare(
    oldPassword,
    user.password,
  );

  if (!doesOldPasswordsMatch) {
    return [null, apiErrors.user.userInvalidCredentials];
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await updateUser(user);

  return [null, null];
}

export async function getUsersByProgram(
  programName: string,
): Promise<ApiResponse<User[]>> {
  await dbConnect();

  try {
    // Find program enrollments for the given program and populate the associated users
    const enrollments = await ProgramEnrollmentModel.find({
      program: programName,
    })
      .populate("user")
      .lean()
      .exec();

    const users = enrollments.map(
      (enrollment: ProgramEnrollment) => enrollment.user,
    );

    return [users, null];
  } catch (error) {
    console.error(error);
    return [null, "Error fetching users by program."];
  }
}

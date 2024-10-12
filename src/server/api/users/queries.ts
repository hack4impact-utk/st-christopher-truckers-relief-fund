import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function getUserByEmail(
  email: string,
): Promise<ApiResponse<User>> {
  await dbConnect();
  try {
    const user = await UserModel.findOne({ email }).lean<User>().exec();

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

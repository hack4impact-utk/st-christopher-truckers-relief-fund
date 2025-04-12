/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

export function serializeMongooseObject(data: any): any {
  if (data == null) {
    return null;
  }

  if (data === undefined) {
    return undefined;
  }

  // Handle ObjectId specifically
  if (data instanceof mongoose.Types.ObjectId) {
    return data.toString();
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(serializeMongooseObject);
  }

  // Handle objects
  if (typeof data === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (key == "password") {
        result[key] = "";
        continue;
      }
      result[key] = serializeMongooseObject(value);
    }
    return result;
  }

  // Return primitives as is
  return data;
}

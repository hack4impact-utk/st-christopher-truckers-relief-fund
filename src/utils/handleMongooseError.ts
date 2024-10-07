import mongoose from "mongoose";
import apiErrors from "./constants/apiErrors";

// hand back specific error messages for Mongoose-related errors
export default function handleMongooseError(error: unknown): string {
  if (error instanceof mongoose.Error.CastError) {
    return apiErrors.mongoose.CastError;
  } else if (error instanceof mongoose.Error.DivergentArrayError) {
    return apiErrors.mongoose.DivergentArrayError;
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return apiErrors.mongoose.DocumentNotFoundError;
  } else if (error instanceof mongoose.Error.MissingSchemaError) {
    return apiErrors.mongoose.MissingSchemaError;
  } else if (error instanceof mongoose.Error.MongooseServerSelectionError) {
    return apiErrors.mongoose.MongooseServerSelectionError;
  } else if (error instanceof mongoose.Error.OverwriteModelError) {
    return apiErrors.mongoose.OverwriteModelError;
  } else if (error instanceof mongoose.Error.ParallelSaveError) {
    return apiErrors.mongoose.ParallelSaveError;
  } else if (error instanceof mongoose.Error.StrictModeError) {
    return apiErrors.mongoose.StrictModeError;
  } else if (error instanceof mongoose.Error.StrictPopulateError) {
    return apiErrors.mongoose.StrictPopulateError;
  } else if (error instanceof mongoose.Error.ValidationError) {
    return apiErrors.mongoose.ValidationError;
  } else if (error instanceof mongoose.Error.ValidatorError) {
    return apiErrors.mongoose.ValidatorError;
  } else if (error instanceof mongoose.Error.VersionError) {
    return apiErrors.mongoose.VersionError;
  } else {
    return "An unknown error occurred with Mongoose.";
  }
}

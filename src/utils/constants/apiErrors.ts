const apiErrors = {
  unauthorized: "You must be logged in to access this resource",
  notFound: "The requested resource was not found",
  duplicate: "The requested resource already exists",
  mongoose: {
    CastError: "Error casting value",
    DivergentArrayError: "You modified an array in the middle of a save.",
    DocumentNotFoundError: "No document found with the specified criteria.",
    MissingSchemaError: "The schema for the requested model is not defined.",
    MongooseServerSelectionError: "Failed to connect to MongoDB.",
    OverwriteModelError: "Attempted to overwrite an existing model.",
    ParallelSaveError: "Multiple concurrent saves to the same document.",
    StrictModeError:
      "Field not defined in the schema was attempted to be saved.",
    StrictPopulateError: "Invalid population path based on the schema.",
    ValidationError: "Schema validation failed.",
    ValidatorError: "Custom validator failed for a schema path.",
    VersionError: "Document version mismatch, likely due to parallel saves.",
  },
  user: {
    userInvalidCredentials: "User's credentials are invalid",
  },
  passwordResetToken: {
    passwordResetTokenExpired: "Password reset token expired",
  },
};

export default apiErrors;

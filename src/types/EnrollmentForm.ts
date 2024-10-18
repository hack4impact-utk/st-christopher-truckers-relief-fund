import z from "zod";

export const generalInformationValidator = z
  .object({
    hasAcknowledgedPrivacyNotice: z.boolean().refine((val) => val, {
      message: "You must acknowledge the privacy notice",
    }),
    hasAcknowledgedHipaaNotice: z.boolean().refine((val) => val, {
      message: "You must acknowledge the HIPAA notice",
    }),
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    address: z.string().min(1, { message: "Address is required" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    hasClassACdl: z.boolean(),
    classBDescription: z.string().optional(), // Required if hasClassACdl is false
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    healthConditions: z.string().optional(),
    recentIllnessOrInjuryDetails: z.string().optional(),
    drivesSemiTruckOverRoad: z.boolean(),
    isUsCitizen: z.boolean(),
    referralSource: z.string().optional(),
    doctors: z
      .array(
        z.object({
          name: z.string().min(1, { message: "Doctor's name is required" }),
          phone: z.string().min(10, {
            message: "Doctor's phone number must be at least 10 digits",
          }),
        }),
      )
      .optional(),
    employer: z
      .object({
        name: z.string().optional(),
        contact: z.string().optional(),
      })
      .optional(),
    monthlyHouseholdExpenses: z
      .number()
      .min(0, { message: "Expenses must be non-negative" }),
    ownerOperatorInfo: z
      .object({
        businessIncome: z.number().optional(),
        businessExpenses: z.number().optional(),
      })
      .optional(),
    healthMetrics: z.object({
      isDiabetic: z.boolean(),
      hasHighBloodPressure: z.boolean(),
      hasHighCholesterol: z.boolean(),
      hasHeartDisease: z.boolean(),
      isObese: z.boolean(),
      a1c: z.number().optional(),
      bloodGlucose: z.number().optional(),
      cholesterol: z.number().optional(),
      weight: z.number(),
      bloodPressure: z.string().optional(), // Assuming blood pressure in string format like "120/80"
      other: z.string().optional(),
    }),
    healthGoals: z.object({
      shortTerm: z.string(),
      longTerm: z.string(),
    }),
    devices: z.array(z.string()).optional(), // List of devices like "scale", "glucose monitor", etc.
  })
  .superRefine((val, ctx) => {
    // Add custom conditional validation for classBDescription
    if (val.hasClassACdl === false && !val.classBDescription) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Class B Description is required if you don't have a Class A CDL",
        path: ["classBDescription"],
      });

      if (val.password !== val.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    }
  });

export type GeneralInformationFormValues = z.infer<
  typeof generalInformationValidator
>;

// The enrollment form type is the union of all sub-form types
export type EnrollmentForm = GeneralInformationFormValues & {
  _id?: string;
  dateCreated: string;
};

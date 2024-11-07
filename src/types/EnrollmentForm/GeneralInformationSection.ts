import dayjs from "dayjs";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const doctorSchema = z.object({
  name: z.string().min(1, { message: "Doctor's name is required" }),
  phone: z
    .string()
    .refine(
      (val) => isValidPhoneNumber(val, { defaultCountry: "US" }),
      "Invalid phone number",
    )
    .transform((val) => parsePhoneNumber(val, "US").number.toString()),
  id: z.string(),
});

export type Doctor = z.infer<typeof doctorSchema>;

export const generalInformationSectionValidator = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    dateOfBirth: z.string().refine((val) => dayjs(val).isValid(), {
      message: "Invalid date format",
    }),
    sex: z.enum(["male", "female"]),
    phoneNumber: z
      .string()
      .refine(
        (val) => isValidPhoneNumber(val, { defaultCountry: "US" }),
        "Invalid phone number",
      )
      .transform((val) => parsePhoneNumber(val, "US").number.toString()),
    address: z.string().min(1, { message: "Address is required" }),
    preferredMethodOfContact: z.enum(["text", "email", "phone"]),
    isUsCitizen: z.boolean(),
    hasClassACdl: z.boolean(),
    cdlNumber: z.string().optional(), // Required if hasClassACdl is true
    truckingIndustryAffiliation: z.enum(["driver", "spouse", "other"]),
    jobDescription: z.enum([
      "OTR Driver, away 4+ nights a week",
      "Regional Driver, away 4+ nights a week",
      "Regional Driver",
      "Local Driver",
      "Other",
    ]),
    referralSource: z.string(),
    employer: z.object({
      name: z.string().optional(),
      contact: z.string().optional(),
    }),
    doctors: z.array(doctorSchema),
    monthlyHouseholdExpenses: z
      .number()
      .min(0, { message: "Expenses must be non-negative" }),
    isOwnerOperator: z.boolean(),
    ownerOperatorInfo: z.object({
      businessIncome: z.number().optional(),
      businessExpenses: z.number().optional(),
    }),
    hasAcknowledgedPrivacyNotice: z.boolean().refine((val) => val, {
      message: "You must acknowledge the privacy notice",
    }),
    hasAcknowledgedHipaaNotice: z.boolean().refine((val) => val, {
      message: "You must acknowledge the HIPAA notice",
    }),
  })
  .superRefine((val, ctx) => {
    // Add custom conditional validation for CDL
    if (val.hasClassACdl === true && !val.cdlNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CDL Number is required if you have a Class A CDL",
        path: ["cdlNumber"],
      });
    }

    // Add custom conditional validation for password fields
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type GeneralInformationSection = z.infer<
  typeof generalInformationSectionValidator
>;

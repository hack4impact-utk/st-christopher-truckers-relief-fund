import { parsePhoneNumberWithError } from "libphonenumber-js";
import { z } from "zod";

import { createProgramEnrollment } from "@/server/api/program-enrollments/private-mutations";
import { EnrollmentForm, GeneralInformationSection, User } from "@/types";
import {
  programSelectionSectionDefaultValues,
  programSpecificQuestionsSectionDefaultValues,
  qualifyingQuestionsSectionDefaultValues,
} from "@/utils/constants/formDefaultValues";
import dayjsUtil from "@/utils/dayjsUtil";

export const clientCreationRequestSchema = z.object({
  // General information
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .transform((val) => val.toLowerCase()),
  dateOfBirth: z
    .string()
    .refine((val) => val === "Unknown" || dayjsUtil(val).isValid(), {
      message: "Invalid date format",
    })
    .transform((val) =>
      val === "Unknown" ? val : dayjsUtil(val).format("MM/DD/YYYY"),
    ),
  sex: z.enum(["male", "female"]),
  phoneNumber: z.string().transform((val) => {
    try {
      const parsed = parsePhoneNumberWithError(val, "US");
      return parsed.number.toString(); // returns in E.164 format (e.g. +14155552671)
    } catch {
      return "Unknown";
    }
  }),
  // Specifying the programs the client is enrolled in
  isEnrolledInHealthyHabits: z.boolean(),
  healthyHabitsEnrollmentDate: z
    .string()
    .refine((val) => dayjsUtil(val).isValid(), {
      message: "Invalid date format",
    })
    .transform((val) => dayjsUtil(val).format("MM/DD/YYYY")),
  isEnrolledInDiabetesPrevention: z.boolean(),
  diabetesPreventionEnrollmentDate: z
    .string()
    .refine((val) => dayjsUtil(val).isValid(), {
      message: "Invalid date format",
    })
    .transform((val) => dayjsUtil(val).format("MM/DD/YYYY")),
  isEnrolledInRigsWithoutCigs: z.boolean(),
  rigsWithoutCigsEnrollmentDate: z
    .string()
    .refine((val) => dayjsUtil(val).isValid(), {
      message: "Invalid date format",
    })
    .transform((val) => dayjsUtil(val).format("MM/DD/YYYY")),
  isEnrolledInVaccineVoucher: z.boolean(),
  vaccineVoucherEnrollmentDate: z
    .string()
    .refine((val) => dayjsUtil(val).isValid(), {
      message: "Invalid date format",
    })
    .transform((val) => dayjsUtil(val).format("MM/DD/YYYY")),
  isEnrolledInGetPreventativeScreenings: z.boolean(),
  getPreventativeScreeningsEnrollmentDate: z
    .string()
    .refine((val) => dayjsUtil(val).isValid(), {
      message: "Invalid date format",
    })
    .transform((val) => dayjsUtil(val).format("MM/DD/YYYY")),
  rigsWithoutCigsStatus: z.enum([
    "unknown",
    "quit",
    "cut back",
    "in progress",
    "no success",
    "not yet started",
    "withdrawn",
    "quit / support",
    "relapsed",
  ]),
});

type ClientCreationRequest = z.infer<typeof clientCreationRequestSchema>;

export function getEnrollmentForm(
  data: ClientCreationRequest,
  password: string,
): EnrollmentForm {
  const generalInformationSection: GeneralInformationSection = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password,
    confirmPassword: password,
    dateOfBirth: data.dateOfBirth,
    sex: data.sex,
    phoneNumber: data.phoneNumber,
    address: "Unknown",
    preferredMethodOfContact: "email",
    isUsCitizen: true,
    hasClassACdl: true,
    cdlNumber: "Unknown",
    cdlVerification: true,
    truckingIndustryAffiliation: "driver",
    jobDescription: "OTR Driver, away 4+ nights a week",
    referralSource: "Unknown",
    employer: {
      name: "Unknown",
      contact: "Unknown",
    },
    doctors: [],
    monthlyHouseholdExpenses: 0,
    isOwnerOperator: false,
    ownerOperatorInfo: {
      businessIncome: 0,
      businessExpenses: 0,
    },
    hasAcknowledgedHipaaNotice: true,
  };

  return {
    dateSubmitted: new Date().toISOString(),
    generalInformationSection,
    qualifyingQuestionsSection: qualifyingQuestionsSectionDefaultValues,
    programSelectionSection: programSelectionSectionDefaultValues,
    programSpecificQuestionsSection:
      programSpecificQuestionsSectionDefaultValues,
  };
}

export async function addProgramEnrollmentsToClientUser(
  data: ClientCreationRequest,
  user: User,
): Promise<void> {
  await createProgramEnrollment({
    user,
    program: "Healthy Habits For The Long Haul",
    status: data.isEnrolledInHealthyHabits ? "accepted" : "rejected",
    dateEnrolled: dayjsUtil(data.healthyHabitsEnrollmentDate).toISOString(),
  });
  await createProgramEnrollment({
    user,
    program: "Diabetes Prevention",
    status: data.isEnrolledInDiabetesPrevention ? "accepted" : "rejected",
    dateEnrolled: dayjsUtil(
      data.diabetesPreventionEnrollmentDate,
    ).toISOString(),
  });
  await createProgramEnrollment({
    user,
    program: "Rigs Without Cigs",
    status: data.isEnrolledInRigsWithoutCigs ? "accepted" : "rejected",
    dateEnrolled: dayjsUtil(data.rigsWithoutCigsEnrollmentDate).toISOString(),
  });
  await createProgramEnrollment({
    user,
    program: "Vaccine Voucher",
    status: data.isEnrolledInVaccineVoucher ? "accepted" : "rejected",
    dateEnrolled: dayjsUtil(data.vaccineVoucherEnrollmentDate).toISOString(),
  });
  await createProgramEnrollment({
    user,
    program: "GPS (Get Preventative Screenings)",
    status: data.isEnrolledInGetPreventativeScreenings
      ? "accepted"
      : "rejected",
    dateEnrolled: dayjsUtil(
      data.getPreventativeScreeningsEnrollmentDate,
    ).toISOString(),
  });
}

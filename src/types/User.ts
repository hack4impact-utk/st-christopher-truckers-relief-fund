import {
  EnrollmentForm,
  FagerstromTest,
  HealthyHabitsTrackingForm,
  ProgramEnrollment,
  VaccineVoucherRequest,
} from ".";
import { RigsWithoutCigsStatus } from "./RigsWithoutCigsStatus";
import { ScreeningRequest } from "./ScreeningRequest";

export type AdminUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "admin";
  dateCreated: string;
  isEmailVerified: boolean;
};

export type ClientUser = {
  // basic user information
  _id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: "male" | "female";
  email: string;
  phoneNumber: string;
  password: string;
  role: "client";
  dateCreated: string;
  comments: string;
  goals: string;

  // flags
  isEmailVerified: boolean;
  needsInformationUpdated: boolean;

  // foreign key relationships
  enrollmentForm: EnrollmentForm;
  programEnrollments: ProgramEnrollment[];
  healthyHabitsTrackingForms: HealthyHabitsTrackingForm[];
  rigsWithoutCigsStatus: RigsWithoutCigsStatus;
  fagerstromTests: FagerstromTest[];
  screeningRequests: ScreeningRequest[];
  vaccineVoucherRequests: VaccineVoucherRequest[];
};

export type User = AdminUser | ClientUser;

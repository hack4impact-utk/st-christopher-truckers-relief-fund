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
  _id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "client";
  dateCreated: string;
  isEmailVerified: boolean;
  enrollmentForm: EnrollmentForm;
  programEnrollments: ProgramEnrollment[];
  healthyHabitsTrackingForms: HealthyHabitsTrackingForm[];
  rigsWithoutCigsStatus: RigsWithoutCigsStatus;
  fagerstromTests: FagerstromTest[];
  screeningRequests: ScreeningRequest[];
  vaccineVoucherRequests: VaccineVoucherRequest[];
  comments: string;
  goals: string;
};

export type User = AdminUser | ClientUser;

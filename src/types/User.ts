import {
  EnrollmentForm,
  FagerstromTest,
  HealthyHabitsTrackingForm,
  ProgramEnrollment,
} from ".";
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
  email: string;
  phoneNumber: string;
  password: string;
  role: "client";
  dateCreated: string;
  isEmailVerified: boolean;
  enrollmentForm: EnrollmentForm;
  programEnrollments: ProgramEnrollment[];
  healthyHabitsTrackingForms: HealthyHabitsTrackingForm[];
  fagerstromTests: FagerstromTest[];
  screeningRequests: ScreeningRequest[];
  comments: string;
};

export type User = AdminUser | ClientUser;

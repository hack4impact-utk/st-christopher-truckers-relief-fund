import {
  EnrollmentForm,
  HealthyHabitsTrackingForm,
  ProgramEnrollment,
} from ".";

export type AdminUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
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
  password: string;
  role: "client";
  dateCreated: string;
  isEmailVerified: boolean;
  enrollmentForm: EnrollmentForm;
  programEnrollments: ProgramEnrollment[];
  healthyHabitsTrackingForms: HealthyHabitsTrackingForm[];
};

export type User = AdminUser | ClientUser;

import { Program, User } from ".";

export type ProgramEnrollment = {
  _id?: string;
  user: User;
  status: "pending" | "accepted" | "rejected";
  program: Program;
  dateEnrolled: string;
};

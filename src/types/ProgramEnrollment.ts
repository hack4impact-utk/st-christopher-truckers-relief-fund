import { Program, User } from "@/types";

export type ProgramEnrollment = {
  _id?: string;
  user: User;
  status: "pending" | "accepted" | "rejected";
  program: Program;
  dateEnrolled: string;
};

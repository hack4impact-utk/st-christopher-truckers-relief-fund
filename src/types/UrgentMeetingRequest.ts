import { User } from "./User";

export type UrgentMeetingRequest = {
  _id?: string;
  dateCreated: string;
  client: User;
  reason: string;
};

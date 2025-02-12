import { ClientUser } from "./User";

export type ScheduledMeeting = {
  _id?: string;
  dateCreated: string;
  client: ClientUser;
  date: string;
  reason: string;
};

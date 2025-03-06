import { ClientUser } from "./User";

type ScreeningRequestName =
  | "Prostate Screening"
  | "Colon / Colorectal Screening"
  | "Cervical Cancer Screening";

export type ScreeningRequestStatus =
  | "requested"
  | "rejected"
  | "qualified"
  | "negative"
  | "initial positive"
  | "true positive"
  | "false positive";

export type ScreeningRequest = {
  _id?: string;
  user: ClientUser;
  submittedDate: string;

  name: ScreeningRequestName;

  status: ScreeningRequestStatus;
};

import { ClientUser } from "./User";

export type ScreeningRequest = {
  _id?: string;
  user: ClientUser;
  submittedDate: string;

  name:
    | "Prostate Screening"
    | "Colon / Colorectal Screening"
    | "Cervical Cancer Screening";

  status:
    | "requested"
    | "rejected"
    | "qualified"
    | "negative"
    | "initial positive"
    | "true positive"
    | "false positive";
};

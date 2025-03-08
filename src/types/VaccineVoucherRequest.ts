import { User } from "./User";

export type VaccineName = "Flu" | "Pneumonia" | "Shingles" | "Shingles Booster";

type PharmacyName =
  | "Walgreens"
  | "Kroger and Kroger Family of Pharmacies"
  | "The Little Clinic"
  | "Walmart"
  | "Sam's Club";

export type VaccineVoucherRequestStatus =
  | "requested"
  | "rejected"
  | "approved"
  | "received"
  | "used";

export type VaccineVoucherRequest = {
  _id?: string;
  user: User;
  submittedDate: string;
  vaccineName: VaccineName;
  pharmacyName: PharmacyName;
  status: VaccineVoucherRequestStatus;
};

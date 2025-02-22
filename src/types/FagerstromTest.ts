import { User } from "./User";

export type FagerstromTest = {
  _id?: string;
  submittedDate: string;
  client: User;

  cigaretteFagerstromScore: number;
  firstSmokeTime:
    | "Within 5 minutes"
    | "6-30 minutes"
    | "31-60 minutes"
    | "After 60 minutes";
  isDifficultToNotSmokeInForbiddenAreas: boolean;
  cigaretteHateToGiveUp: "The first one in the morning" | "All others";
  cigarettesPerDay: "31 or more" | "21-30" | "11-20" | "10 or less";
  smokeMoreInMorning: boolean;
  smokeWhenIll: boolean;

  tobaccoFagerstromScore: number;
  firstTobaccoTime:
    | "Within 5 minutes"
    | "6-30 minutes"
    | "31-60 minutes"
    | "After 60 minutes";
  swallowTobaccoJuice: "Always" | "Sometimes" | "Never";
  tobaccoHateToGiveUp: "The first one in the morning" | "All others";
  tobaccoCansPerWeek: "More than 3" | "2-3" | "1";
  tobaccoChewMoreAfterAwakening: boolean;
  tobaccoChewWhenIll: boolean;
};

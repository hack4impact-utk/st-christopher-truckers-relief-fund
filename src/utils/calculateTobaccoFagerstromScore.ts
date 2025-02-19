type FirstTobaccoTime =
  | "Within 5 minutes"
  | "6-30 minutes"
  | "31-60 minutes"
  | "After 60 minutes";

type SwallowTobaccoJuice = "Always" | "Sometimes" | "Never";
type TobaccoHateToGiveUp = "The first one in the morning" | "All others";
type TobaccoCansPerWeek = "More than 3" | "2-3" | "1";

const firstTobaccoTimeScores: Record<FirstTobaccoTime, number> = {
  "Within 5 minutes": 3,
  "6-30 minutes": 2,
  "31-60 minutes": 1,
  "After 60 minutes": 0,
};
const swallowTobaccoJuiceScores: Record<SwallowTobaccoJuice, number> = {
  Always: 2,
  Sometimes: 1,
  Never: 0,
};
const tobaccoHateToGiveUpScores: Record<TobaccoHateToGiveUp, number> = {
  "The first one in the morning": 1,
  "All others": 0,
};
const tobaccoCansPerWeekScores: Record<TobaccoCansPerWeek, number> = {
  "More than 3": 2,
  "2-3": 1,
  "1": 0,
};

export default function calculateTobaccoFagerstromScore(
  firstTobaccoTime: FirstTobaccoTime,
  swallowTobaccoJuice: SwallowTobaccoJuice,
  tobaccoHateToGiveUp: TobaccoHateToGiveUp,
  tobaccoCansPerWeek: TobaccoCansPerWeek,
  tobaccoChewMoreAfterAwakening: boolean,
  tobaccoChewWhenIll: boolean,
): number {
  let fagerstromScore = 0;

  fagerstromScore += firstTobaccoTimeScores[firstTobaccoTime];
  fagerstromScore += swallowTobaccoJuiceScores[swallowTobaccoJuice];
  fagerstromScore += tobaccoHateToGiveUpScores[tobaccoHateToGiveUp];
  fagerstromScore += tobaccoCansPerWeekScores[tobaccoCansPerWeek];

  fagerstromScore += Number(tobaccoChewMoreAfterAwakening);
  fagerstromScore += Number(tobaccoChewWhenIll);

  return fagerstromScore;
}

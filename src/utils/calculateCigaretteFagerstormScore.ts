type FirstSmokeTime =
  | "Within 5 minutes"
  | "6-30 minutes"
  | "31-60 minutes"
  | "After 60 minutes";

type CigaretteHateToGiveUp = "The first one in the morning" | "All others";
type TobaccoCansPerWee = "31 or more" | "21-30" | "11-20" | "10 or less";

const firstSmokeTimeScore: Record<FirstSmokeTime, number> = {
  "Within 5 minutes": 3,
  "6-30 minutes": 2,
  "31-60 minutes": 1,
  "After 60 minutes": 0,
};
const cigaretteHateToGiveUpScore: Record<CigaretteHateToGiveUp, number> = {
  "The first one in the morning": 1,
  "All others": 0,
};
const tobaccoCansPerWeekScores: Record<TobaccoCansPerWee, number> = {
  "31 or more": 3,
  "21-30": 2,
  "11-20": 1,
  "10 or less": 0,
};

export default function calculateCigaretteFagerstormScore(
  firstSmokeTime: FirstSmokeTime,
  isDifficultToNotSmokeInForbiddenAreas: boolean,
  cigaretteHateToGiveUp: CigaretteHateToGiveUp,
  cigarettesPerDay: TobaccoCansPerWee,
  smokeMoreInMorning: boolean,
  smokeWhenIll: boolean,
): number {
  let fagerstormScore = 0;

  fagerstormScore += firstSmokeTimeScore[firstSmokeTime];
  fagerstormScore += cigaretteHateToGiveUpScore[cigaretteHateToGiveUp];
  fagerstormScore += tobaccoCansPerWeekScores[cigarettesPerDay];

  fagerstormScore += Number(isDifficultToNotSmokeInForbiddenAreas);
  fagerstormScore += Number(smokeMoreInMorning);
  fagerstormScore += Number(smokeWhenIll);

  return fagerstormScore;
}

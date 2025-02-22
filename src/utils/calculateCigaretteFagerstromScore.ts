type FirstSmokeTime =
  | "Within 5 minutes"
  | "6-30 minutes"
  | "31-60 minutes"
  | "After 60 minutes";

type CigaretteHateToGiveUp = "The first one in the morning" | "All others";
type CigarettesPerDay = "31 or more" | "21-30" | "11-20" | "10 or less";

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
const cigarettesPerDayObject: Record<CigarettesPerDay, number> = {
  "31 or more": 3,
  "21-30": 2,
  "11-20": 1,
  "10 or less": 0,
};

export default function calculateCigaretteFagerstromScore(
  firstSmokeTime: FirstSmokeTime,
  isDifficultToNotSmokeInForbiddenAreas: boolean,
  cigaretteHateToGiveUp: CigaretteHateToGiveUp,
  cigarettesPerDay: CigarettesPerDay,
  smokeMoreInMorning: boolean,
  smokeWhenIll: boolean,
): number {
  let fagerstromScore = 0;

  fagerstromScore += firstSmokeTimeScore[firstSmokeTime];
  fagerstromScore += cigaretteHateToGiveUpScore[cigaretteHateToGiveUp];
  fagerstromScore += cigarettesPerDayObject[cigarettesPerDay];

  fagerstromScore += Number(isDifficultToNotSmokeInForbiddenAreas);
  fagerstromScore += Number(smokeMoreInMorning);
  fagerstromScore += Number(smokeWhenIll);

  return fagerstromScore;
}

import { z } from "zod";

export const qualifyingQuestionsSectionValidator = z.object({
  diagnoses: z.object({
    hasType1Diabetes: z.boolean(),
    hasType2Diabetes: z.boolean(),
    hasHighBloodPressure: z.boolean(),
    hasHighCholesterol: z.boolean(),
    hasHeartDisease: z.boolean(),
    isObese: z.boolean(),
    hasOther: z.string().optional(),
    noneOfTheAbove: z.boolean(),
  }),
  isTobaccoUser: z.boolean(),
  hasAppliedForFinancialAssistance: z.boolean(),
  hasHealthConditionCausedByTobaccoUse: z.boolean(),
  hasHealthInsurance: z.boolean(),
  hasCloseFamilyHistoryOfProstateCancer: z.boolean(),
});

export type QualifyingQuestionsSection = z.infer<
  typeof qualifyingQuestionsSectionValidator
>;

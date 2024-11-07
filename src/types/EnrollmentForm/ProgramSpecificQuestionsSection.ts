/**
 * 
 * What is your current weight?*
What is your BMI? - provide a calculator*
In the past year, have you had a fasting glucose or A1c test?*
Yes
No
What was the result? (Put “NA” if not applicable)*
If you know your blood pressure, please consider sharing it here:
On a scale of 1-5, rank your overall health when it comes to movement/activity:
1
2
3
4
5
On a scale of 1-5, rank your overall health when it comes to energy:
1
2
3
4
5
On a scale of 1-5, rank your overall health when it comes to sleep:
1
2
3
4
5
On a scale of 1-5, rank your overall health when it comes to emotional health:
1
2
3
4
5
How many bottles of water (16.9 oz) do you currently drink on a daily basis?
1
2
3
4
5+
How many servings of fruit and vegetables do you consume on a daily basis?
0
1
2
3
4
5
6
7
8
9
10+
Do you have any other illness or injury we should be aware of? If applicable, please describe. If not, put “NA.” *
What is your biggest healthy living challenge while out on the road?*
What are your short-term health goals?*
What are your long-term health goals?*
Which of the following devices do you currently have?*
Scale
Blood pressure cuff
Glucose monitor
A1c home test
Fitness tracker (e.g., Fitbit, Apple Watch, Samsung Watch, etc)
Body Tape Measure
Resistance bands
Other exercise equipment
None of the above
What are you hoping to learn or gain from the Healthy Habits Program? (put NA if you do not intend to utilize this program)*
Display if opted-in to healthy habits
What are you hoping to learn or gain from the Diabetes Prevention Program? (put NA if you do not intend to utilize this program)*
Display if opted-in to diabetes prevention

 */

import { z } from "zod";

export const programSpecificQuestionsSectionValidator = z
  .object({
    // repeat of the same booleans from the program selection section for conditional validation
    hasOptedInToHealthyHabits: z.boolean(),
    hasOptedInToDiabetesPrevention: z.boolean(),
    hasOptedInToRigsWithoutCigs: z.boolean(),
    hasOptedInToVaccineVoucher: z.boolean(),
    hasOptedInToGetPreventativeScreenings: z.boolean(),
    healthyHabitsAndDiabetesPrevention: z
      .object({
        weight: z.number().int().positive(),
        bmi: z.number().int().positive(),
        hasHadGlucoseOrA1CTestInPastYear: z.boolean(),
        glucoseOrA1CTestResult: z.string().min(1),
        bloodPressure: z.string().min(1),
        movementAndActivityRanking: z.enum(["1", "2", "3", "4", "5"]),
        energyRanking: z.enum(["1", "2", "3", "4", "5"]),
        sleepRanking: z.enum(["1", "2", "3", "4", "5"]),
        emotionalHealthRanking: z.enum(["1", "2", "3", "4", "5"]),
        waterBottlesPerDay: z.enum(["1", "2", "3", "4", "5+"]),
        fruitAndVegetableServingsPerDay: z.enum([
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10+",
        ]),
        otherIllnessOrInjury: z.string(),
        biggestHealthyLivingChallenge: z.string(),
        shortTermHealthGoals: z.string(),
        longTermHealthGoals: z.string(),
        devices: z.object({
          hasScale: z.boolean(),
          hasBloodPressureCuff: z.boolean(),
          hasGlucoseMonitor: z.boolean(),
          hasA1cHomeTest: z.boolean(),
          hasFitnessTracker: z.boolean(),
          hasBodyTapMeasure: z.boolean(),
          hasResistanceBands: z.boolean(),
          hasOtherExerciseEquipment: z.boolean(),
          noneOfTheAbove: z.boolean(),
        }),
        healthyHabitsHopefulLearnings: z.string().optional(),
        diabetesPreventionHopefulLearnings: z.string().optional(),
      })
      .optional(),
    rigsWithoutCigs: z.object({
      tobaccoForm: z
        .object({
          doesUseCigarettes: z.boolean(),
          doesUseSmokelessTobacco: z.boolean(),
        })
        .optional(),
    }),
  })
  .superRefine((val, ctx) => {
    // if opted in to healthy habits or diabetes prevention, require healthy habits and diabetes prevention questions
    if (val.hasOptedInToHealthyHabits || val.hasOptedInToDiabetesPrevention) {
      if (!val.healthyHabitsAndDiabetesPrevention) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Healthy Habits and Diabetes Prevention questions are required",
          path: ["healthyHabitsAndDiabetesPrevention"],
        });
      }
    }
    // if opted in to rigs without cigs, require tobacco form questions
    if (val.hasOptedInToRigsWithoutCigs) {
      if (!val.rigsWithoutCigs) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Tobacco form questions are required",
          path: ["rigsWithoutCigs"],
        });
      }
    }
  });

export type ProgramSpecificQuestionsSection = z.infer<
  typeof programSpecificQuestionsSectionValidator
>;

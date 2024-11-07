import { z } from "zod";

export const programSelectionSectionValidator = z
  .object({
    optedInToHealthyHabits: z.boolean(),
    optedInToDiabetesPrevention: z.boolean(),
    optedInToRigsWithoutCigs: z.boolean(),
    optedInToVaccineVoucher: z.boolean(),
    optedInToGetPreventativeScreenings: z.boolean(),
  })
  .superRefine((val, ctx) => {
    // you must pick at least one program
    if (
      !val.optedInToHealthyHabits &&
      !val.optedInToDiabetesPrevention &&
      !val.optedInToRigsWithoutCigs &&
      !val.optedInToVaccineVoucher &&
      !val.optedInToGetPreventativeScreenings
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must opt in to at least one program",
        path: ["optedInToHealthyHabits"],
      });
    }
  });

export type ProgramSelectionSection = z.infer<
  typeof programSelectionSectionValidator
>;

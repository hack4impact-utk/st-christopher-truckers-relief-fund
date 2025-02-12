import z from "zod";

export const cigaretteFagerstromTestFormValidator = z.object({
  firstCigarette: z.number().min(1).max(3),
  refrainInForbiddenAreas: z.number().min(0).max(1),
  whichGiveUpHate: z.number().min(0).max(1),
  cigarettesPerDay: z.number().min(0).max(3),
  frequentlyInMorning: z.number().min(0).max(1),
  smokeWhenSickInBed: z.number().min(0).max(1),
});

export type CigaretteFagerstromTestForm = z.infer<
  typeof cigaretteFagerstromTestFormValidator
>;

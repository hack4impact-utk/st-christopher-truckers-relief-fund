import z from "zod";

export const smokelessTobaccoFagerstromTestFormValidator = z.object({
  firstDip: z.number().min(0).max(3),
  intentionallySwallow: z.number().min(0).max(2),
  whichGiveUpHate: z.number().min(0).max(1),
  dipPerWeek: z.number().min(0).max(2),
  frequentlyInMorning: z.number().min(0).max(1),
  dipWhenSickInBed: z.number().min(0).max(1),
});

export type SmokelessTobaccoFagerstromTestForm = z.infer<
  typeof smokelessTobaccoFagerstromTestFormValidator
>;

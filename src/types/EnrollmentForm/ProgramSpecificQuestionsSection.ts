import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import { z } from "zod";

export const programSpecificQuestionsSectionValidator = z
  .object({
    // repeat of the same booleans from the program selection section for conditional validation
    hasOptedInToHealthyHabits: z.boolean(),
    hasOptedInToDiabetesPrevention: z.boolean(),
    hasOptedInToRigsWithoutCigs: z.boolean(),
    hasOptedInToVaccineVoucher: z.boolean(),
    hasOptedInToGetPreventativeScreenings: z.boolean(),

    healthyHabitsAndDiabetesPrevention: z.object({
      weight: z.number(),
      heightFeet: z.number(),
      heightInches: z.number(),
      bmi: z.number(),
      hasHadGlucoseOrA1CTestInPastYear: z.boolean(),
      glucoseOrA1CTestResult: z.string(),
      systolicBloodPressure: z.number().int(),
      diastolicBloodPressure: z.number().int(),
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
        hasBodyTapeMeasure: z.boolean(),
        hasResistanceBands: z.boolean(),
        hasOtherExerciseEquipment: z.boolean(),
        noneOfTheAbove: z.boolean(),
      }),
      healthyHabitsHopefulLearnings: z.string(),
      diabetesPreventionHopefulLearnings: z.string(),
    }),

    rigsWithoutCigs: z.object({
      tobaccoForm: z.object({
        doesUseCigarettes: z.boolean(),
        doesUseSmokelessTobacco: z.boolean(),
      }),
      tobaccoUsageLength: z.string(),
      isFirstTimeTryingToQuit: z.boolean(),
      methodsUsedToQuit: z.object({
        hasNotTriedToQuit: z.boolean(),
        hasTriedColdTurkey: z.boolean(),
        hasUsedAudiobook: z.boolean(),
        hasUsedChantix: z.boolean(),
        hasUsedColdTurkey: z.boolean(),
        hasUsedECigarettes: z.boolean(),
        hasUsedGrindsCoffeePouches: z.boolean(),
        hasUsedGum: z.boolean(),
        hasUsedHypnosis: z.boolean(),
        hasUsedLozenges: z.boolean(),
        hasUsedMedication: z.boolean(),
        hasUsedMobileApp: z.boolean(),
        hasUsedNicotinePatch: z.boolean(),
        hasUsedOther: z.boolean(),
        hasUsedTaperMethod: z.boolean(),
        hasUsedVarenicline: z.boolean(),
        hasUsedWellbutrin: z.boolean(),
      }),

      tobaccoFagerstromScore: z.number(),
      firstTobaccoTime: z.enum([
        "Within 5 minutes",
        "6-30 minutes",
        "31-60 minutes",
        "After 60 minutes",
      ]),
      swallowTobaccoJuice: z.enum(["Always", "Sometimes", "Never"]),
      tobaccoHateToGiveUp: z.enum([
        "The first one in the morning",
        "All others",
      ]),
      tobaccoCansPerWeek: z.enum(["More than 3", "2-3", "1"]),
      tobaccoChewMoreAfterAwakening: z.boolean(),
      tobaccoChewWhenIll: z.boolean(),

      cigaretteFagerstromScore: z.number(),
      firstSmokeTime: z.enum([
        "Within 5 minutes",
        "6-30 minutes",
        "31-60 minutes",
        "After 60 minutes",
      ]),
      isDifficultToNotSmokeInForbiddenAreas: z.boolean(),
      cigaretteHateToGiveUp: z.enum([
        "The first one in the morning",
        "All others",
      ]),
      cigarettesPerDay: z.enum(["31 or more", "21-30", "11-20", "10 or less"]),
      smokeMoreInMorning: z.boolean(),
      smokeWhenIll: z.boolean(),

      plansToJoinFacebookGroup: z.boolean(),
      whyDoYouWantToQuitSmoking: z.string(),
      howCanWeHelpYou: z.string(),
      referralSource: z.enum([
        "Website",
        "Friend",
        "Social Media",
        "SCF",
        "Radio-Dave Nemo",
        "Radio-Tim Ridley Show",
        "Radio-KC Phillips-Road Dog Live",
        "Radio-Erice Harley-Red Eye Radio",
        "Radio-Other",
        "Prime Inc",
        "Rolling Strong",
        "AAOO",
        "Enrollment Form prompt",
        "Other",
      ]),
      accountabilityPerson: z.object({
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string(),
        relationshipToAccountabilityPerson: z.enum([
          "Friend",
          "Coworker",
          "Spouse",
          "Significant other",
          "Other",
        ]),
      }),
      currentlyHasPrimaryCarePhysician: z.boolean(),
    }),
    vaccineVoucher: z.object({
      vaccines: z.object({
        wantsFluVaccine: z.boolean(),
        wantsPneumoniaVaccine: z.boolean(),
        wantsShinglesVaccine: z.boolean(),
        wantsCovid19Vaccine: z.boolean(),
      }),
      voucherLocation: z.enum([
        "Walgreens",
        "Kroger and Kroger Family of Pharmacies",
        "The Little Clinic",
        "Walmart",
        "Sam's Club",
      ]),
      additionalQuestions: z.string(),
    }),
    getPreventativeScreenings: z.object({
      agreeToShareResults: z.boolean(),
      prostateScreening: z.object({
        agreeToGetAccountRegistered: z.boolean(),
        agreesToProstateScreening: z.boolean(),
        isNotApplicable: z.boolean(),
        additionalQuestions: z.string(),
      }),
    }),
  })

  .superRefine((val, ctx) => {
    const hasOptedInToHealthyHabits = val.hasOptedInToHealthyHabits;
    const hasOptedInToDiabetesPrevention = val.hasOptedInToDiabetesPrevention;
    const hasOptedInToRigsWithoutCigs = val.hasOptedInToRigsWithoutCigs;
    const hasOptedInToVaccineVoucher = val.hasOptedInToVaccineVoucher;
    const hasOptedInToGetPreventativeScreenings =
      val.hasOptedInToGetPreventativeScreenings;

    if (hasOptedInToHealthyHabits || hasOptedInToDiabetesPrevention) {
      if (val.healthyHabitsAndDiabetesPrevention.weight <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Weight is required",
          path: ["healthyHabitsAndDiabetesPrevention", "weight"],
        });
      }
      if (val.healthyHabitsAndDiabetesPrevention.heightFeet <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid height",
          path: ["healthyHabitsAndDiabetesPrevention", "heightFeet"],
        });
      }

      if (
        val.healthyHabitsAndDiabetesPrevention.heightInches < 0 ||
        val.healthyHabitsAndDiabetesPrevention.heightInches >= 12
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid height",
          path: ["healthyHabitsAndDiabetesPrevention", "heightInches"],
        });
      }

      if (val.healthyHabitsAndDiabetesPrevention.systolicBloodPressure <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid Systolic Blood Pressure",
          path: ["healthyHabitsAndDiabetesPrevention", "systolicBloodPressure"],
        });
      }

      if (val.healthyHabitsAndDiabetesPrevention.diastolicBloodPressure <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid Diastolic Blood Pressure",
          path: [
            "healthyHabitsAndDiabetesPrevention",
            "diastolicBloodPressure",
          ],
        });
      }
    }

    if (hasOptedInToHealthyHabits) {
      if (
        val.healthyHabitsAndDiabetesPrevention.healthyHabitsHopefulLearnings
          .length == 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Healthy Habits Hopeful Learnings is required",
          path: [
            "healthyHabitsAndDiabetesPrevention",
            "healthyHabitsHopefulLearnings",
          ],
        });
      }
    }

    if (hasOptedInToDiabetesPrevention) {
      if (
        val.healthyHabitsAndDiabetesPrevention
          .diabetesPreventionHopefulLearnings.length == 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Diabetes Prevention Hopeful Learnings is required",
          path: [
            "healthyHabitsAndDiabetesPrevention",
            "diabetesPreventionHopefulLearnings",
          ],
        });
      }
    }

    if (hasOptedInToRigsWithoutCigs) {
      if (
        !isValidPhoneNumber(
          val.rigsWithoutCigs.accountabilityPerson.phoneNumber,
          { defaultCountry: "US" },
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number",
          path: ["rigsWithoutCigs", "accountabilityPerson", "phoneNumber"],
        });
      } else {
        const phoneNumber = parsePhoneNumberWithError(
          val.rigsWithoutCigs.accountabilityPerson.phoneNumber,
          "US",
        ).number.toString();
        val.rigsWithoutCigs.accountabilityPerson.phoneNumber = phoneNumber;
      }
    }

    if (hasOptedInToVaccineVoucher) {
      if (
        val.vaccineVoucher.vaccines.wantsFluVaccine === false &&
        val.vaccineVoucher.vaccines.wantsPneumoniaVaccine === false &&
        val.vaccineVoucher.vaccines.wantsShinglesVaccine === false &&
        val.vaccineVoucher.vaccines.wantsCovid19Vaccine === false
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You must select at least one vaccine",
          path: ["vaccineVoucher", "vaccines", "wantsFluVaccine"],
        });
      }
    }

    if (hasOptedInToGetPreventativeScreenings) {
      if (val.getPreventativeScreenings.agreeToShareResults === false) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You must agree to share your results",
          path: ["getPreventativeScreenings", "agreeToShareResults"],
        });
      }

      const selectedNotApplicable =
        val.getPreventativeScreenings.prostateScreening.isNotApplicable;
      const agreeToGetAccountRegistered =
        val.getPreventativeScreenings.prostateScreening
          .agreeToGetAccountRegistered;
      const agreesToProstateScreening =
        val.getPreventativeScreenings.prostateScreening
          .agreesToProstateScreening;

      if (
        !selectedNotApplicable &&
        (agreeToGetAccountRegistered === false ||
          agreesToProstateScreening === false)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "You must select not applicable or select both other options",
          path: [
            "getPreventativeScreenings",
            "prostateScreening",
            "agreeToGetAccountRegistered",
          ],
        });
      }
    }
  });

export type ProgramSpecificQuestionsSection = z.infer<
  typeof programSpecificQuestionsSectionValidator
>;

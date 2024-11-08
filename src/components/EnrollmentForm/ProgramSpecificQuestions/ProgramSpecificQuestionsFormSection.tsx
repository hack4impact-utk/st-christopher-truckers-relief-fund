"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import GetPreventativeScreeningsProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/GetPreventativeScreeningsProgramSpecificQuestions";
import HealthyHabitsProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/HealthyHabitsProgramSpecificQuestions";
import RigsWithoutCigsProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/RigsWithoutCigsProgramSpecificQuestions";
import VaccineVoucherProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/VaccineVoucherProgramSpecificQuestions";
import {
  ProgramSpecificQuestionsSection,
  programSpecificQuestionsSectionValidator,
} from "@/types/EnrollmentForm";

export default function ProgramSpecificQuestionsFormSection() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProgramSpecificQuestionsSection>({
    resolver: zodResolver(programSpecificQuestionsSectionValidator),
    defaultValues: {
      hasOptedInToHealthyHabits: false,
      hasOptedInToDiabetesPrevention: false,
      hasOptedInToRigsWithoutCigs: false,
      hasOptedInToVaccineVoucher: false,
      hasOptedInToGetPreventativeScreenings: true,
      healthyHabitsAndDiabetesPrevention: {
        weight: 0,
        bmi: 0,
        hasHadGlucoseOrA1CTestInPastYear: false,
        glucoseOrA1CTestResult: "",
        bloodPressure: "",
        movementAndActivityRanking: "1",
        energyRanking: "1",
        sleepRanking: "1",
        emotionalHealthRanking: "1",
        waterBottlesPerDay: "1",
        fruitAndVegetableServingsPerDay: "0",
        otherIllnessOrInjury: "",
        biggestHealthyLivingChallenge: "",
        shortTermHealthGoals: "",
        longTermHealthGoals: "",
        devices: {
          hasScale: false,
          hasBloodPressureCuff: false,
          hasGlucoseMonitor: false,
          hasA1cHomeTest: false,
          hasFitnessTracker: false,
          hasBodyTapMeasure: false,
          hasResistanceBands: false,
          hasOtherExerciseEquipment: false,
          noneOfTheAbove: false,
        },
        healthyHabitsHopefulLearnings: "",
        diabetesPreventionHopefulLearnings: "",
      },
      rigsWithoutCigs: {
        tobaccoForm: {
          doesUseCigarettes: false,
          doesUseSmokelessTobacco: false,
        },
        tobaccoUsageLength: "",
        isFirstTimeTryingToQuit: false,
        methodsUsedToQuit: {
          hasTriedColdTurkey: false,
          hasUsedNicotinePatch: false,
          hasUsedGum: false,
          hasUsedHypnosis: false,
          hasUsedMedication: false,
          hasUsedECigarettes: false,
          hasUsedOther: false,
          hasNotTriedToQuit: false,
        },
        firstCigaretteTime: "Within 5 minutes",
        doesFindItDifficultToNotSmokeInNonSmokingAreas: false,
        hardestCigaretteToGiveUp: "The first one in the morning",
        cigarettesPerDay: 0,
        smokesMoreOftenInTheMorning: false,
        smokesEvenWhenSickInBed: false,
        plansToJoinFacebookGroup: false,
        whyDoYouWantToQuitSmoking: "",
        howCanWeHelpYou: "",
        referralSource: "Website",
        accountabilityPerson: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          relationshipToAccountabilityPerson: "Friend",
        },
        currentlyHasPrimaryCarePhysician: false,
      },
      vaccineVoucher: {
        vaccines: {
          wantsFluVaccine: false,
          wantsPneumoniaVaccine: false,
          wantsShinglesVaccine: false,
          wantsCovid19Vaccine: false,
        },
        voucherLocation: "Walgreens",
        additionalQuestions: "",
      },
      getPreventativeScreenings: {
        agreeToProvideAccountability: false,
        prostateScreening: {
          agreeToGetAccountRegistered: false,
          agreesToProstateScreening: false,
          isNotApplicable: false,
          additionalQuestions: "",
        },
      },
    },
  });

  const hasOptedInToHealthyHabits = watch("hasOptedInToHealthyHabits");
  const hasOptedInToDiabetesPrevention = watch(
    "hasOptedInToDiabetesPrevention",
  );
  const hasOptedInToRigsWithoutCigs = watch("hasOptedInToRigsWithoutCigs");
  const hasOptedInToVaccineVoucher = watch("hasOptedInToVaccineVoucher");
  const hasOptedInToGetPreventativeScreenings = watch(
    "hasOptedInToGetPreventativeScreenings",
  );

  console.log(errors);

  const onSubmit = async (data: ProgramSpecificQuestionsSection) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
        }}
      >
        <Typography variant="h4">Program Specific Questions</Typography>
        {(hasOptedInToHealthyHabits || hasOptedInToDiabetesPrevention) && (
          <HealthyHabitsProgramSpecificQuestions
            control={control}
            errors={errors}
            hasOptedInToHealthyHabits={hasOptedInToHealthyHabits}
            hasOptedInToDiabetesPrevention={hasOptedInToDiabetesPrevention}
          />
        )}

        {hasOptedInToRigsWithoutCigs && (
          <RigsWithoutCigsProgramSpecificQuestions
            control={control}
            errors={errors}
          />
        )}

        {hasOptedInToVaccineVoucher && (
          <VaccineVoucherProgramSpecificQuestions
            control={control}
            errors={errors}
          />
        )}

        {hasOptedInToGetPreventativeScreenings && (
          <GetPreventativeScreeningsProgramSpecificQuestions
            control={control}
            errors={errors}
          />
        )}

        {/* Submit */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        <Typography variant="h6" fontWeight="normal" color="red">
          {errors.root?.message}
        </Typography>
      </Box>
    </form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";

import RigsWithoutCigsProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/RigsWithoutCigsProgramSpecificQuestions";
import { updateProgramInformation } from "@/server/api/rigs-without-cigs/public-mutations";
import { ProgramSpecificQuestionsSection } from "@/types";
import {
  AdditionalInfo,
  additionalInfoValidator,
} from "@/types/EnrollmentForm/AdditionalInfo";

export default function AddRigsWithoutCigsInformationPage(): ReactNode {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
    watch,
  } = useForm<AdditionalInfo>({
    resolver: zodResolver(additionalInfoValidator),
    defaultValues: {
      rigsWithoutCigs: {
        tobaccoForm: {
          doesUseCigarettes: false,
          doesUseSmokelessTobacco: false,
        },
        tobaccoUsageLength: "",
        isFirstTimeTryingToQuit: false,
        methodsUsedToQuit: {
          hasNotTriedToQuit: false,
          hasTriedColdTurkey: false,
          hasUsedAudiobook: false,
          hasUsedChantix: false,
          hasUsedColdTurkey: false,
          hasUsedECigarettes: false,
          hasUsedGrindsCoffeePouches: false,
          hasUsedGum: false,
          hasUsedHypnosis: false,
          hasUsedLozenges: false,
          hasUsedMedication: false,
          hasUsedMobileApp: false,
          hasUsedNicotinePatch: false,
          hasUsedOther: false,
          hasUsedTaperMethod: false,
          hasUsedVarenicline: false,
          hasUsedWellbutrin: false,
        },
        tobaccoFagerstromScore: 0,
        firstTobaccoTime: "After 60 minutes",
        swallowTobaccoJuice: "Never",
        tobaccoHateToGiveUp: "All others",
        tobaccoCansPerWeek: "1",
        tobaccoChewMoreAfterAwakening: false,
        tobaccoChewWhenIll: false,
        cigaretteFagerstromScore: 0,
        firstSmokeTime: "After 60 minutes",
        isDifficultToNotSmokeInForbiddenAreas: false,
        cigaretteHateToGiveUp: "All others",
        cigarettesPerDay: "10 or less",
        smokeMoreInMorning: false,
        smokeWhenIll: false,
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
    },
  });

  const onSubmit = async (data: AdditionalInfo): Promise<void> => {
    try {
      setIsLoading(true);

      const programSpecificData: ProgramSpecificQuestionsSection = {
        hasOptedInToHealthyHabits: false,
        hasOptedInToDiabetesPrevention: false,
        hasOptedInToRigsWithoutCigs: true,
        hasOptedInToVaccineVoucher: false,
        hasOptedInToGetPreventativeScreenings: false,
        healthyHabitsAndDiabetesPrevention: {
          weight: 0,
          heightFeet: 0,
          heightInches: 0,
          bmi: 0,
          hasHadGlucoseOrA1CTestInPastYear: false,
          glucoseOrA1CTestResult: "",
          systolicBloodPressure: 0,
          diastolicBloodPressure: 0,
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
            hasBodyTapeMeasure: false,
            hasResistanceBands: false,
            hasOtherExerciseEquipment: false,
            noneOfTheAbove: false,
          },
          healthyHabitsHopefulLearnings: "",
          diabetesPreventionHopefulLearnings: "",
        },
        rigsWithoutCigs: data.rigsWithoutCigs,
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
          agreeToShareResults: false,
          prostateScreening: {
            agreeToGetAccountRegistered: false,
            agreesToProstateScreening: false,
            isNotApplicable: false,
            additionalQuestions: "",
          },
        },
      };

      const [, error] = await updateProgramInformation(programSpecificData);

      if (error !== null) {
        throw error;
      }

      enqueueSnackbar("Information saved successfully", { variant: "success" });
      router.push("/dashboard/client/rigs-without-cigs");
    } catch (err) {
      console.error("Failed to save information:", err);
      enqueueSnackbar("Failed to save information", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (): void => {
    enqueueSnackbar("Please review all fields before continuing", {
      variant: "error",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit, onError)}
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mx: "auto",
        pt: 16,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Rigs Without Cigs Information
      </Typography>

      <RigsWithoutCigsProgramSpecificQuestions
        control={control}
        errors={errors}
        watch={watch}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={isLoading}
        sx={{ mt: 2 }}
      >
        Save Information
      </LoadingButton>

      <Typography color="red">
        {submitCount && !isSubmitSuccessful
          ? "Please review all fields before continuing."
          : ""}
      </Typography>
    </Box>
  );
}

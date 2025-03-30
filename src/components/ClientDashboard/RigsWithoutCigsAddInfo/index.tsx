"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { handleAddRigsWithoutCigsInformation } from "@/server/api/enrollment-forms/public-mutations";
import { User } from "@/types";
import calculateCigaretteFagerstromScore from "@/utils/calculateCigaretteFagerstromScore";
import calculateTobaccoFagerstromScore from "@/utils/calculateTobaccoFagerstromScore";

import RigsWithoutCigsProgramSpecificQuestions from "../../EnrollmentForm/ProgramSpecificQuestions/RigsWithoutCigsProgramSpecificQuestions";

const rigsWithoutCigsInformationValidator = z.object({
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
    tobaccoHateToGiveUp: z.enum(["The first one in the morning", "All others"]),
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
      phoneNumber: z
        .string()
        .refine((val) => isValidPhoneNumber(val, "US"), {
          message: "Invalid phone number",
        })
        .transform((val) =>
          parsePhoneNumberWithError(val, "US").number.toString(),
        ),
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
});

export type RigsWithoutCigsInformationFormValues = z.infer<
  typeof rigsWithoutCigsInformationValidator
>;

type RigsWithoutCigsAddInfoProps = {
  user: User;
};

export default function RigsWithoutCigsAddInfo({
  user,
}: Readonly<RigsWithoutCigsAddInfoProps>): ReactNode {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
    watch,
  } = useForm<RigsWithoutCigsInformationFormValues>({
    resolver: zodResolver(rigsWithoutCigsInformationValidator),
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

  const onSubmit = async (
    data: RigsWithoutCigsInformationFormValues,
  ): Promise<void> => {
    try {
      setIsLoading(true);

      const rigsWithoutCigsInformation: RigsWithoutCigsInformationFormValues = {
        rigsWithoutCigs: {
          ...data.rigsWithoutCigs,
          cigaretteFagerstromScore: calculateCigaretteFagerstromScore(
            data.rigsWithoutCigs.firstSmokeTime,
            data.rigsWithoutCigs.isDifficultToNotSmokeInForbiddenAreas,
            data.rigsWithoutCigs.cigaretteHateToGiveUp,
            data.rigsWithoutCigs.cigarettesPerDay,
            data.rigsWithoutCigs.smokeMoreInMorning,
            data.rigsWithoutCigs.smokeWhenIll,
          ),
          tobaccoFagerstromScore: calculateTobaccoFagerstromScore(
            data.rigsWithoutCigs.firstTobaccoTime,
            data.rigsWithoutCigs.swallowTobaccoJuice,
            data.rigsWithoutCigs.tobaccoHateToGiveUp,
            data.rigsWithoutCigs.tobaccoCansPerWeek,
            data.rigsWithoutCigs.tobaccoChewMoreAfterAwakening,
            data.rigsWithoutCigs.tobaccoChewWhenIll,
          ),
        },
      };

      const [, error] = await handleAddRigsWithoutCigsInformation(
        rigsWithoutCigsInformation,
        user,
      );

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

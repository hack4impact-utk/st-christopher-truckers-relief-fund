"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import CigarettesFagerstromQuestionsQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/FagerstromQuestions/CigarettesFagerstromQuestions";
import SmokelessTobaccoFagerstromQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/FagerstromQuestions/SmokelessTobaccoFagerstromQuestions";
import { handleCreateFagerstromTest } from "@/server/api/fagerstrom-tests/public-mutations";
import { FagerstromTest, User } from "@/types";
import calculateCigaretteFagerstromScore from "@/utils/calculateCigaretteFagerstromScore";
import calculateTobaccoFagerstromScore from "@/utils/calculateTobaccoFagerstromScore";
import dayjsUtil from "@/utils/dayjsUtil";

const fagerstromTestValidator = z.object({
  rigsWithoutCigs: z.object({
    doesUseCigarettes: z.boolean(),
    doesUseSmokelessTobacco: z.boolean(),

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
  }),
});

type FagerstromTestFormValues = z.infer<typeof fagerstromTestValidator>;

type FagerstromTestFormProps = {
  user: User;
};

export default function FagerstromTestForm({
  user,
}: FagerstromTestFormProps): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FagerstromTestFormValues>({
    resolver: zodResolver(fagerstromTestValidator),
    defaultValues: {
      rigsWithoutCigs: {
        doesUseCigarettes: false,
        doesUseSmokelessTobacco: false,

        cigaretteFagerstromScore: 0,
        firstSmokeTime: "After 60 minutes",
        isDifficultToNotSmokeInForbiddenAreas: false,
        cigaretteHateToGiveUp: "All others",
        cigarettesPerDay: "10 or less",
        smokeMoreInMorning: false,
        smokeWhenIll: false,

        tobaccoFagerstromScore: 0,
        firstTobaccoTime: "After 60 minutes",
        swallowTobaccoJuice: "Never",
        tobaccoHateToGiveUp: "All others",
        tobaccoCansPerWeek: "1",
        tobaccoChewMoreAfterAwakening: false,
        tobaccoChewWhenIll: false,
      },
    },
  });

  const onSubmit = async (data: FagerstromTestFormValues): Promise<void> => {
    setIsLoading(true);

    console.log("test");

    const { rigsWithoutCigs } = data;

    const fagerstromTest: FagerstromTest = {
      ...rigsWithoutCigs,
      cigaretteFagerstromScore: calculateCigaretteFagerstromScore(
        rigsWithoutCigs.firstSmokeTime,
        rigsWithoutCigs.isDifficultToNotSmokeInForbiddenAreas,
        rigsWithoutCigs.cigaretteHateToGiveUp,
        rigsWithoutCigs.cigarettesPerDay,
        rigsWithoutCigs.smokeMoreInMorning,
        rigsWithoutCigs.smokeWhenIll,
      ),
      tobaccoFagerstromScore: calculateTobaccoFagerstromScore(
        rigsWithoutCigs.firstTobaccoTime,
        rigsWithoutCigs.swallowTobaccoJuice,
        rigsWithoutCigs.tobaccoHateToGiveUp,
        rigsWithoutCigs.tobaccoCansPerWeek,
        rigsWithoutCigs.tobaccoChewMoreAfterAwakening,
        rigsWithoutCigs.tobaccoChewWhenIll,
      ),
      submittedDate: dayjsUtil().utc().toISOString(),
      client: user,
    };

    const [, error] = await handleCreateFagerstromTest(fagerstromTest);

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred.", {
        variant: "error",
      });
      setIsLoading(false);
      return;
    }

    enqueueSnackbar("Fagerstrom test submitted successfully.", {
      variant: "success",
    });
    setIsLoading(false);
    setIsDisabled(true);
  };

  const selectedCigarettes = watch("rigsWithoutCigs.doesUseCigarettes");
  const selectedSmokelessTobacco = watch(
    "rigsWithoutCigs.doesUseSmokelessTobacco",
  );

  const showSubmitButton = selectedCigarettes || selectedSmokelessTobacco;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4">Fagerstrom Test</Typography>
        <Divider />
        <Typography>What form of tobacco do you use?</Typography>
        <Controller
          name="rigsWithoutCigs.doesUseCigarettes"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Cigarettes"
            />
          )}
        />
        <Controller
          name="rigsWithoutCigs.doesUseSmokelessTobacco"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Smokeless"
            />
          )}
        />

        {selectedCigarettes && (
          <CigarettesFagerstromQuestionsQuestions
            control={control}
            errors={errors}
          />
        )}
        {selectedSmokelessTobacco && (
          <SmokelessTobaccoFagerstromQuestions
            control={control}
            errors={errors}
          />
        )}

        {showSubmitButton && (
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            disabled={isDisabled}
            sx={{ width: "100%" }}
          >
            Submit
          </LoadingButton>
        )}
      </Box>
    </form>
  );
}

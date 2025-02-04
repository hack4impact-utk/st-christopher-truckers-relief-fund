"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useEnrollmentForm from "@/hooks/useEnrollmentForm";
import { handleEnrollmentFormSubmission } from "@/server/api/enrollment-forms/public-mutations";
import {
  ProgramSpecificQuestionsSection,
  programSpecificQuestionsSectionValidator,
} from "@/types";
import apiErrors from "@/utils/constants/apiErrors";

import GetPreventativeScreeningsProgramSpecificQuestions from "./GetPreventativeScreeningsProgramSpecificQuestions";
import HealthyHabitsProgramSpecificQuestions from "./HealthyHabitsProgramSpecificQuestions";
import RigsWithoutCigsProgramSpecificQuestions from "./RigsWithoutCigsProgramSpecificQuestions";
import VaccineVoucherProgramSpecificQuestions from "./VaccineVoucherProgramSpecificQuestions";

export default function ProgramSpecificQuestionsFormSection(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const {
    enrollmentForm,
    completedSections,
    updateProgramSpecificQuestionsSection,
  } = useEnrollmentForm();

  const router = useRouter();

  // redirect to general information section if missing previous sections
  useEffect(() => {
    if (
      !completedSections.generalInformationSectionCompleted ||
      !completedSections.qualifyingQuestionsSectionCompleted ||
      !completedSections.programSelectionSectionCompleted
    ) {
      router.push("/enrollment-form/general-information");
    }
  }, [
    completedSections.generalInformationSectionCompleted,
    completedSections.programSelectionSectionCompleted,
    completedSections.qualifyingQuestionsSectionCompleted,
    router,
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
  } = useForm<ProgramSpecificQuestionsSection>({
    resolver: zodResolver(programSpecificQuestionsSectionValidator),
    defaultValues: enrollmentForm.programSpecificQuestionsSection,
  });

  const onSubmit = (data: ProgramSpecificQuestionsSection): void => {
    setIsLoading(true);
    updateProgramSpecificQuestionsSection(data);
  };

  const onError = (): void => {
    window.alert("Please review all fields before continuing.");
  };

  // submit form if all sections are completed
  useEffect(() => {
    const submitForm = async (): Promise<void> => {
      if (completedSections.programSpecificQuestionsSectionCompleted) {
        const [, error] = await handleEnrollmentFormSubmission(enrollmentForm);

        if (error === null) {
          enqueueSnackbar("Enrollment form submitted successfully");
          router.push("/enrollment-form/submitted");
        } else if (error === apiErrors.user.userAlreadyExists) {
          enqueueSnackbar("You already have an account");
          setIsLoading(false);
        } else if (
          error === apiErrors.enrollmentForm.enrollmentFormAlreadyExists
        ) {
          enqueueSnackbar("You have already submitted this form");
          setIsLoading(false);
        } else {
          enqueueSnackbar("An unknown error occurred");
          setIsLoading(false);
        }
      }
    };

    void submitForm();
  }, [
    completedSections.programSpecificQuestionsSectionCompleted,
    enrollmentForm,
    router,
    enqueueSnackbar,
  ]);

  const hasOptedInToHealthyHabits =
    enrollmentForm.programSelectionSection.optedInToHealthyHabits;
  const hasOptedInToDiabetesPrevention =
    enrollmentForm.programSelectionSection.optedInToDiabetesPrevention;
  const hasOptedInToRigsWithoutCigs =
    enrollmentForm.programSelectionSection.optedInToRigsWithoutCigs;
  const hasOptedInToVaccineVoucher =
    enrollmentForm.programSelectionSection.optedInToVaccineVoucher;
  const hasOptedInToGetPreventativeScreenings =
    enrollmentForm.programSelectionSection.optedInToGetPreventativeScreenings;

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
        }}
      >
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
            enrollmentForm={enrollmentForm}
          />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 2,
          }}
        >
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              setIsLoading(true);
              router.push("/enrollment-form/program-selection");
            }}
            loading={isLoading}
            sx={{ width: "100%" }}
          >
            Back
          </LoadingButton>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            sx={{ width: "100%" }}
          >
            Submit
          </LoadingButton>
        </Box>

        <Typography color="red">
          {submitCount && !isSubmitSuccessful
            ? "Please review all fields before continuing."
            : ""}
        </Typography>
      </Box>
    </form>
  );
}

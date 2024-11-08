"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import GetPreventativeScreeningsProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/GetPreventativeScreeningsProgramSpecificQuestions";
import HealthyHabitsProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/HealthyHabitsProgramSpecificQuestions";
import RigsWithoutCigsProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/RigsWithoutCigsProgramSpecificQuestions";
import VaccineVoucherProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/VaccineVoucherProgramSpecificQuestions";
import useEnrollmentForm from "@/hooks/useEnrollmentForm";
import {
  ProgramSpecificQuestionsSection,
  programSpecificQuestionsSectionValidator,
} from "@/types/EnrollmentForm";

export default function ProgramSpecificQuestionsFormSection() {
  const {
    enrollmentForm,
    completedSections,
    updateProgramSpecificQuestionsSection,
  } = useEnrollmentForm();
  const router = useRouter();

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
    watch,
  } = useForm<ProgramSpecificQuestionsSection>({
    resolver: zodResolver(programSpecificQuestionsSectionValidator),
    defaultValues: enrollmentForm.programSpecificQuestionsSection,
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

  console.log(enrollmentForm);
  const onSubmit = async (data: ProgramSpecificQuestionsSection) => {
    updateProgramSpecificQuestionsSection(data);
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/enrollment-form/program-selection")}
            sx={{ width: "100%" }}
          >
            Back
          </Button>
          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
          >
            Submit
          </Button>
        </Box>

        <Typography variant="h6" fontWeight="normal" color="red">
          {submitCount && !isSubmitSuccessful
            ? "Please review all fields before continuing."
            : ""}
        </Typography>
      </Box>
    </form>
  );
}

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
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useEnrollmentForm from "@/hooks/useEnrollmentForm";
import {
  EnrollmentForm,
  ProgramSelectionSection,
  programSelectionSectionValidator,
} from "@/types";
import calculateAge from "@/utils/calculateAge";

function shouldShowDiabetesPreventionButton(
  enrollmentForm: EnrollmentForm,
): boolean {
  if (enrollmentForm.qualifyingQuestionsSection.diagnoses.hasType1Diabetes) {
    return false;
  }

  if (enrollmentForm.qualifyingQuestionsSection.diagnoses.hasType2Diabetes) {
    return false;
  }

  return true;
}

function shouldShowRigsWithoutCigsButton(
  enrollmentForm: EnrollmentForm,
): boolean {
  if (
    !enrollmentForm.qualifyingQuestionsSection
      .hasHealthConditionCausedByTobaccoUse
  ) {
    return false;
  }

  return true;
}

function shouldShowVaccineVoucherButton(
  enrollmentForm: EnrollmentForm,
): boolean {
  const age = calculateAge(
    enrollmentForm.generalInformationSection.dateOfBirth,
  );

  if (age > 65) {
    return false;
  }

  if (enrollmentForm.qualifyingQuestionsSection.hasHealthInsurance) {
    return false;
  }

  return true;
}

function shouldShowGetPreventativeScreeningsButton(
  enrollmentForm: EnrollmentForm,
): boolean {
  const age = calculateAge(
    enrollmentForm.generalInformationSection.dateOfBirth,
  );

  if (age < 40 || age > 75) {
    return false;
  }

  return true;
}

export default function ProgramSelectionFormSection(): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const { enrollmentForm, completedSections, updateProgramSelectionSection } =
    useEnrollmentForm();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
  } = useForm<ProgramSelectionSection>({
    resolver: zodResolver(programSelectionSectionValidator),
    defaultValues: enrollmentForm.programSelectionSection,
  });

  // redirect to general information section missing previous sections
  useEffect(() => {
    if (
      !completedSections.generalInformationSectionCompleted ||
      !completedSections.qualifyingQuestionsSectionCompleted
    ) {
      router.push("/enrollment-form/general-information");
    }
  }, [
    completedSections.generalInformationSectionCompleted,
    completedSections.qualifyingQuestionsSectionCompleted,
    router,
  ]);

  const onSubmit = (data: ProgramSelectionSection): void => {
    setIsLoading(true);
    updateProgramSelectionSection(data);
    router.push("/enrollment-form/program-specific-questions");
  };

  const { enqueueSnackbar } = useSnackbar();

  const onError = (): void => {
    enqueueSnackbar("Please review all fields before continuing.", {
      variant: "error",
    });
  };

  const showDiabetesButton = shouldShowDiabetesPreventionButton(enrollmentForm);
  const showRigsWithoutCigsButton =
    shouldShowRigsWithoutCigsButton(enrollmentForm);
  const showVaccineVoucherButton =
    shouldShowVaccineVoucherButton(enrollmentForm);
  const showGetPreventativeScreeningsButton =
    shouldShowGetPreventativeScreeningsButton(enrollmentForm);

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
        {/* Title: Enrollment Form */}
        <Typography variant="h4">Program Selection</Typography>
        <Divider />

        <Typography>
          Please select the programs you are interested in.
        </Typography>

        <Controller
          name="optedInToHealthyHabits"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Healthy Habits"
            />
          )}
        />

        {showDiabetesButton && (
          <Controller
            name="optedInToDiabetesPrevention"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Diabetes Prevention"
              />
            )}
          />
        )}

        {showRigsWithoutCigsButton && (
          <Controller
            name="optedInToRigsWithoutCigs"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Rigs Without Cigs"
              />
            )}
          />
        )}

        {showVaccineVoucherButton && (
          <Controller
            name="optedInToVaccineVoucher"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Vaccine Voucher"
              />
            )}
          />
        )}

        {showGetPreventativeScreeningsButton && (
          <Controller
            name="optedInToGetPreventativeScreenings"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Get Preventative Screenings"
              />
            )}
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
              router.push("/enrollment-form/qualifying-questions");
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
            Next
          </LoadingButton>
        </Box>

        <Typography color="red">
          {errors.root?.message}
          {errors.optedInToHealthyHabits?.message}
        </Typography>

        <Typography color="red">
          {submitCount && !isSubmitSuccessful
            ? "Please review all fields before continuing."
            : ""}
        </Typography>
      </Box>
    </form>
  );
}

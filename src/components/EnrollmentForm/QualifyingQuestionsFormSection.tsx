"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import useEnrollmentForm from "@/hooks/useEnrollmentForm";
import {
  QualifyingQuestionsSection,
  qualifyingQuestionsSectionValidator,
} from "@/types/EnrollmentForm";

export default function QualifyingQuestionsFormSection() {
  const {
    enrollmentForm,
    completedSections,
    updateQualifyingQuestionsSection,
  } = useEnrollmentForm();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
  } = useForm<QualifyingQuestionsSection>({
    resolver: zodResolver(qualifyingQuestionsSectionValidator),
    defaultValues: enrollmentForm.qualifyingQuestionsSection,
  });

  useEffect(() => {
    if (!completedSections.generalInformationSectionCompleted) {
      router.push("/enrollment-form/general-information");
    }
  }, [completedSections.generalInformationSectionCompleted, router]);

  const onSubmit = async (data: QualifyingQuestionsSection) => {
    updateQualifyingQuestionsSection(data);
    router.push("/enrollment-form/program-selection");
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
        {/* Title: Enrollment Form */}
        <Typography variant="h4">Qualifying Questions</Typography>
        <Divider />

        <Typography variant="h6">Diagnoses</Typography>
        <Typography>
          Which of the following conditions do you have? <br /> (Check all that
          apply.)
        </Typography>

        <Controller
          name="diagnoses.hasType1Diabetes"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Type 1 Diabetes"
            />
          )}
        />

        <Controller
          name="diagnoses.hasType2Diabetes"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Type 2 Diabetes"
            />
          )}
        />

        <Controller
          name="diagnoses.hasHighBloodPressure"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="High Blood Pressure"
            />
          )}
        />

        <Controller
          name="diagnoses.hasHighCholesterol"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="High Cholesterol"
            />
          )}
        />

        <Controller
          name="diagnoses.hasHeartDisease"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Heart Disease"
            />
          )}
        />

        <Controller
          name="diagnoses.isObese"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Obese"
            />
          )}
        />

        <Controller
          name="diagnoses.noneOfTheAbove"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="None of the above"
            />
          )}
        />

        <ControlledTextField
          control={control}
          name="diagnoses.hasOther"
          label="Other"
          variant="outlined"
          error={errors.diagnoses?.hasOther}
          multiline
          rows={3}
        />

        <Divider />

        <Typography variant="h6">Other</Typography>
        <Typography>Check all that apply.</Typography>

        <Controller
          name="isTobaccoUser"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Are you a tobacco user?"
            />
          )}
        />

        <Controller
          name="hasAppliedForFinancialAssistance"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Have you ever applied for financial assistance?"
            />
          )}
        />

        <Controller
          name="hasHealthConditionCausedByTobaccoUse"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Do you have a health condition that may have been been 
              caused or exacerbated by tobacco use? (e.g. lung cancer, stroke, etc.)"
            />
          )}
        />

        <Controller
          name="hasHealthInsurance"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Do you have health insurance?"
            />
          )}
        />

        <Controller
          name="hasCloseFamilyHistoryOfProstateCancer"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Do you have a close family history (father or brother) of prostate cancer?"
            />
          )}
        />

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
            onClick={() => router.push("/enrollment-form/general-information")}
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
            Next
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

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

import useEnrollmentForm from "@/hooks/useEnrollmentForm";
import {
  ProgramSelectionSection,
  programSelectionSectionValidator,
} from "@/types/EnrollmentForm";

export default function ProgramSelectionFormSection() {
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

  const onSubmit = async (data: ProgramSelectionSection) => {
    updateProgramSelectionSection(data);
    router.push("/enrollment-form/program-specific-questions");
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
        <Typography variant="h4">Program Selection</Typography>
        <Divider />

        <Typography>
          Please select the programs you are interested in.
        </Typography>

        <Controller
          name="optedInToHealthyHabits"
          control={control}
          render={({ field }) => (
            <>
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Healthy Habits"
              />
            </>
          )}
        />

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

        <Controller
          name="optedInToGetPreventativeScreenings"
          control={control}
          render={({ field }) => (
            <>
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Get Preventative Screenings"
              />
            </>
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
            onClick={() => router.push("/enrollment-form/qualifying-questions")}
            sx={{ width: "100%" }}
          >
            Back
          </Button>
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
          {errors.root?.message}
          {errors.optedInToHealthyHabits?.message}
        </Typography>

        <Typography variant="h6" fontWeight="normal" color="red">
          {submitCount && !isSubmitSuccessful
            ? "Please review all fields before continuing."
            : ""}
        </Typography>
      </Box>
    </form>
  );
}

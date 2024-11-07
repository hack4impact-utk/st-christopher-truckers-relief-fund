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
import { Controller, useForm } from "react-hook-form";

import {
  ProgramSelectionSection,
  programSelectionSectionValidator,
} from "@/types/EnrollmentForm";

export default function ProgramSelectionFormSection() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProgramSelectionSection>({
    resolver: zodResolver(programSelectionSectionValidator),
    defaultValues: {
      optedInToHealthyHabits: false,
      optedInToDiabetesPrevention: false,
      optedInToRigsWithoutCigs: false,
      optedInToVaccineVoucher: false,
      optedInToGetPreventativeScreenings: false,
    },
  });

  const onSubmit = async (data: ProgramSelectionSection) => {
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
        {/* Title: Enrollment Form */}
        <Typography variant="h4">Program Selection</Typography>
        <Divider />

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

        {/* Submit */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        <Typography variant="h6" fontWeight="normal" color="red">
          {errors.root?.message}
          {errors.optedInToHealthyHabits?.message}
        </Typography>
      </Box>
    </form>
  );
}

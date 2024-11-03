"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import {
  HealthyHabitsFormValues,
  healthyHabitsValidator,
} from "@/types/HealthyHabitsForm";

export default function HealthyHabitsForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HealthyHabitsFormValues>({
    resolver: zodResolver(healthyHabitsValidator),
    defaultValues: {
      weight: 0,
      movementMinutes: 0,
      bloodPressure: "",
      bloodGlucose: 0,
    },
  });

  const onSubmit = (data: HealthyHabitsFormValues) => {
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
        {/* Title: Healthy Habits */}
        <Typography variant="h4">Healthy Habits</Typography>

        <Divider />

        {/* Section Title: Account Information */}
        <Typography variant="h6">Account Information</Typography>

        {/* Health Conditions */}
        {/* Pull from user data if applicable in the future. */}
        <ControlledTextField
          control={control}
          name="healthConditions"
          label="Health Conditions"
          variant="outlined"
          error={errors?.healthConditions}
          multiline
          rows={3}
        />

        {/* Medical Devices */}
        {/* Pull from user data if applicable in the future. */}
        <ControlledTextField
          control={control}
          name="devices"
          label="Medical Devices"
          variant="outlined"
          error={errors?.devices}
        />

        <Divider />

        {/* Section Title: Weekly Updates */}
        <Typography variant="h6">Weekly Updates</Typography>

        {/* Weight */}
        <ControlledTextField
          control={control}
          name="weight"
          label="Weight"
          variant="outlined"
          error={errors?.weight}
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
            },
          }}
          convertToNumber={true}
        />

        {/* Movement Minutes */}
        <ControlledTextField
          control={control}
          name="movementMinutes"
          label="Movement Minutes"
          variant="outlined"
          error={errors?.movementMinutes}
          type="number"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">minutes</InputAdornment>
              ),
            },
          }}
          convertToNumber={true}
        />

        {/* Blood Pressure */}
        <ControlledTextField
          control={control}
          name="bloodPressure"
          label="Blood Pressure (e.g. 120/80)"
          variant="outlined"
          error={errors?.bloodPressure}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">mmHg</InputAdornment>
              ),
            },
          }}
        />

        {/* Blood Glucose (when fasting) */}
        <ControlledTextField
          control={control}
          name="bloodGlucose"
          label="Blood Glucose (when fasting)"
          variant="outlined"
          error={errors?.bloodGlucose}
          type="number"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">mg/dL</InputAdornment>
              ),
            },
          }}
          convertToNumber={true}
        />

        {/* A1C */}
        <ControlledTextField
          control={control}
          name="a1c"
          label="A1C"
          variant="outlined"
          error={errors?.a1c}
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          convertToNumber={true}
        />

        {/* Cholesterol */}
        <ControlledTextField
          control={control}
          name="cholesterol"
          label="Cholesterol"
          variant="outlined"
          error={errors?.cholesterol}
          type="number"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">mg/dL</InputAdornment>
              ),
            },
          }}
          convertToNumber={true}
        />

        {/* Qualitative Goals */}
        <ControlledTextField
          control={control}
          name="qualitativeGoals"
          label="Qualitative Goals"
          variant="outlined"
          error={errors?.qualitativeGoals}
          multiline
          rows={3}
        />

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

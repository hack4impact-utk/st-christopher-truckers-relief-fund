"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Snackbar,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import { handleHealthyHabitsTrackingFormSubmission } from "@/server/api/healthy-habits-tracking-forms/public-mutations";
import {
  HealthyHabitsFormValues,
  HealthyHabitsTrackingForm,
  healthyHabitsValidator,
} from "@/types/HealthyHabitsTrackingForm";
import apiErrors from "@/utils/constants/apiErrors";
import dayjsUtil from "@/utils/dayjsUtil";
import getClosestPastSunday from "@/utils/getClosestPastSunday";

type HealthyHabitsTrackingFormProps = {
  email: string;
};

export default function HealthyHabitsTracking({
  email,
}: HealthyHabitsTrackingFormProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HealthyHabitsFormValues>({
    resolver: zodResolver(healthyHabitsValidator),
    defaultValues: {
      submittedDate: getClosestPastSunday(),
      healthConditions: "",
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
      weight: 0,
      movementMinutes: 0,
      systolicBloodPressure: 0,
      diastolicBloodPressure: 0,
      bloodGlucose: 0,
      a1c: 0,
      cholesterol: 0,
      qualitativeGoals: "",
    },
  });

  const onSubmit = async (data: HealthyHabitsFormValues) => {
    setIsLoading(true);

    const healthyHabitsTrackingForm: HealthyHabitsTrackingForm = {
      ...data,
      email,
      bloodPressure:
        data.systolicBloodPressure + "/" + data.diastolicBloodPressure,
    };

    const [, error] = await handleHealthyHabitsTrackingFormSubmission(
      healthyHabitsTrackingForm,
    );

    if (error === null) {
      setSnackbarMessage("Healthy Habits Tracking Form submitted successfully");
    } else if (
      error ===
      apiErrors.healthyHabitsTrackingForm.healthyHabitsTrackingFormAlreadyExists
    ) {
      setSnackbarMessage("You have already submitted the form for this week.");
    } else {
      setSnackbarMessage("An unknown error occurred");
    }

    setSnackbarOpen(true);
    setIsLoading(false);
    setDisabled(true);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "min(90vw, 700px)",
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: "1fr",
          }}
        >
          <Typography variant="h6">Date</Typography>
          <Controller
            name="submittedDate"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.submittedDate} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    {...field}
                    value={dayjsUtil(field.value, "MM/DD/YYYY")}
                    onChange={(date) =>
                      field.onChange(date?.format("MM/DD/YYYY") || "")
                    }
                    label="Date"
                    format="MM/DD/YYYY"
                    shouldDisableDate={(day) => {
                      return day.day() !== 0;
                    }}
                  />
                </LocalizationProvider>
                <FormHelperText>{errors.submittedDate?.message}</FormHelperText>
              </FormControl>
            )}
          />

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
            required
          />

          {/* Medical Devices */}
          <Typography variant="h6">Devices</Typography>
          <Typography>Select the devices you currently use.</Typography>
          <Controller
            name="devices.hasScale"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Scale"
                />
              </>
            )}
          />

          <Controller
            name="devices.hasBloodPressureCuff"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Blood Pressure Cuff"
                />
              </>
            )}
          />

          <Controller
            name="devices.hasGlucoseMonitor"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Glucose Monitor"
                />
              </>
            )}
          />

          <Controller
            name="devices.hasA1cHomeTest"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="A1c Home Test"
                />
              </>
            )}
          />

          <Controller
            name="devices.hasFitnessTracker"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Fitness Tracker (e.g., Fitbit, Apple Watch, Samsung Watch, etc)"
                />
              </>
            )}
          />

          <Controller
            name="devices.hasBodyTapeMeasure"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Body Tape Measure"
                />
              </>
            )}
          />

          <Controller
            name="devices.hasResistanceBands"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Resistance Bands"
                />
              </>
            )}
          />

          <Controller
            name="devices.hasOtherExerciseEquipment"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Other Exercise Equipment"
                />
              </>
            )}
          />

          <Controller
            name="devices.noneOfTheAbove"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="None of the above"
                />
              </>
            )}
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
                endAdornment: (
                  <InputAdornment position="end">lbs</InputAdornment>
                ),
              },
            }}
            convertToNumber={true}
            required
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
            required
          />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <ControlledTextField
              control={control}
              name="systolicBloodPressure"
              label="Systolic Blood Pressure"
              variant="outlined"
              error={errors?.systolicBloodPressure}
              type="number"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">mmHg</InputAdornment>
                  ),
                },
              }}
              required
              convertToNumber={true}
              sx={{ width: "100%" }}
            />
            <ControlledTextField
              control={control}
              name="diastolicBloodPressure"
              label="Diastolic Blood Pressure"
              variant="outlined"
              error={errors?.diastolicBloodPressure}
              type="number"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">mmHg</InputAdornment>
                  ),
                },
              }}
              required
              convertToNumber={true}
              sx={{ width: "100%" }}
            />
          </Box>

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
            required
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
            required
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
            required
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
            required
          />

          {/* Submit */}
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            disabled={disabled}
          >
            Submit
          </LoadingButton>

          <Typography variant="h6" fontWeight="normal" color="red">
            {errors.root?.message}
          </Typography>
        </Box>
      </form>
    </>
  );
}

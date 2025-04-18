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
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import { handleHealthyHabitsTrackingFormSubmission } from "@/server/api/healthy-habits-tracking-forms/public-mutations";
import {
  ClientUser,
  HealthyHabitsFormValues,
  HealthyHabitsTrackingForm,
  healthyHabitsValidator,
} from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import dayjsUtil from "@/utils/dayjsUtil";
import getClosestPastSunday from "@/utils/getClosestPastSunday";

function hasCompletedFormForSelectedWeek(
  date: string,
  trackingForms: HealthyHabitsTrackingForm[],
): boolean {
  const sundayForSelectedDate = getClosestPastSunday(
    dayjsUtil(date, "MM/DD/YYYY"),
  );

  return trackingForms.some((trackingForm) =>
    dayjsUtil(trackingForm.weekOfSubmission).isSame(
      sundayForSelectedDate,
      "day",
    ),
  );
}

type HealthyHabitsTrackingFormProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  setTrackingForms: Dispatch<SetStateAction<HealthyHabitsTrackingForm[]>>;
  user: ClientUser;
};

export default function HealthyHabitsTracking({
  trackingForms,
  setTrackingForms,
  user,
}: Readonly<HealthyHabitsTrackingFormProps>): ReactNode {
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<HealthyHabitsFormValues>({
    resolver: zodResolver(healthyHabitsValidator),
    defaultValues: {
      submittedDate: dayjsUtil().local().format("MM/DD/YYYY"),
      weekOfSubmission: "",
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
      bloodGlucose: null,
      a1c: null,
      cholesterol: null,
      qualitativeGoals: "",
      sleepRanking: 1,
      energyRanking: 1,
      emotionalHealthRanking: 1,
    },
  });

  const onSubmit = async (data: HealthyHabitsFormValues): Promise<void> => {
    setIsLoading(true);

    const healthyHabitsTrackingForm: HealthyHabitsTrackingForm = {
      ...data,
      submittedDate: dayjsUtil(data.submittedDate).utc().toISOString(),
      weekOfSubmission: getClosestPastSunday(
        dayjsUtil(data.submittedDate, "MM/DD/YYYY"),
      ),
      user,
    };

    const [, error] = await handleHealthyHabitsTrackingFormSubmission(
      healthyHabitsTrackingForm,
    );

    if (error === null) {
      setTrackingForms((prevTrackingForms) => [
        ...prevTrackingForms,
        healthyHabitsTrackingForm,
      ]);
      enqueueSnackbar("Healthy Habits Tracking Form submitted successfully", {
        variant: "success",
      });
    } else if (error === apiErrors.duplicate) {
      enqueueSnackbar(
        "You have already submitted the form for the selected week.",
        { variant: "warning" },
      );
    } else {
      enqueueSnackbar("An unknown error occurred", { variant: "error" });
    }

    setIsLoading(false);
  };

  const date = watch("submittedDate");

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
                    field.onChange(date?.format("MM/DD/YYYY") ?? "")
                  }
                  label="Date"
                  format="MM/DD/YYYY"
                  disableFuture={true}
                />
              </LocalizationProvider>
              <FormHelperText>{errors.submittedDate?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Typography>
          {hasCompletedFormForSelectedWeek(date, trackingForms)
            ? "You have already submitted the form for the selected week."
            : "You have not submitted the form for the selected week."}
        </Typography>

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
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Scale"
            />
          )}
        />

        <Controller
          name="devices.hasBloodPressureCuff"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Blood Pressure Cuff"
            />
          )}
        />

        <Controller
          name="devices.hasGlucoseMonitor"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Glucose Monitor"
            />
          )}
        />

        <Controller
          name="devices.hasA1cHomeTest"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="A1c Home Test"
            />
          )}
        />

        <Controller
          name="devices.hasFitnessTracker"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Fitness Tracker (e.g., Fitbit, Apple Watch, Samsung Watch, etc)"
            />
          )}
        />

        <Controller
          name="devices.hasBodyTapeMeasure"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Body Tape Measure"
            />
          )}
        />

        <Controller
          name="devices.hasResistanceBands"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Resistance Bands"
            />
          )}
        />

        <Controller
          name="devices.hasOtherExerciseEquipment"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Other Exercise Equipment"
            />
          )}
        />

        <Controller
          name="devices.noneOfTheAbove"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="None of the above"
            />
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
              endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
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

        {/* Blood Pressure */}
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
          required
        />

        <Divider />

        <Typography variant="h6">Self Assessment</Typography>
        <Typography>
          For each question, rank your overall health in various categories. A 1
          is the worst score and a 5 is the best score.
        </Typography>

        <FormControl
          error={!!errors.sleepRanking?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            On a scale of 1-5, rank your overall health when it comes to sleep:
          </FormLabel>
          <Controller
            name="sleepRanking"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.sleepRanking?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.energyRanking?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            On a scale of 1-5, rank your overall health when it comes to energy:
          </FormLabel>
          <Controller
            name="energyRanking"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.energyRanking?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.emotionalHealthRanking?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            On a scale of 1-5, rank your overall health when it comes to
            emotional health:
          </FormLabel>
          <Controller
            name="emotionalHealthRanking"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.emotionalHealthRanking?.message}
          </FormHelperText>
        </FormControl>

        {/* Submit */}
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isLoading}
        >
          Submit
        </LoadingButton>

        <Typography variant="h6" fontWeight="normal" color="red">
          {errors.root?.message}
        </Typography>
      </Box>
    </form>
  );
}

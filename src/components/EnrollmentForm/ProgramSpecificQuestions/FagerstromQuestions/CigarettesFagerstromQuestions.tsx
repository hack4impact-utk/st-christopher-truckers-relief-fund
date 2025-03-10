/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

type CigarettesFagerstromQuestionsProps = {
  control: Control<any>;
  errors: any;
};

export default function CigarettesFagerstromQuestions({
  control,
  errors,
}: Readonly<CigarettesFagerstromQuestionsProps>): ReactNode {
  return (
    <>
      <Divider />
      <Typography variant="h6">Cigarettes Fagerstrom Test</Typography>

      <FormControl
        error={!!errors.rigsWithoutCigs?.firstSmokeTime?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          How soon after waking do you smoke your first cigarette?
        </FormLabel>
        <Controller
          name="rigsWithoutCigs.firstSmokeTime"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="Within 5 minutes"
                control={<Radio />}
                label="Within 5 minutes"
              />
              <FormControlLabel
                value="6-30 minutes"
                control={<Radio />}
                label="6-30 minutes"
              />
              <FormControlLabel
                value="31-60 minutes"
                control={<Radio />}
                label="31-60 minutes"
              />
              <FormControlLabel
                value="After 60 minutes"
                control={<Radio />}
                label="After 60 minutes"
              />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.firstSmokeTime?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={
          !!errors.rigsWithoutCigs?.isDifficultToNotSmokeInForbiddenAreas
            ?.message
        }
        sx={{ width: "100%" }}
      >
        <FormLabel>
          Do you find it difficult to refrain from smoking in places where it is
          forbidden?
        </FormLabel>
        <Controller
          name="rigsWithoutCigs.isDifficultToNotSmokeInForbiddenAreas"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(e) => field.onChange(e.target.value === "true")}
            >
              <FormControlLabel
                value={"true"}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value={"false"}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {
            errors.rigsWithoutCigs?.isDifficultToNotSmokeInForbiddenAreas
              ?.message
          }
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.cigaretteHateToGiveUp?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>Which cigarette would you hate to give up?</FormLabel>
        <Controller
          name="rigsWithoutCigs.cigaretteHateToGiveUp"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="The first one in the morning"
                control={<Radio />}
                label="The first one in the morning"
              />
              <FormControlLabel
                value="All others"
                control={<Radio />}
                label="All others"
              />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.cigaretteHateToGiveUp?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.cigarettesPerDay?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>How many cigarettes a day do you smoke?</FormLabel>
        <Controller
          name="rigsWithoutCigs.cigarettesPerDay"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="31 or more"
                control={<Radio />}
                label="31 or more"
              />
              <FormControlLabel
                value="21-30"
                control={<Radio />}
                label="21-30"
              />
              <FormControlLabel
                value="11-20"
                control={<Radio />}
                label="11-20"
              />
              <FormControlLabel
                value="10 or less"
                control={<Radio />}
                label="10 or less"
              />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.cigarettesPerDay?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.smokeMoreInMorning?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>Do you smoke more frequently in the morning?</FormLabel>
        <Controller
          name="rigsWithoutCigs.smokeMoreInMorning"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(e) => field.onChange(e.target.value === "true")}
            >
              <FormControlLabel
                value={"true"}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value={"false"}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.smokeMoreInMorning?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.smokeWhenIll?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          Do you smoke even if you are sick in bed most of the day?
        </FormLabel>
        <Controller
          name="rigsWithoutCigs.smokeWhenIll"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(e) => field.onChange(e.target.value === "true")}
            >
              <FormControlLabel
                value={"true"}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value={"false"}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.smokeWhenIll?.message}
        </FormHelperText>
      </FormControl>
    </>
  );
}

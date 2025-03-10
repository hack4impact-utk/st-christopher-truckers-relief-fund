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

type SmokelessTobaccoFagerstromQuestionsProps = {
  control: Control<any>;
  errors: any;
};

export default function SmokelessTobaccoFagerstromQuestions({
  control,
  errors,
}: Readonly<SmokelessTobaccoFagerstromQuestionsProps>): ReactNode {
  return (
    <>
      <Divider />
      <Typography variant="h6">Smokeless Tobacco Fagerstrom Test</Typography>

      <FormControl
        error={!!errors.rigsWithoutCigs?.firstTobaccoTime?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          How soon after you wake up do you place your first dip?
        </FormLabel>
        <Controller
          name="rigsWithoutCigs.firstTobaccoTime"
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
          {errors.rigsWithoutCigs?.firstTobaccoTime?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.swallowTobaccoJuice?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          How often do you intentionally swallow tobacco juice?
        </FormLabel>
        <Controller
          name="rigsWithoutCigs.swallowTobaccoJuice"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="Always"
                control={<Radio />}
                label="Always"
              />
              <FormControlLabel
                value="Sometimes"
                control={<Radio />}
                label="Sometimes"
              />
              <FormControlLabel
                value="Never"
                control={<Radio />}
                label="Never"
              />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.swallowTobaccoJuice?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.tobaccoHateToGiveUp?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>Which chew would you hate to give up most?</FormLabel>
        <Controller
          name="rigsWithoutCigs.tobaccoHateToGiveUp"
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
          {errors.rigsWithoutCigs?.tobaccoHateToGiveUp?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.tobaccoCansPerWeek?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>How many cans/pouches per week do you use?</FormLabel>
        <Controller
          name="rigsWithoutCigs.tobaccoCansPerWeek"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="More than 3"
                control={<Radio />}
                label="More than 3"
              />
              <FormControlLabel value="2-3" control={<Radio />} label="2-3" />
              <FormControlLabel value="1" control={<Radio />} label="1" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.tobaccoCansPerWeek?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.tobaccoChewMoreAfterAwakening?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          Do you chew more frequently during the first hours after awakening
          than during the rest of the day?
        </FormLabel>
        <Controller
          name="rigsWithoutCigs.tobaccoChewMoreAfterAwakening"
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
          {errors.rigsWithoutCigs?.tobaccoChewMoreAfterAwakening?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        error={!!errors.rigsWithoutCigs?.tobaccoChewWhenIll?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          Do you chew if you are so ill that you are in bed most of the day?
        </FormLabel>
        <Controller
          name="rigsWithoutCigs.tobaccoChewWhenIll"
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
          {errors.rigsWithoutCigs?.tobaccoChewWhenIll?.message}
        </FormHelperText>
      </FormControl>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";

type GetPreventativeScreeningsProgramSpecificQuestionsProps = {
  control: Control<any>;
  errors: any;
};

export default function GetPreventativeScreeningsProgramSpecificQuestions({
  control,
  errors,
}: GetPreventativeScreeningsProgramSpecificQuestionsProps) {
  return (
    <>
      <Divider />
      <Typography variant="h4">Get Preventative Screenings</Typography>

      <FormControl
        error={
          !!errors.getPreventativeScreenings?.agreeToProvideAccountability
            ?.message
        }
        sx={{ width: "100%" }}
      >
        <FormLabel>
          Do you agree to provide accountability for your health?
        </FormLabel>
        <Controller
          name="getPreventativeScreenings.agreeToProvideAccountability"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              value={field.value !== undefined ? String(field.value) : ""}
              onChange={(e) => field.onChange(e.target.value === "true")}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {
            errors.getPreventativeScreenings?.agreeToProvideAccountability
              ?.message
          }
        </FormHelperText>
      </FormControl>

      <Controller
        name="getPreventativeScreenings.prostateScreening.agreeToGetAccountRegistered"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="By checking this box, I acknowledge that the St. Christopher Fund 
        will create an account on my behalf through Call on Doc
         for the purpose of requesting a test kit, 
         providing results, and referral to resources
          if results are positive."
          />
        )}
      />
      <Controller
        name="getPreventativeScreenings.prostateScreening.agreesToProstateScreening"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="By checking this box, I am choosing to register myself 
        for the prostate cancer screening. 
        I will expect a follow-up email with information 
        needed to register"
          />
        )}
      />
      <Controller
        name="getPreventativeScreenings.prostateScreening.isNotApplicable"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Not Applicable"
          />
        )}
      />

      {errors.getPreventativeScreenings?.prostateScreening
        ?.agreeToGetAccountRegistered?.message && (
        <Typography variant="body1" color="error">
          {
            errors.getPreventativeScreenings?.prostateScreening
              ?.agreeToGetAccountRegistered?.message
          }
        </Typography>
      )}

      <ControlledTextField
        control={control}
        name="getPreventativeScreenings.prostateScreening.additionalQuestions"
        label="Additional questions"
        variant="outlined"
        error={
          errors.getPreventativeScreenings?.prostateScreening
            ?.additionalQuestions
        }
        multiline
        rows={3}
      />
    </>
  );
}

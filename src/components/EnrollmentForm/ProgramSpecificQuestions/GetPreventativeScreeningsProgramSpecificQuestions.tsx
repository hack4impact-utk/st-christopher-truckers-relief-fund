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
import { EnrollmentForm } from "@/types";
import calculateAge from "@/utils/calculateAge";

type GetPreventativeScreeningsProgramSpecificQuestionsProps = {
  control: Control<any>;
  errors: any;
  enrollmentForm: EnrollmentForm;
};

function isEligibleForProstateScreening(enrollmentForm: EnrollmentForm) {
  if (enrollmentForm.generalInformationSection.sex === "female") {
    return false;
  }

  const age = calculateAge(
    enrollmentForm.generalInformationSection.dateOfBirth,
  );

  if (age > 69) {
    return false;
  }

  if (
    enrollmentForm.qualifyingQuestionsSection
      .hasCloseFamilyHistoryOfProstateCancer
  ) {
    return age >= 40;
  } else {
    return age >= 50;
  }
}

export default function GetPreventativeScreeningsProgramSpecificQuestions({
  control,
  errors,
  enrollmentForm,
}: GetPreventativeScreeningsProgramSpecificQuestionsProps) {
  const showProstateScreening = isEligibleForProstateScreening(enrollmentForm);

  return (
    <>
      <Divider />
      <Typography variant="h4">Get Preventative Screenings</Typography>

      <FormControl
        error={!!errors.getPreventativeScreenings?.agreeToShareResults?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>
          By checking this box, you are agreeing to provide the St. Christopher
          Fund with results from your preventative cancer screenings
        </FormLabel>
        <Controller
          name="getPreventativeScreenings.agreeToShareResults"
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
          {errors.getPreventativeScreenings?.agreeToShareResults?.message}
        </FormHelperText>
      </FormControl>

      <Controller
        name="getPreventativeScreenings.prostateScreening.agreeToGetAccountRegistered"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                disabled={!showProstateScreening}
              />
            }
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
            control={
              <Checkbox
                {...field}
                checked={field.value}
                disabled={!showProstateScreening}
              />
            }
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
        <Typography color="error">
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

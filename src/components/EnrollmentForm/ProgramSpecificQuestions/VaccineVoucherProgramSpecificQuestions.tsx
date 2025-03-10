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
import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";

type VaccineVoucherProgramSpecificQuestionsProps = {
  control: Control<any>;
  errors: any;
};

export default function VaccineVoucherProgramSpecificQuestions({
  control,
  errors,
}: Readonly<VaccineVoucherProgramSpecificQuestionsProps>): ReactNode {
  return (
    <>
      <Divider />
      <Typography variant="h4">Vaccine Voucher</Typography>
      <Typography variant="h6">Vaccines</Typography>

      <Typography>
        Select the vaccines you are interested in receiving.
      </Typography>
      <Controller
        name="vaccineVoucher.vaccines.wantsFluVaccine"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Flu"
          />
        )}
      />
      <Controller
        name="vaccineVoucher.vaccines.wantsPneumoniaVaccine"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Pneumonia"
          />
        )}
      />
      <Controller
        name="vaccineVoucher.vaccines.wantsShinglesVaccine"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Shingles"
          />
        )}
      />
      <Controller
        name="vaccineVoucher.vaccines.wantsCovid19Vaccine"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="COVID-19"
          />
        )}
      />

      <FormControl
        error={!!errors.vaccineVoucher?.voucherLocation?.message}
        sx={{ width: "100%" }}
      >
        <FormLabel>Where do you want to get your vaccine voucher?</FormLabel>
        <Controller
          name="vaccineVoucher.voucherLocation"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="Walgreens"
                control={<Radio />}
                label="Walgreens"
              />
              <FormControlLabel
                value="Kroger and Kroger Family of Pharmacies"
                control={<Radio />}
                label="Kroger and Kroger Family of Pharmacies"
              />
              <FormControlLabel
                value="The Little Clinic"
                control={<Radio />}
                label="The Little Clinic"
              />
              <FormControlLabel
                value="Walmart"
                control={<Radio />}
                label="Walmart"
              />
              <FormControlLabel
                value="Sam's Club"
                control={<Radio />}
                label="Sam's Club"
              />
            </RadioGroup>
          )}
        />
        <FormHelperText sx={{ m: 0 }}>
          {errors.rigsWithoutCigs?.referralSource?.message}
        </FormHelperText>
      </FormControl>

      <ControlledTextField
        control={control}
        name="vaccineVoucher.additionalQuestions"
        label="Additional questions"
        variant="outlined"
        error={errors.vaccineVoucher?.additionalQuestions}
        multiline
        rows={3}
      />

      <Typography color="red">
        {errors.vaccineVoucher?.vaccines?.wantsFluVaccine?.message}
      </Typography>
    </>
  );
}

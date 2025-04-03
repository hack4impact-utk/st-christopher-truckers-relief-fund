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
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { handleVaccineVoucherRequestSubmission } from "@/server/api/vaccine-voucher-requests/public-mutations";
import { ClientUser, VaccineName, VaccineVoucherRequest } from "@/types";
import calculateAge from "@/utils/calculateAge";
import dayjsUtil from "@/utils/dayjsUtil";

import {
  fieldNameToVaccineName,
  getLastVaccineVoucherRequest,
  shouldShowFluVaccine,
  shouldShowPneumoniaVaccine,
  shouldShowShinglesBoosterVaccine,
  shouldShowShinglesVaccine,
} from "./helpers";
import LastRequestDates from "./LastRequestDates";
import NextVaccineDueDates from "./NextVaccineDueDates";

const vaccineRequestFormValidator = z
  .object({
    wantsFluVaccine: z.boolean(),
    wantsPneumoniaVaccine: z.boolean(),
    wantsShinglesVaccine: z.boolean(),
    wantsShinglesBoosterVaccine: z.boolean(),
    pharmacyName: z.enum([
      "Walgreens",
      "Kroger and Kroger Family of Pharmacies",
      "The Little Clinic",
      "Walmart",
      "Sam's Club",
    ]),
  })
  .superRefine((val, ctx) => {
    if (
      !val.wantsFluVaccine &&
      !val.wantsPneumoniaVaccine &&
      !val.wantsShinglesVaccine &&
      !val.wantsShinglesBoosterVaccine
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must select at least one vaccine",
        path: ["pharmacyName"],
      });
    }
  });

type VaccineRequestFormValues = z.infer<typeof vaccineRequestFormValidator>;

type VaccineVoucherApplyFormProps = {
  user: ClientUser;
  vaccineVoucherRequests: VaccineVoucherRequest[];
  setVaccineVoucherRequests: Dispatch<SetStateAction<VaccineVoucherRequest[]>>;
};

export default function VaccineVoucherApplyForm({
  user,
  vaccineVoucherRequests,
  setVaccineVoucherRequests,
}: Readonly<VaccineVoucherApplyFormProps>): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VaccineRequestFormValues>({
    resolver: zodResolver(vaccineRequestFormValidator),
    defaultValues: {
      wantsFluVaccine: false,
      wantsPneumoniaVaccine: false,
      wantsShinglesVaccine: false,
      wantsShinglesBoosterVaccine: false,
      pharmacyName: "Walgreens",
    },
  });

  const onSubmit = async (data: VaccineRequestFormValues): Promise<void> => {
    setIsLoading(true);
    let error = false;

    const requestedVaccines: VaccineName[] = [];

    for (const [fieldName, value] of Object.entries(data)) {
      if (fieldName !== "pharmacyName" && value) {
        requestedVaccines.push(fieldNameToVaccineName(fieldName));
      }
    }

    const createdRequests: VaccineVoucherRequest[] = [];

    for (const requestedVaccine of requestedVaccines) {
      const request: VaccineVoucherRequest = {
        user,
        vaccineName: requestedVaccine,
        submittedDate: dayjsUtil().utc().toISOString(),
        pharmacyName: data.pharmacyName,
        status: "requested",
      };

      createdRequests.push(request);

      const [, createVaccineVoucherRequestError] =
        await handleVaccineVoucherRequestSubmission(request);

      error = error || createVaccineVoucherRequestError !== null;
    }

    if (error) {
      enqueueSnackbar("An unexpected error occurred.", {
        variant: "error",
      });
    } else {
      setVaccineVoucherRequests((prevRequests) => [
        ...prevRequests,
        ...createdRequests,
      ]);
      enqueueSnackbar("Vaccine voucher requests submitted successfully.", {
        variant: "success",
      });
    }

    setIsLoading(false);
  };

  const age = calculateAge(user.dateOfBirth);

  if (age > 65) {
    return (
      <Box
        sx={{
          width: "min(90vw, 700px)",
          boxShadow: 3,
          borderRadius: 2,
          padding: 4,
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          You are ineligible for any vaccine vouchers as you are over 65.
        </Typography>
      </Box>
    );
  }

  const lastFluVaccineRequest = getLastVaccineVoucherRequest(
    vaccineVoucherRequests,
    "Flu",
  );
  const lastPneumoniaVaccineRequest = getLastVaccineVoucherRequest(
    vaccineVoucherRequests,
    "Pneumonia",
  );
  const lastShinglesVaccineRequest = getLastVaccineVoucherRequest(
    vaccineVoucherRequests,
    "Shingles",
  );
  const lastShinglesBoosterVaccineRequest = getLastVaccineVoucherRequest(
    vaccineVoucherRequests,
    "Shingles Booster",
  );

  const showFluVaccineOption = shouldShowFluVaccine(lastFluVaccineRequest);
  const showPneumoniaVaccineOption = shouldShowPneumoniaVaccine(
    lastPneumoniaVaccineRequest,
  );
  const showShinglesVaccineOption = shouldShowShinglesVaccine(
    lastShinglesVaccineRequest,
  );
  const showShinglesBoosterVaccineOption = shouldShowShinglesBoosterVaccine(
    lastShinglesBoosterVaccineRequest,
  );

  if (
    !showFluVaccineOption &&
    !showPneumoniaVaccineOption &&
    !showShinglesVaccineOption &&
    !showShinglesBoosterVaccineOption
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "min(90vw, 700px)",
          boxShadow: 3,
          borderRadius: 2,
          padding: 4,
        }}
      >
        <LastRequestDates
          lastFluVaccineRequest={lastFluVaccineRequest}
          lastPneumoniaVaccineRequest={lastPneumoniaVaccineRequest}
          lastShinglesVaccineRequest={lastShinglesVaccineRequest}
          lastShinglesBoosterVaccineRequest={lastShinglesBoosterVaccineRequest}
        />
        <NextVaccineDueDates
          lastFluVaccineRequest={lastFluVaccineRequest}
          lastPneumoniaVaccineRequest={lastPneumoniaVaccineRequest}
          lastShinglesVaccineRequest={lastShinglesVaccineRequest}
          lastShinglesBoosterVaccineRequest={lastShinglesBoosterVaccineRequest}
        />
        <Divider />
        <Typography variant="h5" textAlign="center" gutterBottom>
          You are ineligible for any vaccine vouchers at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "min(90vw, 700px)",
      }}
    >
      <LastRequestDates
        lastFluVaccineRequest={lastFluVaccineRequest}
        lastPneumoniaVaccineRequest={lastPneumoniaVaccineRequest}
        lastShinglesVaccineRequest={lastShinglesVaccineRequest}
        lastShinglesBoosterVaccineRequest={lastShinglesBoosterVaccineRequest}
      />
      <NextVaccineDueDates
        lastFluVaccineRequest={lastFluVaccineRequest}
        lastPneumoniaVaccineRequest={lastPneumoniaVaccineRequest}
        lastShinglesVaccineRequest={lastShinglesVaccineRequest}
        lastShinglesBoosterVaccineRequest={lastShinglesBoosterVaccineRequest}
      />
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5">Vaccine Voucher Form</Typography>

          {showFluVaccineOption && (
            <Controller
              name="wantsFluVaccine"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Flu Vaccine"
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                />
              )}
            />
          )}

          {showPneumoniaVaccineOption && (
            <Controller
              name="wantsPneumoniaVaccine"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Pneumonia Vaccine"
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                />
              )}
            />
          )}

          {showShinglesVaccineOption && (
            <Controller
              name="wantsShinglesVaccine"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Shingles Vaccine"
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                />
              )}
            />
          )}

          {showShinglesBoosterVaccineOption && (
            <Controller
              name="wantsShinglesBoosterVaccine"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Shingles Booster Vaccine"
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                />
              )}
            />
          )}

          <FormControl
            sx={{ width: "100%" }}
            error={!!errors.pharmacyName?.message}
          >
            <FormLabel>Preferred Pharmacy Location</FormLabel>
            <Controller
              name="pharmacyName"
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
              {errors.pharmacyName?.message}
            </FormHelperText>
          </FormControl>

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}

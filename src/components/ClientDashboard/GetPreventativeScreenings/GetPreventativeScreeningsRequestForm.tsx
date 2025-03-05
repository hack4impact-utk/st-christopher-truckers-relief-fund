import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { handleScreeningRequestSubmission } from "@/server/api/screening-requests.ts/public-mutations";
import { ClientUser, ScreeningRequest } from "@/types";
import calculateAge from "@/utils/calculateAge";
import dayjsUtil from "@/utils/dayjsUtil";
import isCompeletedScreeningRequest from "@/utils/isCompletedScreeningRequest";

const screeningRequestValidator = z.object({
  wantsProstateCancerScreening: z.boolean(),
  wantsColorectalCancerScreening: z.boolean(),
  wantsCervicalCancerScreening: z.boolean(),
});

type ScreeningRequestFormValues = z.infer<typeof screeningRequestValidator>;

function isEligibleForProstateScreening(
  user: ClientUser,
  screeningRequests: ScreeningRequest[],
): boolean {
  if (user.enrollmentForm.generalInformationSection.sex === "female") {
    return false;
  }

  const age = calculateAge(
    user.enrollmentForm.generalInformationSection.dateOfBirth,
  );

  if (age <= 50 || age >= 65) {
    return false;
  }

  const mostRecentProstateScreeningRequest = screeningRequests.find(
    (screeningRequest) => screeningRequest.name === "Prostate Screening",
  );

  if (!mostRecentProstateScreeningRequest) {
    return true;
  }

  if (isCompeletedScreeningRequest(mostRecentProstateScreeningRequest)) {
    const twoYearsAfterMostRecentProstateScreening = dayjsUtil(
      mostRecentProstateScreeningRequest.submittedDate,
    ).add(2, "year");

    return dayjsUtil().isAfter(twoYearsAfterMostRecentProstateScreening);
  }

  return false;
}

function isEligibleForColorectalScreening(
  user: ClientUser,
  screeningRequests: ScreeningRequest[],
): boolean {
  const age = calculateAge(
    user.enrollmentForm.generalInformationSection.dateOfBirth,
  );

  if (age <= 45 || age >= 75) {
    return false;
  }

  const mostRecentColorectalScreeningRequest = screeningRequests.find(
    (screeningRequest) =>
      screeningRequest.name === "Colon / Colorectal Screening",
  );

  if (!mostRecentColorectalScreeningRequest) {
    return true;
  }

  if (isCompeletedScreeningRequest(mostRecentColorectalScreeningRequest)) {
    const oneYearAfterMostRecentColorectalScreening = dayjsUtil(
      mostRecentColorectalScreeningRequest.submittedDate,
    ).add(1, "year");

    return dayjsUtil().isAfter(oneYearAfterMostRecentColorectalScreening);
  }

  return false;
}

function isEligibleForCervicalScreening(
  user: ClientUser,
  screeningRequests: ScreeningRequest[],
): boolean {
  if (user.enrollmentForm.generalInformationSection.sex === "male") {
    return false;
  }

  const age = calculateAge(
    user.enrollmentForm.generalInformationSection.dateOfBirth,
  );

  if (age <= 21 || age >= 65) {
    return false;
  }

  const mostRecentCervicalScreeningRequest = screeningRequests.find(
    (screeningRequest) => screeningRequest.name === "Cervical Cancer Screening",
  );

  if (!mostRecentCervicalScreeningRequest) {
    return true;
  }

  if (isCompeletedScreeningRequest(mostRecentCervicalScreeningRequest)) {
    const oneYearAfterMostRecentColorectalScreening = dayjsUtil(
      mostRecentCervicalScreeningRequest.submittedDate,
    ).add(1, "year");

    return dayjsUtil().isAfter(oneYearAfterMostRecentColorectalScreening);
  }

  return false;
}

type GetPreventativeScreeningsRequestFormProps = {
  user: ClientUser;
  screeningRequests: ScreeningRequest[];
  setScreeningRequests: Dispatch<SetStateAction<ScreeningRequest[]>>;
};

export default function GetPreventativeScreeningsRequestForm({
  user,
  screeningRequests,
  setScreeningRequests,
}: GetPreventativeScreeningsRequestFormProps): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { control, handleSubmit } = useForm<ScreeningRequestFormValues>({
    resolver: zodResolver(screeningRequestValidator),
    defaultValues: {
      wantsProstateCancerScreening: false,
      wantsColorectalCancerScreening: false,
      wantsCervicalCancerScreening: false,
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: ScreeningRequestFormValues): Promise<void> => {
    setIsLoading(true);

    let error = false;

    const {
      wantsProstateCancerScreening,
      wantsColorectalCancerScreening,
      wantsCervicalCancerScreening,
    } = data;

    if (wantsProstateCancerScreening) {
      const screeningRequest: ScreeningRequest = {
        name: "Prostate Screening",
        submittedDate: dayjsUtil().utc().toISOString(),
        status: "requested",
        user: user,
      };

      setScreeningRequests([...screeningRequests, screeningRequest]);
      setScreeningRequests((prevScreeningRequests) => [
        ...prevScreeningRequests,
        screeningRequest,
      ]);
      const [, createScreeningRequestError] =
        await handleScreeningRequestSubmission(screeningRequest);

      error = error || createScreeningRequestError !== null;
    }

    if (wantsColorectalCancerScreening) {
      const screeningRequest: ScreeningRequest = {
        name: "Colon / Colorectal Screening",
        submittedDate: dayjsUtil().utc().toISOString(),
        status: "requested",
        user: user,
      };

      setScreeningRequests((prevScreeningRequests) => [
        ...prevScreeningRequests,
        screeningRequest,
      ]);

      const [, createScreeningRequestError] =
        await handleScreeningRequestSubmission(screeningRequest);

      error = error || createScreeningRequestError !== null;
    }

    if (wantsCervicalCancerScreening) {
      const screeningRequest: ScreeningRequest = {
        name: "Cervical Cancer Screening",
        submittedDate: dayjsUtil().utc().toISOString(),
        status: "requested",
        user: user,
      };

      setScreeningRequests((prevScreeningRequests) => [
        ...prevScreeningRequests,
        screeningRequest,
      ]);

      const [, createScreeningRequestError] =
        await handleScreeningRequestSubmission(screeningRequest);

      error = error || createScreeningRequestError !== null;
    }

    if (error) {
      enqueueSnackbar("An unexpected error occurred.", {
        variant: "error",
      });
      setIsLoading(false);
      return;
    }

    enqueueSnackbar("Screening request submitted successfully.", {
      variant: "success",
    });

    setIsLoading(false);
    setDisabled(true);
  };

  const showProstateScreening = isEligibleForProstateScreening(
    user,
    screeningRequests,
  );
  const showColorectalScreening = isEligibleForColorectalScreening(
    user,
    screeningRequests,
  );
  const showCervicalScreening = isEligibleForCervicalScreening(
    user,
    screeningRequests,
  );

  const ineligbleForAllScreenings =
    !showProstateScreening &&
    !showColorectalScreening &&
    !showCervicalScreening;

  if (ineligbleForAllScreenings) {
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
          You are ineligible for any screenings.
        </Typography>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4">Screening Request Form</Typography>
        <Divider />
        <Typography>What screenings would you like to apply for?</Typography>

        {showProstateScreening && (
          <Controller
            name="wantsProstateCancerScreening"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Prostate Cancer Screening"
              />
            )}
          />
        )}

        {showColorectalScreening && (
          <Controller
            name="wantsColorectalCancerScreening"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Colorectal Cancer Screening"
              />
            )}
          />
        )}

        {showCervicalScreening && (
          <Controller
            name="wantsCervicalCancerScreening"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Cervical Cancer Screening"
              />
            )}
          />
        )}

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isLoading}
          disabled={disabled}
          sx={{ width: "100%" }}
        >
          Submit
        </LoadingButton>
      </Box>
    </form>
  );
}

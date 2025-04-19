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
import dayjsUtil from "@/utils/dayjsUtil";

import {
  isEligibleForCervicalScreening,
  isEligibleForColorectalScreening,
  isEligibleForProstateScreening,
} from "./helpers";

const screeningRequestValidator = z.object({
  wantsProstateCancerScreening: z.boolean(),
  wantsColorectalCancerScreening: z.boolean(),
  wantsCervicalCancerScreening: z.boolean(),
});

type ScreeningRequestFormValues = z.infer<typeof screeningRequestValidator>;

type GetPreventativeScreeningsRequestFormProps = {
  user: ClientUser;
  screeningRequests: ScreeningRequest[];
  setScreeningRequests: Dispatch<SetStateAction<ScreeningRequest[]>>;
};

export default function GetPreventativeScreeningsRequestForm({
  user,
  screeningRequests,
  setScreeningRequests,
}: Readonly<GetPreventativeScreeningsRequestFormProps>): ReactNode {
  const [isLoading, setIsLoading] = useState(false);

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

    const requestsInDatabase: (ScreeningRequest | null)[] = [];

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

      const [requestInDatabase, createScreeningRequestError] =
        await handleScreeningRequestSubmission(screeningRequest);

      requestsInDatabase.push(requestInDatabase);

      error = error || createScreeningRequestError !== null;
    }

    if (wantsColorectalCancerScreening) {
      const screeningRequest: ScreeningRequest = {
        name: "Colon / Colorectal Screening",
        submittedDate: dayjsUtil().utc().toISOString(),
        status: "requested",
        user: user,
      };

      const [requestInDatabase, createScreeningRequestError] =
        await handleScreeningRequestSubmission(screeningRequest);

      requestsInDatabase.push(requestInDatabase);

      error = error || createScreeningRequestError !== null;
    }

    if (wantsCervicalCancerScreening) {
      const screeningRequest: ScreeningRequest = {
        name: "Cervical Cancer Screening",
        submittedDate: dayjsUtil().utc().toISOString(),
        status: "requested",
        user: user,
      };

      const [requestInDatabase, createScreeningRequestError] =
        await handleScreeningRequestSubmission(screeningRequest);

      requestsInDatabase.push(requestInDatabase);

      error = error || createScreeningRequestError !== null;
    }

    if (error) {
      enqueueSnackbar("An unexpected error occurred.", {
        variant: "error",
      });
      setIsLoading(false);
      return;
    }

    setScreeningRequests((prevScreeningRequests) => [
      ...prevScreeningRequests,
      ...(requestsInDatabase as ScreeningRequest[]),
    ]);

    enqueueSnackbar("Screening request submitted successfully.", {
      variant: "success",
    });

    setIsLoading(false);
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

  const ineligibleForAllScreenings =
    !showProstateScreening &&
    !showColorectalScreening &&
    !showCervicalScreening;

  if (ineligibleForAllScreenings) {
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
        <Typography variant="h5">Screening Request Form</Typography>
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
          sx={{ width: "100%" }}
        >
          Submit
        </LoadingButton>
      </Box>
    </form>
  );
}

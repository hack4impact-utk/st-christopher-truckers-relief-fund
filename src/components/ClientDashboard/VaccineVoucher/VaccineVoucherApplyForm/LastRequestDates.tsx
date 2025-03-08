import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { VaccineVoucherRequest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type LastRequestDatesProps = {
  lastFluVaccineRequest?: VaccineVoucherRequest;
  lastPneumoniaVaccineRequest?: VaccineVoucherRequest;
  lastShinglesVaccineRequest?: VaccineVoucherRequest;
  lastShinglesBoosterVaccineRequest?: VaccineVoucherRequest;
};

export default function LastRequestDates({
  lastFluVaccineRequest,
  lastPneumoniaVaccineRequest,
  lastShinglesVaccineRequest,
  lastShinglesBoosterVaccineRequest,
}: LastRequestDatesProps): ReactNode {
  return (
    <Box>
      <Typography variant="h5">Previous Request Dates</Typography>
      <Typography>
        Last Flu Vaccine Request:{" "}
        {lastFluVaccineRequest
          ? dayjsUtil
              .utc(lastFluVaccineRequest.submittedDate)
              .format("MM/DD/YYYY")
          : "None"}
      </Typography>
      <Typography>
        Last Pneumonia Vaccine Request:{" "}
        {lastPneumoniaVaccineRequest
          ? dayjsUtil
              .utc(lastPneumoniaVaccineRequest.submittedDate)
              .format("MM/DD/YYYY")
          : "None"}
      </Typography>
      <Typography>
        Last Shingles Vaccine Request:{" "}
        {lastShinglesVaccineRequest
          ? dayjsUtil
              .utc(lastShinglesVaccineRequest.submittedDate)
              .format("MM/DD/YYYY")
          : "None"}
      </Typography>
      <Typography>
        Last Shingles Booster Vaccine Request:{" "}
        {lastShinglesBoosterVaccineRequest
          ? dayjsUtil
              .utc(lastShinglesBoosterVaccineRequest.submittedDate)
              .format("MM/DD/YYYY")
          : "None"}
      </Typography>
    </Box>
  );
}

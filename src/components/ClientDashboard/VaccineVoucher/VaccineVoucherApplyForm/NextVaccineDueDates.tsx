import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { VaccineVoucherRequest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type NextVaccineDueDatesProps = {
  lastFluVaccineRequest?: VaccineVoucherRequest;
  lastPneumoniaVaccineRequest?: VaccineVoucherRequest;
  lastShinglesVaccineRequest?: VaccineVoucherRequest;
  lastShinglesBoosterVaccineRequest?: VaccineVoucherRequest;
};

export default function NextVaccineDueDates({
  lastFluVaccineRequest,
  lastPneumoniaVaccineRequest,
  lastShinglesVaccineRequest,
  lastShinglesBoosterVaccineRequest,
}: NextVaccineDueDatesProps): ReactNode {
  if (
    !lastFluVaccineRequest &&
    !lastPneumoniaVaccineRequest &&
    !lastShinglesVaccineRequest &&
    !lastShinglesBoosterVaccineRequest
  ) {
    return <></>;
  }

  return (
    <Box>
      <Typography variant="h5">Next Vaccine Due Dates</Typography>
      {lastFluVaccineRequest && (
        <Typography>
          Next Flu Vaccine Due Date:{" "}
          {dayjsUtil
            .utc(lastFluVaccineRequest.submittedDate)
            .add(1, "year")
            .format("MM/DD/YYYY")}
        </Typography>
      )}
      {lastPneumoniaVaccineRequest && (
        <Typography>
          Next Pneumonia Vaccine Due Date:{" "}
          {dayjsUtil
            .utc(lastPneumoniaVaccineRequest.submittedDate)
            .add(1, "year")
            .format("MM/DD/YYYY")}
        </Typography>
      )}
      {lastShinglesVaccineRequest && (
        <Typography>
          Next Shingles Vaccine Due Date:{" "}
          {dayjsUtil
            .utc(lastShinglesVaccineRequest.submittedDate)
            .add(1, "year")
            .format("MM/DD/YYYY")}
        </Typography>
      )}
      {lastShinglesVaccineRequest && !lastShinglesBoosterVaccineRequest && (
        <Typography>
          Your Shingles Booster Vaccine Due Date:{" "}
          {dayjsUtil
            .utc(lastShinglesVaccineRequest.submittedDate)
            .add(2, "month")
            .format("MM/DD/YYYY")}{" "}
          -{" "}
          {dayjsUtil
            .utc(lastShinglesVaccineRequest.submittedDate)
            .add(6, "month")
            .format("MM/DD/YYYY")}
        </Typography>
      )}
    </Box>
  );
}

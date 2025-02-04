"use client";

import { Check } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

import { handleApproveProgramApplication } from "@/server/api/program-enrollments/public-mutations";
import { ProgramEnrollment } from "@/types";

import { Row } from ".";

type AcceptPendingApplicationButtonProps = {
  programEnrollment: ProgramEnrollment;
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
};

export default function AcceptPendingApplicationButton({
  programEnrollment,
  rows,
  setRows,
}: AcceptPendingApplicationButtonProps): ReactNode {
  const { enqueueSnackbar } = useSnackbar();

  const removePendingApplicationFromRows = (): void => {
    const rowsWithoutProgramEnrollment = rows.filter(
      (row) =>
        row.email !== programEnrollment.user.email ||
        row.program !== programEnrollment.program,
    );
    setRows(rowsWithoutProgramEnrollment);
  };

  const handleClick = async (): Promise<void> => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this application?",
    );

    if (!confirmed) {
      return;
    }

    removePendingApplicationFromRows();
    const [, error] = await handleApproveProgramApplication(programEnrollment);

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred");
      return;
    }

    enqueueSnackbar("Application successfully approved");
  };

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<Check />}
      onClick={async () => await handleClick()}
    >
      Accept
    </Button>
  );
}

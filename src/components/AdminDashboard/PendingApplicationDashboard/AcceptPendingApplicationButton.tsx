"use client";

import { Check } from "@mui/icons-material";
import Button from "@mui/material/Button";
import React, { Dispatch, SetStateAction } from "react";

import { handleApproveProgramApplication } from "@/server/api/program-enrollments/public-mutations";
import { ProgramEnrollment } from "@/types";

import { Row } from ".";

type AcceptPendingApplicationButtonProps = {
  programEnrollment: ProgramEnrollment;
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
};

export default function AcceptPendingApplicationButton({
  programEnrollment,
  rows,
  setRows,
  setSnackbarOpen,
  setSnackbarMessage,
}: AcceptPendingApplicationButtonProps) {
  const removePendingApplicationFromRows = () => {
    const rowsWithoutProgramEnrollment = rows.filter(
      (row) =>
        row.email !== programEnrollment.user.email ||
        row.program !== programEnrollment.program,
    );
    setRows(rowsWithoutProgramEnrollment);
  };

  const handleClick = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this application?",
    );

    if (!confirmed) {
      return;
    }

    removePendingApplicationFromRows();
    await handleApproveProgramApplication(programEnrollment);
    setSnackbarMessage("Application successfully approved");
    setSnackbarOpen(true);
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

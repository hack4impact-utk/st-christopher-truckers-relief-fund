"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Clear from "@mui/icons-material/Clear";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import { handleRejectProgramApplication } from "@/server/api/program-enrollments/public-mutations";
import { ProgramEnrollment } from "@/types";

import { PendingApplicationsRow } from ".";

const rejectionReasonSchema = z.object({
  rejectionReason: z.string().min(1, { message: "Reason is required" }),
});

type RejectButtonFormValues = z.infer<typeof rejectionReasonSchema>;

type RejectPendingApplicationButtonProps = {
  programEnrollment: ProgramEnrollment;
  rows: PendingApplicationsRow[];
  setRows: Dispatch<SetStateAction<PendingApplicationsRow[]>>;
};

export default function RejectPendingApplicationButton({
  programEnrollment,
  rows,
  setRows,
}: RejectPendingApplicationButtonProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RejectButtonFormValues>({
    resolver: zodResolver(rejectionReasonSchema),
    defaultValues: { rejectionReason: "" },
  });

  const removePendingApplicationFromRows = (): void => {
    const rowsWithoutProgramEnrollment = rows.filter(
      (row) =>
        row.email !== programEnrollment.user.email ||
        row.program !== programEnrollment.program,
    );
    setRows(rowsWithoutProgramEnrollment);
  };

  const onSubmit = async (data: RejectButtonFormValues): Promise<void> => {
    setLoading(true);

    removePendingApplicationFromRows();
    reset({ rejectionReason: "" });

    const [, error] = await handleRejectProgramApplication(
      programEnrollment,
      data.rejectionReason,
    );

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred");
    } else {
      enqueueSnackbar("Application successfully rejected");
    }

    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<Clear />}
        onClick={() => setOpen(true)}
      >
        Reject
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              position: "absolute" as const,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(90vw, 700px)",
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: "1fr",
              boxShadow: 2,
              borderRadius: 2,
              p: 3,
              bgcolor: "background.paper",
            }}
          >
            <Typography>
              Please enter a reason for rejecting this applicant:
            </Typography>
            <ControlledTextField
              control={control}
              name="rejectionReason"
              label="Rejection Reason"
              multiline
              rows={4}
              variant="outlined"
              error={errors.rejectionReason}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="error"
              loading={loading}
            >
              Reject
            </LoadingButton>
          </Box>
        </form>
      </Modal>
    </>
  );
}

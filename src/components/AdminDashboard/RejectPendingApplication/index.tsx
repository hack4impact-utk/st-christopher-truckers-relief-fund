"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clear as ClearIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";

const rejectionReasonSchema = z.object({
  rejectionReason: z.string().min(1, { message: "Reason is required" }),
});

type RejectButtonFormValues = z.infer<typeof rejectionReasonSchema>;

type RejectPendingApplicationProps = {
  height?: number;
  width?: number;
};

export default function RejectPendingApplication({
  height,
  width,
}: RejectPendingApplicationProps) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RejectButtonFormValues>({
    resolver: zodResolver(rejectionReasonSchema),
    defaultValues: { rejectionReason: "" },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: RejectButtonFormValues) => {
    // Add submission logic here later
    // eslint-disable-next-line no-console
    console.log(data.rejectionReason);
    reset({ rejectionReason: "" });
    setSnackbarOpen(true);
    handleClose();
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Application successfully rejected"
      />
      <Button
        variant="contained"
        color="error"
        startIcon={<ClearIcon />}
        onClick={handleOpen}
        style={{ height, width }}
      >
        Reject
      </Button>
      <Modal open={open} onClose={handleClose}>
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
            <Typography variant="h4">Rejection Reason</Typography>
            <ControlledTextField
              control={control}
              name="rejectionReason"
              label="Rejection Reason"
              multiline
              rows={4}
              variant="outlined"
              error={errors.rejectionReason}
            />
            <Button type="submit" variant="contained" color="error">
              Reject
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
}

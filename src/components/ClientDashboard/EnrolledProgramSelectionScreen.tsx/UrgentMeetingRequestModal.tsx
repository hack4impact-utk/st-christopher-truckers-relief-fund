"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import { handleCreateUrgentMeetingRequest } from "@/server/api/urgent-meeting-requests/public-mutations";
import { UrgentMeetingRequest, User } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const urgentMeetingRequestSchema = z.object({
  reason: z.string().min(1, { message: "Reason is required" }),
});

type UrgentMeetingRequestFormValues = z.infer<
  typeof urgentMeetingRequestSchema
>;

type UrgentMeetingRequestModalProps = {
  user: User;
};

export default function UrgentMeetingRequestModal({
  user,
}: UrgentMeetingRequestModalProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UrgentMeetingRequestFormValues>({
    resolver: zodResolver(urgentMeetingRequestSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (
    data: UrgentMeetingRequestFormValues,
  ): Promise<void> => {
    setIsLoading(true);

    const urgentMeetingRequest: UrgentMeetingRequest = {
      client: user,
      reason: data.reason,
      dateCreated: dayjsUtil().toISOString(),
    };

    const [, error] =
      await handleCreateUrgentMeetingRequest(urgentMeetingRequest);

    if (error !== null) {
      enqueueSnackbar("An unexpected error occurred");
    } else {
      enqueueSnackbar("Urgent meeting request submitted successfully");
    }

    reset();

    setOpen(false);
    setIsLoading(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="error"
        startIcon={<PriorityHighIcon />}
        onClick={() => setOpen(true)}
      >
        Schedule Urgent Meeting
      </Button>
      <Modal open={open}>
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography id="transition-modal-title" variant="h4">
                  Need to meet with SCF urgently? Please fill out the following
                  form.
                </Typography>
                <ControlledTextField
                  control={control}
                  name="reason"
                  label="Reason"
                  multiline
                  rows={4}
                  variant="outlined"
                  error={errors.reason}
                />
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                    fullWidth
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

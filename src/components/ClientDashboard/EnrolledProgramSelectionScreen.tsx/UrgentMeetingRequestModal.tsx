"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import SCFModal from "@/components/SCFModal";
import { handleCreateUrgentMeetingRequest } from "@/server/api/urgent-meeting-requests/public-mutations";
import { UrgentMeetingRequest, User } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

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
}: Readonly<UrgentMeetingRequestModalProps>): ReactNode {
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
      enqueueSnackbar("An unexpected error occurred", { variant: "error" });
    } else {
      enqueueSnackbar("Urgent meeting request submitted successfully", {
        variant: "success",
      });
    }

    reset();

    setOpen(false);
    setIsLoading(false);
  };

  const trigger = (
    <Button
      variant="contained"
      color="error"
      startIcon={<PriorityHighIcon />}
      onClick={() => setOpen(true)}
    >
      Schedule Urgent Meeting
    </Button>
  );

  return (
    <SCFModal
      trigger={trigger}
      open={open}
      setOpen={setOpen}
      title="Need to meet with SCF urgently?"
      hideCloseButton
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>
            Please fill out the following form to schedule an urgent meeting.
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
            <Button variant="outlined" onClick={() => setOpen(false)} fullWidth>
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
    </SCFModal>
  );
}

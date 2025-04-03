"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import SCFModal from "@/components/SCFModal";
import { handleCreateScheduledMeeting } from "@/server/api/scheduled-meetings/public-mutations";
import { ClientUser, ScheduledMeeting } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import { createRowFromScheduledMeeting, ScheduledMeetingsRow } from ".";

const scheduleMeetingSchema = z.object({
  client: z.string().min(1, { message: "Client is required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
  date: z.string().refine((val) => dayjs(val).isValid(), {
    message: "Invalid date format",
  }),
});

type ScheduleMeetingFormValues = z.infer<typeof scheduleMeetingSchema>;

type CreateNewMeetingProps = {
  allClients: ClientUser[];
  setRows: Dispatch<SetStateAction<ScheduledMeetingsRow[]>>;
};

export default function CreateNewMeeting({
  allClients,
  setRows,
}: Readonly<CreateNewMeetingProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleMeetingFormValues>({
    resolver: zodResolver(scheduleMeetingSchema),
    defaultValues: {
      client: allClients[0].email,
      reason: "",
      date: "",
    },
  });

  const onSubmit = async (data: ScheduleMeetingFormValues): Promise<void> => {
    setIsLoading(true);

    const scheduledMeeting: ScheduledMeeting = {
      client: allClients.find((c) => c.email === data.client)!,
      date: dayjsUtil(data.date).utc().toISOString(),
      reason: data.reason,
      dateCreated: dayjsUtil().utc().toISOString(),
    };

    const [scheduledMeetingInDatabase, error] =
      await handleCreateScheduledMeeting(scheduledMeeting);

    if (error === null) {
      enqueueSnackbar("Meeting scheduled successfully", {
        variant: "success",
      });
      setRows((prevRows) => [
        ...prevRows,
        createRowFromScheduledMeeting(scheduledMeetingInDatabase),
      ]);
      reset();
      setIsLoading(false);
      setOpen(false);
      return;
    }

    enqueueSnackbar("An unexpected error occurred", { variant: "error" });
  };

  const trigger = (
    <Button variant="contained" onClick={() => setOpen(true)}>
      Schedule Meeting
    </Button>
  );

  return (
    <SCFModal
      trigger={trigger}
      open={open}
      setOpen={setOpen}
      title="Schedule Meeting"
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={allClients}
                renderInput={(params) => (
                  <TextField {...params} label="Client" variant="outlined" />
                )}
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName}`
                }
                value={allClients.find((c) => c.email === field.value) || null}
                onChange={(_, value) => {
                  field.onChange(value?.email);
                }}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimeField
                  {...field}
                  value={
                    field.value
                      ? dayjsUtil(field.value, "MM/DD/YYYY HH:mm")
                      : null
                  }
                  // convert dayjs to string
                  onChange={(date) =>
                    field.onChange(date?.format("MM/DD/YYYY HH:mm") ?? "")
                  }
                  label="Date"
                />
              </LocalizationProvider>
            )}
          />
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

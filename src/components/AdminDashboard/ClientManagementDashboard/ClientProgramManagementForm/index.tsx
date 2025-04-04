"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import SCFModal from "@/components/SCFModal";
import {
  handleApproveProgramApplication,
  handleRejectProgramApplication,
} from "@/server/api/program-enrollments/public-mutations";
import { handleClientUpdate } from "@/server/api/users/public-mutations";
import { ClientUser, Program, ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";
import isEnrolledInProgram from "@/utils/isEnrolledInProgram";

import { ClientsRow, createRowFromClient } from "..";

const ClientManagementFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().refine((val) => dayjs(val).isValid(), {
    message: "Invalid date format",
  }),
  phoneNumber: z
    .string()
    .refine(
      (val) => isValidPhoneNumber(val, { defaultCountry: "US" }),
      "Invalid phone number",
    )
    .transform((val) => parsePhoneNumberWithError(val, "US").number.toString()),
  enrolledInHealthyHabits: z.boolean(),
  enrolledInDiabetesPrevention: z.boolean(),
  enrolledInRigsWithoutCigs: z.boolean(),
  enrolledInVaccineVoucher: z.boolean(),
  enrolledInGetPreventativeScreenings: z.boolean(),
  goals: z.string(),
  comments: z.string(),
});

type ClientManagementFormValues = z.infer<typeof ClientManagementFormSchema>;

const isPending = (
  programEnrollments: ProgramEnrollment[],
  program: Program,
): boolean => {
  return programEnrollments.some(
    (programEnrollment) =>
      programEnrollment.program === program &&
      programEnrollment.status === "pending",
  );
};

const getClientManagementFormDefaultValues = (
  programEnrollments: ProgramEnrollment[],
  client: ClientUser,
): ClientManagementFormValues => {
  return {
    firstName: client.firstName,
    lastName: client.lastName,
    dateOfBirth: client.dateOfBirth,
    phoneNumber: client.phoneNumber,
    enrolledInHealthyHabits: isEnrolledInProgram(
      programEnrollments,
      "Healthy Habits For The Long Haul",
    ),
    enrolledInDiabetesPrevention: isEnrolledInProgram(
      programEnrollments,
      "Diabetes Prevention",
    ),
    enrolledInRigsWithoutCigs: isEnrolledInProgram(
      programEnrollments,
      "Rigs Without Cigs",
    ),
    enrolledInVaccineVoucher: isEnrolledInProgram(
      programEnrollments,
      "Vaccine Voucher",
    ),
    enrolledInGetPreventativeScreenings: isEnrolledInProgram(
      programEnrollments,
      "GPS (Get Preventative Screenings)",
    ),
    goals: client.goals,
    comments: client.comments,
  };
};

const fieldToProgramEnrollment = (
  field: keyof ClientManagementFormValues,
  programEnrollments: ProgramEnrollment[],
): ProgramEnrollment | undefined => {
  const fieldToProgram: Record<
    keyof ClientManagementFormValues,
    Program | null
  > = {
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    phoneNumber: null,
    enrolledInHealthyHabits: "Healthy Habits For The Long Haul",
    enrolledInDiabetesPrevention: "Diabetes Prevention",
    enrolledInRigsWithoutCigs: "Rigs Without Cigs",
    enrolledInVaccineVoucher: "Vaccine Voucher",
    enrolledInGetPreventativeScreenings: "GPS (Get Preventative Screenings)",
    goals: null,
    comments: null,
  };

  return programEnrollments.find(
    (programEnrollment) => programEnrollment.program === fieldToProgram[field],
  );
};

type ClientManagementDashboardProps = {
  programEnrollments: ProgramEnrollment[];
  client: ClientUser;
  fullName: string;
  setRows: Dispatch<SetStateAction<ClientsRow[]>>;
};

export default function ClientProgramManagementForm({
  programEnrollments,
  fullName,
  client,
  setRows,
}: Readonly<ClientManagementDashboardProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields, isDirty, errors },
  } = useForm<ClientManagementFormValues>({
    resolver: zodResolver(ClientManagementFormSchema),
    defaultValues: getClientManagementFormDefaultValues(
      programEnrollments,
      client,
    ),
  });

  const onCancel = (): void => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: ClientManagementFormValues): Promise<void> => {
    setIsLoading(true);

    let error = false;

    let clientInfoHasChanged = false;

    const updateClient = client;

    for (const dirtyField in dirtyFields) {
      const field = dirtyField as keyof ClientManagementFormValues;

      if (
        field === "firstName" ||
        field === "lastName" ||
        field === "dateOfBirth" ||
        field === "phoneNumber" ||
        field === "goals" ||
        field === "comments"
      ) {
        clientInfoHasChanged = true;
        updateClient[field] = data[field];
        continue;
      }

      const programEnrollment = fieldToProgramEnrollment(
        field,
        programEnrollments,
      );

      if (!programEnrollment) {
        continue;
      }

      const enrollmentStatus = data[field] ? "accepted" : "rejected";
      programEnrollment.status = enrollmentStatus;

      if (enrollmentStatus === "accepted") {
        const [, approveError] =
          await handleApproveProgramApplication(programEnrollment);
        error = error || approveError !== null;
      } else {
        const [, rejectError] = await handleRejectProgramApplication(
          programEnrollment,
          "An admin has unenrolled you from this program",
        );

        error = error || rejectError !== null;
      }
    }

    if (clientInfoHasChanged) {
      const [, commentError] = await handleClientUpdate(updateClient);
      error = error || commentError !== null;

      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === client._id ? createRowFromClient(updateClient) : row,
        ),
      );
    }

    setIsLoading(false);
    setOpen(false);

    if (error) {
      enqueueSnackbar(
        `There was a problem updating ${fullName}'s information`,
        { variant: "error" },
      );
    } else {
      enqueueSnackbar(
        `You have successfully updated ${fullName}'s information`,
        { variant: "success" },
      );
    }

    reset(getClientManagementFormDefaultValues(programEnrollments, client));
  };

  const showHealthyHabitsButton = !isPending(
    programEnrollments,
    "Healthy Habits For The Long Haul",
  );
  const showDiabetesPreventionButton = !isPending(
    programEnrollments,
    "Diabetes Prevention",
  );
  const showRigsWithoutCigsButton = !isPending(
    programEnrollments,
    "Rigs Without Cigs",
  );
  const showVaccineVoucherButton = !isPending(
    programEnrollments,
    "Vaccine Voucher",
  );
  const showGetPreventativeScreeningsButton = !isPending(
    programEnrollments,
    "GPS (Get Preventative Screenings)",
  );

  const trigger = (
    <Button variant="contained" onClick={() => setOpen(true)}>
      <ModeEditIcon />
    </Button>
  );

  return (
    <SCFModal
      trigger={trigger}
      open={open}
      setOpen={setOpen}
      title="Manage Client"
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          General Information
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 2,
            mb: 3,
          }}
        >
          <ControlledTextField
            control={control}
            name="firstName"
            label="First Name"
            variant="outlined"
            error={errors.firstName}
            required
            sx={{ width: "100%" }}
          />

          <ControlledTextField
            control={control}
            name="lastName"
            label="Last Name"
            variant="outlined"
            error={errors.lastName}
            required
            sx={{ width: "100%" }}
          />
        </Box>

        <Box sx={{ width: "100%", mb: 3 }}>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.dateOfBirth} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    {...field}
                    // handle string value correctly
                    value={
                      field.value ? dayjsUtil(field.value, "MM/DD/YYYY") : null
                    }
                    // convert dayjs to string
                    onChange={(date) =>
                      field.onChange(date?.format("MM/DD/YYYY") ?? "")
                    }
                    label="Date of Birth"
                    variant="outlined"
                    format="MM/DD/YYYY"
                    required
                  />
                </LocalizationProvider>
                <FormHelperText>{errors.dateOfBirth?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        <ControlledTextField
          sx={{ width: "100%", mb: 3 }}
          control={control}
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          error={errors.phoneNumber}
          type="tel"
          required
        />

        <Typography variant="h6">Enrolled Programs</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: 2,
          }}
        >
          {showHealthyHabitsButton && (
            <Controller
              name="enrolledInHealthyHabits"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Healthy Habits"
                />
              )}
            />
          )}
          {showDiabetesPreventionButton && (
            <Controller
              name="enrolledInDiabetesPrevention"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Diabetes Prevention"
                />
              )}
            />
          )}
          {showRigsWithoutCigsButton && (
            <Controller
              name="enrolledInRigsWithoutCigs"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Rigs Without Cigs"
                />
              )}
            />
          )}
          {showVaccineVoucherButton && (
            <Controller
              name="enrolledInVaccineVoucher"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Vaccine Voucher"
                />
              )}
            />
          )}
          {showGetPreventativeScreeningsButton && (
            <Controller
              name="enrolledInGetPreventativeScreenings"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Get Preventative Screenings"
                />
              )}
            />
          )}
        </Box>

        <Typography variant="h6" sx={{ mb: 1 }}>
          Goals & Comments
        </Typography>

        <Box>
          <ControlledTextField
            sx={{ width: "100%", mb: 3 }}
            name="goals"
            control={control}
            label="Goals"
            variant="outlined"
          />
        </Box>

        <Box>
          <ControlledTextField
            sx={{ width: "100%", mb: 3 }}
            name="comments"
            control={control}
            label="Comments"
            variant="outlined"
            multiline
            rows={3}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Button variant="outlined" onClick={onCancel} fullWidth>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            disabled={disabled || !isDirty}
            fullWidth
          >
            Save
          </LoadingButton>
        </Box>
      </form>
    </SCFModal>
  );
}

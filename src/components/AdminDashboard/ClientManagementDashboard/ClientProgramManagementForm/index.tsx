"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import {
  handleApproveProgramApplication,
  handleRejectProgramApplication,
} from "@/server/api/program-enrollments/public-mutations";
import { handleClientUpdate } from "@/server/api/users/public-mutations";
import { ClientUser, Program, ProgramEnrollment } from "@/types";
import isEnrolledInProgram from "@/utils/isEnrolledInProgram";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90vw, 700px)",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const ClientManagementFormSchema = z.object({
  enrolledInHealthyHabits: z.boolean(),
  enrolledInDiabetesPrevention: z.boolean(),
  enrolledInRigsWithoutCigs: z.boolean(),
  enrolledInVaccineVoucher: z.boolean(),
  enrolledInGetPreventativeScreenings: z.boolean(),
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
    enrolledInHealthyHabits: "Healthy Habits For The Long Haul",
    enrolledInDiabetesPrevention: "Diabetes Prevention",
    enrolledInRigsWithoutCigs: "Rigs Without Cigs",
    enrolledInVaccineVoucher: "Vaccine Voucher",
    enrolledInGetPreventativeScreenings: "GPS (Get Preventative Screenings)",
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
};

export default function ClientProgramManagementForm({
  programEnrollments,
  fullName,
  client,
}: Readonly<ClientManagementDashboardProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields, isDirty },
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

    for (const dirtyField in dirtyFields) {
      const field = dirtyField as keyof ClientManagementFormValues;

      if (field == "comments") {
        const comment = data[field];
        client.comments = comment;

        const [, commentError] = await handleClientUpdate(client);
        error = error || commentError !== null;

        continue;
      }

      const programEnrollment = fieldToProgramEnrollment(
        field,
        programEnrollments,
      );

      if (!programEnrollment) {
        return;
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

    setIsLoading(false);
    setOpen(false);

    const snakeBarMessage = error
      ? `There was a problem updating ${fullName}'s information`
      : `You have successfully updated ${fullName}'s information`;

    enqueueSnackbar(snakeBarMessage);

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

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        <ModeEditIcon />
      </Button>
      <Modal open={open}>
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography id="transition-modal-title" variant="h4">
                Manage Client
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", paddingY: 1 }}
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
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

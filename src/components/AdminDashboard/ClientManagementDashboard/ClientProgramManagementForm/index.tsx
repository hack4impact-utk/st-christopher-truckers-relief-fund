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
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  approveProgramEnrollment,
  rejectProgramEnrollment,
} from "@/server/api/program-enrollments/private-mutations";
import { Program, ProgramEnrollment } from "@/types";

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

const ClientManagementFormSchema = z.object({
  enrolledInHealthyHabits: z.boolean(),
  enrolledInDiabetesPrevention: z.boolean(),
  enrolledInRigsWithoutCigs: z.boolean(),
  enrolledInVaccineVoucher: z.boolean(),
  enrolledInGetPreventativeScreenings: z.boolean(),
});

type ClientManagementFormValues = z.infer<typeof ClientManagementFormSchema>;

const isEnrolledIn = (
  programEnrollments: ProgramEnrollment[],
  program: Program,
) => {
  return programEnrollments.some(
    (programEnrollment) =>
      programEnrollment.program === program &&
      programEnrollment.status === "accepted",
  );
};

const getClientManagementFormDefaultValues = (
  programEnrollments: ProgramEnrollment[],
): ClientManagementFormValues => {
  return {
    enrolledInHealthyHabits: isEnrolledIn(
      programEnrollments,
      "Healthy Habits For The Long Haul",
    ),
    enrolledInDiabetesPrevention: isEnrolledIn(
      programEnrollments,
      "Diabetes Prevention",
    ),
    enrolledInRigsWithoutCigs: isEnrolledIn(
      programEnrollments,
      "Rigs Without Cigs",
    ),
    enrolledInVaccineVoucher: isEnrolledIn(
      programEnrollments,
      "Vaccine Voucher",
    ),
    enrolledInGetPreventativeScreenings: isEnrolledIn(
      programEnrollments,
      "GPS (Get Preventative Screenings)",
    ),
  } as ClientManagementFormValues;
};

const fieldToProgramEnrollment = (
  field: keyof ClientManagementFormValues,
  programEnrollments: ProgramEnrollment[],
): ProgramEnrollment | undefined => {
  const fieldToProgram: Record<keyof ClientManagementFormValues, Program> = {
    enrolledInHealthyHabits: "Healthy Habits For The Long Haul",
    enrolledInDiabetesPrevention: "Diabetes Prevention",
    enrolledInRigsWithoutCigs: "Rigs Without Cigs",
    enrolledInVaccineVoucher: "Vaccine Voucher",
    enrolledInGetPreventativeScreenings: "GPS (Get Preventative Screenings)",
  };

  return programEnrollments.find(
    (programEnrollment) => programEnrollment.program === fieldToProgram[field],
  );
};

type ClientManagementDashboardProps = {
  programEnrollments: ProgramEnrollment[];
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  fullName: string;
};

export default function ClientProgramManagementForm({
  programEnrollments,
  setSnackbarOpen,
  setSnackbarMessage,
  fullName,
}: ClientManagementDashboardProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm<ClientManagementFormValues>({
    resolver: zodResolver(ClientManagementFormSchema),
    defaultValues: getClientManagementFormDefaultValues(programEnrollments),
  });

  const onCancel = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: ClientManagementFormValues) => {
    setIsLoading(true);
    setDisabled(true);

    let error = false;

    for (const dirtyField in dirtyFields) {
      const field = dirtyField as keyof ClientManagementFormValues;
      const programEnrollment = fieldToProgramEnrollment(
        field,
        programEnrollments,
      );

      if (!programEnrollment) {
        return;
      }

      if (data[field]) {
        console.log("Enroll", field);
        // error = await approveProgramEnrollment(programEnrollment)[1];
        if (error) {
          break;
        }
      } else {
        console.log("Unenroll", field);
        // error = await rejectProgramEnrollment(programEnrollment)[1];
        if (error) {
          break;
        }
      }
    }

    setIsLoading(false);
    setDisabled(false);
    setOpen(false);

    if (!error) {
      setSnackbarMessage(
        `You have successfully updated ${fullName} enrolled programs`,
      );
    } else {
      reset();
      setSnackbarMessage(
        `There was a issue updating ${fullName} enrolled programs`,
      );
    }

    setSnackbarOpen(true);
  };

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
                Mange Enrolled Programs
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", paddingY: 1 }}
              >
                <Controller
                  name="enrolledInHealthyHabits"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Healthy Habits"
                      />
                    </>
                  )}
                />
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
              </Box>
              <Box display="flex" gap={2}>
                <Button variant="outlined" onClick={onCancel} fullWidth>
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isLoading}
                  disabled={disabled}
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

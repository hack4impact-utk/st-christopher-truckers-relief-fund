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

import {
  handleApproveProgramApplication,
  handleRejectProgramApplication,
} from "@/server/api/program-enrollments/public-mutations";
import { Program, ProgramEnrollment } from "@/types";
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
  };
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
  fullName: string;
};

export default function ClientProgramManagementForm({
  programEnrollments,
  fullName,
}: ClientManagementDashboardProps): ReactNode {
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
    defaultValues: getClientManagementFormDefaultValues(programEnrollments),
  });

  const onCancel = (): void => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: ClientManagementFormValues): Promise<void> => {
    setIsLoading(true);

    let error = false;

    let newProgramEnrollments = [...programEnrollments];

    for (const dirtyField in dirtyFields) {
      const field = dirtyField as keyof ClientManagementFormValues;
      const programEnrollment = fieldToProgramEnrollment(
        field,
        programEnrollments,
      );

      if (!programEnrollment) {
        return;
      }

      newProgramEnrollments = newProgramEnrollments.map(
        (prevProgramEnrollment) => {
          if (prevProgramEnrollment.program === programEnrollment.program) {
            return {
              ...prevProgramEnrollment,
              status: data[field] ? "accepted" : "rejected",
            };
          }

          return prevProgramEnrollment;
        },
      );

      if (data[field]) {
        const [, approveError] =
          await handleApproveProgramApplication(programEnrollment);

        if (approveError) {
          error = true;
          break;
        }
      } else {
        const [, rejectError] = await handleRejectProgramApplication(
          programEnrollment,
          "An admin has unenrolled you from this program",
        );

        if (rejectError) {
          error = true;
          break;
        }
      }
    }

    setIsLoading(false);
    setOpen(false);

    if (error) {
      enqueueSnackbar(
        `There was a problem updating ${fullName}'s enrolled programs`,
      );
    } else {
      enqueueSnackbar(
        `You have successfully updated ${fullName}'s enrolled programs`,
      );
    }

    reset(getClientManagementFormDefaultValues(newProgramEnrollments));
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
                Manage Enrolled Programs
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

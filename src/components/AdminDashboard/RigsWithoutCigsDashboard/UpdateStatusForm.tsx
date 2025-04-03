import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import SCFModal from "@/components/SCFModal";
import { handleClientUpdate } from "@/server/api/users/public-mutations";
import { ClientUser, ProgramEnrollment } from "@/types";

const updateStatusFormSchema = z.object({
  status: z.enum([
    "unknown",
    "quit",
    "cut back",
    "in progress",
    "no success",
    "not yet started",
    "withdrawn",
  ]),
});

type UpdateStatusFormValues = z.infer<typeof updateStatusFormSchema>;

type UpdateStatusFormProps = {
  user: ClientUser;
  setProgramEnrollments: Dispatch<SetStateAction<ProgramEnrollment[]>>;
  rowId: string;
};

export default function UpdateStatusForm({
  user,
  setProgramEnrollments,
  rowId,
}: Readonly<UpdateStatusFormProps>): ReactNode {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateStatusFormValues>({
    defaultValues: {
      status: user.rigsWithoutCigsStatus,
    },
    resolver: zodResolver(updateStatusFormSchema),
  });

  const onSubmit = async (data: UpdateStatusFormValues): Promise<void> => {
    const { status } = data;

    setIsLoading(true);

    const newUser: ClientUser = {
      ...user,
      rigsWithoutCigsStatus: status,
    };

    setProgramEnrollments((prev) =>
      prev.map((programEnrollment) =>
        programEnrollment._id === rowId
          ? { ...programEnrollment, user: newUser }
          : programEnrollment,
      ),
    );

    const [, error] = await handleClientUpdate(newUser);

    if (error !== null) {
      enqueueSnackbar("An error occurred while updating the status", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Status updated successfully", {
        variant: "success",
      });
    }

    setIsLoading(false);
  };

  const trigger = (
    <Button variant="contained" onClick={() => setOpen(true)}>
      Update Status
    </Button>
  );

  return (
    <SCFModal
      open={open}
      setOpen={setOpen}
      title="Update Status"
      trigger={trigger}
      showCloseButton={false}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormHelperText>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="caption">
                Quit: Quit smoking with a distinct date recognizing this
              </Typography>
              <Typography variant="caption">
                Cut back: Reduced use of nicotine/tobacco by 50% or more for 2+
                months
              </Typography>
              <Typography variant="caption">
                In progress: Has had a consultation and participant is active in
                program (responsive to calls and resources)
              </Typography>
              <Typography variant="caption">
                No success: Not participating after registration or dropping out
                of the program while they are “in progress”
              </Typography>
              <Typography variant="caption">
                Not yet started: Has registered and had consultation, but
                waiting on products (e.g. smoking patches/other resources)
              </Typography>
              <Typography variant="caption">
                Withdrawn: Never participated (1 year limit), stops responding
                (1 year limit)
              </Typography>
            </Box>
          </FormHelperText>
          <FormControl error={!!errors.status} sx={{ width: "100%", py: 2 }}>
            <FormLabel>Record Client Status</FormLabel>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="unknown"
                    control={<Radio />}
                    label="Unknown"
                  />
                  <FormControlLabel
                    value="quit"
                    control={<Radio />}
                    label="Quit"
                  />
                  <FormControlLabel
                    value="cut back"
                    control={<Radio />}
                    label="Cut back"
                  />
                  <FormControlLabel
                    value="in progress"
                    control={<Radio />}
                    label="In progress"
                  />
                  <FormControlLabel
                    value="no success"
                    control={<Radio />}
                    label="No success"
                  />
                  <FormControlLabel
                    value="not yet started"
                    control={<Radio />}
                    label="Not yet started"
                  />
                  <FormControlLabel
                    value="withdrawn"
                    control={<Radio />}
                    label="Withdrawn"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

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
              Save
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </SCFModal>
  );
}

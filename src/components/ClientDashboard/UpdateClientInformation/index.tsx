"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
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
import { useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import { handleAddClientInformation } from "@/server/api/users/public-mutations";
import { ClientUser } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

const updateClientInformationValidator = z.object({
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
  sex: z.enum(["male", "female"]),
});

type UpdateClientInformationFormValues = z.infer<
  typeof updateClientInformationValidator
>;

export default function UpdateClientInformation(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateClientInformationFormValues>({
    resolver: zodResolver(updateClientInformationValidator),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      sex: "male",
    },
  });

  const onError = (): void => {
    enqueueSnackbar("Please review all fields before continuing.", {
      variant: "error",
    });
  };

  const onSubmit = async (
    data: UpdateClientInformationFormValues,
  ): Promise<void> => {
    setIsLoading(true);

    const user = session?.user;

    if (!user || user.role !== "client") {
      return;
    }

    const newUser: ClientUser = {
      ...user,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      sex: data.sex,
      needsInformationUpdated: false,
    };

    const [, error] = await handleAddClientInformation(newUser);

    if (error !== null) {
      enqueueSnackbar("An unknown error occurred", { variant: "error" });
      setIsLoading(false);
      return;
    }

    await update({
      ...session,
      user: newUser,
    });

    router.push("/dashboard");
    router.refresh();
  };

  if (!session) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
        }}
      >
        <Typography variant="h4">Confirm Information</Typography>
        <Divider />

        <Typography>Please confirm your information below.</Typography>

        {/* Name */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 2,
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

        {/* Date of Birth */}
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

        {/* Sex */}
        <FormControl error={!!errors.sex} sx={{ width: "100%" }}>
          <FormLabel>What is your sex?</FormLabel>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>{errors.sex?.message}</FormHelperText>
        </FormControl>

        <ControlledTextField
          control={control}
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          error={errors.phoneNumber}
          type="tel"
          required
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isLoading}
        >
          Submit
        </LoadingButton>
      </Box>
    </form>
  );
}

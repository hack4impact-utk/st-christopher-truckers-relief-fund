"use client";

import ControlledCheckbox from "@/components/controlled/ControlledCheckbox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }).default(""),
  email: z
    .string()
    .min(6, { message: "Email is required." })
    .email({ message: "Invalid email" })
    .default(""),
  privacy_policy: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must agree to the privacy policy to continue.",
    }),
  hipaa_notice: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must agree to the HIPAA notice to continue.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setError("root", { message: error });
    }
  }, [searchParams, setError]);

  const onSubmit = async (data: FormValues) => {
    setError("root", { message: "" });
    console.log(data);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "min(90vw, 500px)",
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: "1fr",
          }}
        >
          {/* Title */}
          <Typography variant="h4">Form</Typography>
          <Divider />

          {/* General Information */}
          <Typography variant="h6">General Information</Typography>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Name"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                variant="outlined"
              />
            )}
          />

          <Divider />

          {/* Privacy Policy */}
          <Typography variant="h6">Privacy Policy</Typography>
          <Typography>We will sell all your data! &gt;:)</Typography>

          <ControlledCheckbox
            name="privacy_policy"
            control={control}
            label="I agree."
            errorMessage={errors.privacy_policy?.message}
          />

          {/* HIPAA Notice */}
          <Typography variant="h6">HIPAA Notice</Typography>
          <Typography>
            By submitting this form, you acknowledge that your health
            information is protected under the Health Insurance Portability and
            Accountability Act (HIPAA).
          </Typography>

          <ControlledCheckbox
            name="hipaa_notice"
            control={control}
            label="I agree."
            errorMessage={errors.hipaa_notice?.message}
          />

          {/* Submit */}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <Typography variant="h6" fontWeight="normal" color="red">
            {errors.root?.message}
          </Typography>
        </Box>
      </form>
    </Box>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  GeneralInformationFormValues,
  generalInformationValidator,
} from "@/types";

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<GeneralInformationFormValues>({
    resolver: zodResolver(generalInformationValidator),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phoneNumber: "",
      hasClassACdl: false,
      dateOfBirth: "",
      drivesSemiTruckOverRoad: false,
      isUsCitizen: false,
      monthlyHouseholdExpenses: 0,
      healthMetrics: {
        isDiabetic: false,
        hasHighBloodPressure: false,
        hasHighCholesterol: false,
        hasHeartDisease: false,
        isObese: false,
        weight: 0,
      },
      healthGoals: {
        shortTerm: "",
        longTerm: "",
      },
      hasAcknowledgedPrivacyNotice: false,
      hasAcknowledgedHipaaNotice: false,
    },
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setError("root", { message: error });
    }
  }, [searchParams, setError]);

  const onSubmit = async (data: GeneralInformationFormValues) => {
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
          {/* Title: Enrollment Form */}
          <Typography variant="h4">Enrollment Form</Typography>
          <Divider />

          {/* Section Title: General Information */}
          <Typography variant="h6">General Information</Typography>

          {/* Name */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  label="First Name"
                  variant="outlined"
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  label="Last Name"
                  variant="outlined"
                />
              )}
            />
          </Box>

          {/* Email */}
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

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                variant="outlined"
                type="password"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                label="Confirm Password"
                variant="outlined"
                type="password"
              />
            )}
          />

          {/* Date of Birth */}
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                label="Date of Birth"
                variant="outlined"
              />
            )}
          />

          {/* US Citizen */}
          <FormControl error={!!errors.isUsCitizen} sx={{ width: "100%" }}>
            <FormLabel>Are you a citizen of the United States?</FormLabel>
            <Controller
              name="isUsCitizen"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              )}
            />
            <FormHelperText sx={{ m: 0 }}>
              {errors.isUsCitizen?.message}
            </FormHelperText>
          </FormControl>

          <Divider />

          {/* Privacy Policy */}
          <Typography variant="h6">Privacy Policy</Typography>
          <Typography>We will sell all your data! &gt;:)</Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <FormControl
              error={!!errors.hasAcknowledgedPrivacyNotice}
              sx={{ width: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Controller
                  name="hasAcknowledgedPrivacyNotice"
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
                <Typography sx={{ ml: 1 }}>I agree.</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <FormHelperText sx={{ m: 0 }}>
                  {errors.hasAcknowledgedPrivacyNotice?.message}
                </FormHelperText>
              </Box>
            </FormControl>
          </Box>

          {/* HIPAA Notice */}
          <Typography variant="h6">HIPAA Notice</Typography>
          <Typography>
            By submitting this form, you acknowledge that your health
            information is protected under the Health Insurance Portability and
            Accountability Act (HIPAA).
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <FormControl
              error={!!errors.hasAcknowledgedHipaaNotice}
              sx={{ width: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Controller
                  name="hasAcknowledgedHipaaNotice"
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
                <Typography sx={{ ml: 1 }}>I agree.</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <FormHelperText sx={{ m: 0 }}>
                  {errors.hasAcknowledgedHipaaNotice?.message}
                </FormHelperText>
              </Box>
            </FormControl>
          </Box>

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

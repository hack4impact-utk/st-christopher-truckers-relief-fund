"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import useEnrollmentForm from "@/hooks/useEnrollmentForm";
import {
  Doctor,
  GeneralInformationSection,
  generalInformationSectionValidator,
} from "@/types/EnrollmentForm";
import dayjsUtil from "@/utils/dayjsUtil";

export default function GeneralInformationFormSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { enrollmentForm, updateGeneralInformationSection } =
    useEnrollmentForm();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
    watch,
  } = useForm<GeneralInformationSection>({
    resolver: zodResolver(generalInformationSectionValidator),
    defaultValues: enrollmentForm.generalInformationSection,
  });

  const onSubmit = async (data: GeneralInformationSection) => {
    setIsLoading(true);
    updateGeneralInformationSection(data);
    router.push("/enrollment-form/qualifying-questions");
  };

  const onError = () => {
    window.alert("Please review all fields before continuing.");
  };

  // Doctors array logic
  const {
    fields: doctors,
    append: addDoctor,
    remove: deleteDoctor,
  } = useFieldArray({
    control,
    name: "doctors",
  });

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
                    field.onChange(date?.format("MM/DD/YYYY") || "")
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

        {/* US Citizen */}
        <FormControl error={!!errors.isUsCitizen} sx={{ width: "100%" }}>
          <FormLabel>Are you a citizen of the United States?</FormLabel>
          <Controller
            name="isUsCitizen"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
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

        {/* Phone Number */}
        <ControlledTextField
          control={control}
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          error={errors.phoneNumber}
          type="tel"
          required
        />

        {/* Address */}
        <ControlledTextField
          control={control}
          name="address"
          label="Address"
          variant="outlined"
          error={errors.address}
          required
        />

        {/* Referral Source */}
        <ControlledTextField
          control={control}
          name="referralSource"
          label="How did you hear about SCF?"
          variant="outlined"
          error={errors.referralSource}
          required
        />
        <Divider />

        {/* Section Title: Login Information */}
        <Typography variant="h6">Login Information</Typography>
        <Typography>
          Your password must be at least 8 characters long.
        </Typography>

        {/* Email */}
        <ControlledTextField
          control={control}
          name="email"
          label="Email"
          variant="outlined"
          error={errors.email}
          required
        />

        {/* Password */}
        <ControlledTextField
          control={control}
          name="password"
          label="Password"
          variant="outlined"
          error={errors.password}
          type="password"
          required
        />
        <ControlledTextField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          error={errors.confirmPassword}
          type="password"
          required
        />

        <Divider />

        {/* Section Title: Employment Information */}
        <Typography variant="h6">Employment Information</Typography>

        {/* CDL */}
        <FormControl error={!!errors.hasClassACdl} sx={{ width: "100%" }}>
          <FormLabel>
            Do you have a Class A Commercial Driver&apos;s License (CDL)?
          </FormLabel>
          <Controller
            name="hasClassACdl"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.hasClassACdl?.message}
          </FormHelperText>
        </FormControl>
        {watch("hasClassACdl") === true && (
          <ControlledTextField
            control={control}
            name="cdlNumber"
            label="CDL Number"
            variant="outlined"
            error={errors.cdlNumber}
            required
          />
        )}

        <FormControl
          error={!!errors.truckingIndustryAffiliation}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            How are you affiliated with the trucking industry?
          </FormLabel>
          <Controller
            name="truckingIndustryAffiliation"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="driver"
                  control={<Radio />}
                  label="Driver"
                />
                <FormControlLabel
                  value="spouse"
                  control={<Radio />}
                  label="Spouse"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.truckingIndustryAffiliation?.message}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.jobDescription} sx={{ width: "100%" }}>
          <FormLabel>What choice best fits your job description?</FormLabel>
          <Controller
            name="jobDescription"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="OTR Driver, away 4+ nights a week"
                  control={<Radio />}
                  label="OTR Driver, away 4+ nights a week"
                />
                <FormControlLabel
                  value="Regional Driver, away 4+ nights a week"
                  control={<Radio />}
                  label="Regional Driver, away 4+ nights a week"
                />
                <FormControlLabel
                  value="Regional Driver"
                  control={<Radio />}
                  label="Regional Driver"
                />
                <FormControlLabel
                  value="Local Driver"
                  control={<Radio />}
                  label="Local Driver"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.jobDescription?.message}
          </FormHelperText>
        </FormControl>

        {/* Employer */}
        <ControlledTextField
          control={control}
          name="employer.name"
          label="Employer Name"
          variant="outlined"
          error={errors.employer?.name}
        />
        <ControlledTextField
          control={control}
          name="employer.contact"
          label="Employer Contact"
          variant="outlined"
          error={errors.employer?.contact}
        />

        {/* Monthly Household Expenses */}
        <ControlledTextField
          control={control}
          name="monthlyHouseholdExpenses"
          label="Monthly Household Expenses"
          variant="outlined"
          error={errors.monthlyHouseholdExpenses}
          type="number"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          convertToNumber={true}
          required
        />

        <Divider />
        {/* Section Title: Owner Operator Information */}
        <Typography variant="h6">Owner Operator Information</Typography>
        {/* Is Owner Operator */}
        <FormControl error={!!errors.isOwnerOperator} sx={{ width: "100%" }}>
          <FormLabel>Are you an owner, operator, or lease operator?</FormLabel>
          <Controller
            name="isOwnerOperator"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.isOwnerOperator?.message}
          </FormHelperText>
        </FormControl>
        {watch("isOwnerOperator") === true && (
          <>
            {/* Business Income */}
            <ControlledTextField
              control={control}
              name="ownerOperatorInfo.businessIncome"
              label="Business Income"
              variant="outlined"
              error={errors.ownerOperatorInfo?.businessIncome}
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
              convertToNumber={true}
            />

            {/* Business Expenses */}
            <ControlledTextField
              control={control}
              name="ownerOperatorInfo.businessExpenses"
              label="Business Expenses"
              variant="outlined"
              error={errors.ownerOperatorInfo?.businessExpenses}
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
              convertToNumber={true}
            />
          </>
        )}
        <Divider />
        {/* Section Title: Doctors */}
        <Typography variant="h6">Doctors</Typography>
        {doctors.map((doctor, idx) => (
          <Box
            key={doctor.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 2,
            }}
          >
            <ControlledTextField
              control={control}
              name={`doctors.${idx}.name`}
              label="Doctor's Name"
              variant="outlined"
              error={errors?.doctors?.[idx]?.name}
              sx={{ width: "100%" }}
            />

            <ControlledTextField
              control={control}
              name={`doctors.${idx}.phone`}
              label="Doctor's Phone Number"
              variant="outlined"
              error={errors?.doctors?.[idx]?.phone}
              type="tel"
              sx={{ width: "100%" }}
            />

            <IconButton onClick={() => deleteDoctor(idx)} sx={{ ml: "auto" }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          onClick={() => {
            const doctor: Doctor = {
              id: crypto.randomUUID(),
              name: "",
              phone: "",
            };
            addDoctor(doctor);
          }}
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Doctor
        </Button>

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
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
              <Typography sx={{ pl: 1 }}>I agree.</Typography>
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
          By submitting this form, you acknowledge that your health information
          is protected under the Health Insurance Portability and Accountability
          Act (HIPAA).
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
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
              <Typography sx={{ pl: 1 }}>I agree.</Typography>
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
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isLoading}
        >
          Next
        </LoadingButton>

        <Typography color="red">
          {submitCount && !isSubmitSuccessful
            ? "Please review all fields before continuing."
            : ""}
        </Typography>
      </Box>
    </form>
  );
}

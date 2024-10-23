"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import {
  Doctor,
  GeneralInformationFormValues,
  generalInformationValidator,
} from "@/types";

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<GeneralInformationFormValues>({
    resolver: zodResolver(generalInformationValidator),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      isUsCitizen: false,
      phoneNumber: "",
      address: "",
      referralSource: "",

      hasClassACdl: false,
      cdlNumber: "",
      classBDescription: "",
      employer: {
        name: "",
        contact: "",
      },
      drivesSemiTruckOverRoad: false,
      monthlyHouseholdExpenses: 0,

      ownerOperatorInfo: {
        businessIncome: 0,
        businessExpenses: 0,
      },

      healthConditions: "",
      recentIllnessOrInjuryDetails: "",
      devices: "",

      healthMetrics: {
        isDiabetic: false,
        hasHighBloodPressure: false,
        hasHighCholesterol: false,
        hasHeartDisease: false,
        isObese: false,
        weight: 0,
        bloodPressure: "",
        a1c: 0,
        bloodGlucose: 0,
        cholesterol: 0,
        other: "",
      },

      healthGoals: {
        shortTerm: "",
        longTerm: "",
      },

      doctors: [],

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
    <Box
      sx={{
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
              <FormControl error={!!errors.dateOfBirth} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    {...field}
                    value={
                      field.value ? dayjs(field.value, "MM/DD/YYYY") : null
                    } // Handle string value correctly
                    onChange={(date) =>
                      field.onChange(date?.format("MM/DD/YYYY") || "")
                    } // Convert dayjs to string
                    label="Date of Birth"
                    variant="outlined"
                    format="MM/DD/YYYY"
                  />
                </LocalizationProvider>
                <FormHelperText>{errors.dateOfBirth?.message}</FormHelperText>
              </FormControl>
            )}
          />

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
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                label="Phone Number"
                variant="outlined"
                type="tel"
              />
            )}
          />

          {/* Address */}
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.address}
                helperText={errors.address?.message}
                label="Address"
                variant="outlined"
              />
            )}
          />

          {/* Referral Source */}
          <Controller
            name="referralSource"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.referralSource}
                helperText={errors.referralSource?.message}
                label="Referral Source"
                variant="outlined"
              />
            )}
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
            <Controller
              name="cdlNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.cdlNumber}
                  helperText={errors.cdlNumber?.message}
                  label="CDL Number"
                  variant="outlined"
                />
              )}
            />
          )}

          {watch("hasClassACdl") === false && (
            <Controller
              name="classBDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.classBDescription}
                  helperText={errors.classBDescription?.message}
                  label="Class B CDL Description"
                  variant="outlined"
                />
              )}
            />
          )}

          {/* Employer */}
          <Controller
            name="employer.name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.employer?.name}
                helperText={errors.employer?.name?.message}
                label="Employer Name"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="employer.contact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.employer?.contact}
                helperText={errors.employer?.contact?.message}
                label="Employer Contact"
                variant="outlined"
              />
            )}
          />

          {/* Drives Semi Truck Over Road */}
          <FormControl
            error={!!errors.drivesSemiTruckOverRoad}
            sx={{ width: "100%" }}
          >
            <FormLabel>
              Do you drive a semi-truck over the road or did you before an
              illness or injury?
            </FormLabel>
            <FormHelperText sx={{ m: 0 }}>
              Away from home for at least 4 nights a week.
            </FormHelperText>
            <Controller
              name="drivesSemiTruckOverRoad"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  value={field.value ? String(field.value) : ""}
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
              {errors.drivesSemiTruckOverRoad?.message}
            </FormHelperText>
          </FormControl>

          {/* Monthly Household Expenses */}
          <Controller
            name="monthlyHouseholdExpenses"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.monthlyHouseholdExpenses}
                helperText={errors.monthlyHouseholdExpenses?.message}
                label="Monthly Household Expenses"
                type="number"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  const numericValue = parseFloat(e.target.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }}
              />
            )}
          />

          <Divider />

          {/* Section Title: Owner Operator Information */}
          <Typography variant="h6">Owner Operator Information</Typography>

          {/* Business Income */}
          <Controller
            name="ownerOperatorInfo.businessIncome"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.ownerOperatorInfo?.businessIncome}
                helperText={errors.ownerOperatorInfo?.businessIncome?.message}
                label="Business Income"
                type="number"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  const numericValue = parseFloat(e.target.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }}
              />
            )}
          />

          {/* Business Expenses */}
          <Controller
            name="ownerOperatorInfo.businessExpenses"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.ownerOperatorInfo?.businessExpenses}
                helperText={errors.ownerOperatorInfo?.businessExpenses?.message}
                label="Business Expenses"
                type="number"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  const numericValue = parseFloat(e.target.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }}
              />
            )}
          />

          <Divider />

          {/* Section Title: Health History */}
          <Typography variant="h6">Health History</Typography>

          {/* Health Conditions */}
          <Controller
            name="healthConditions"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthConditions}
                helperText={errors.healthConditions?.message}
                label="Health Conditions"
                multiline
                rows={3}
                variant="outlined"
              />
            )}
          />

          {/* Recent Illness or Injury Details */}
          <Controller
            name="recentIllnessOrInjuryDetails"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.recentIllnessOrInjuryDetails}
                helperText={errors.recentIllnessOrInjuryDetails?.message}
                label="Recent Illness or Injury"
                multiline
                rows={3}
                variant="outlined"
              />
            )}
          />

          {/* Medical Devices */}
          <Controller
            name="devices"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.devices}
                helperText={errors.devices?.message}
                label="Medical Devices"
                variant="outlined"
              />
            )}
          />

          <Divider />

          {/* Section Title: Health History */}
          <Typography variant="h6">Health Metrics</Typography>

          <Typography>
            Which of the following conditions do you have? <br /> (Check all
            that apply.)
          </Typography>

          {/* Diabetic */}
          <Controller
            name="healthMetrics.isDiabetic"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Diabetic"
              />
            )}
          />

          {/* High Blood Pressure */}
          <Controller
            name="healthMetrics.hasHighBloodPressure"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="High Blood Pressure"
              />
            )}
          />

          {/* High Cholesterol */}
          <Controller
            name="healthMetrics.hasHighCholesterol"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="High Cholesterol"
              />
            )}
          />

          {/* Heart Disease */}
          <Controller
            name="healthMetrics.hasHeartDisease"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Heart Disease"
              />
            )}
          />

          {/* Obese */}
          <Controller
            name="healthMetrics.isObese"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Obese"
              />
            )}
          />

          {/* Weight */}
          <Controller
            name="healthMetrics.weight"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthMetrics?.weight}
                helperText={errors.healthMetrics?.weight?.message}
                label="Weight"
                type="number"
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">lbs</InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  const numericValue = parseFloat(e.target.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }}
              />
            )}
          />

          {/* Blood Pressure */}
          <Controller
            name="healthMetrics.bloodPressure"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthMetrics?.bloodPressure}
                helperText={errors.healthMetrics?.bloodPressure?.message}
                label="Blood Pressure (e.g. 120/80)"
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">mmHg</InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          {/* A1C */}
          <Controller
            name="healthMetrics.a1c"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthMetrics?.a1c}
                helperText={errors.healthMetrics?.a1c?.message}
                label="A1C"
                type="number"
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  const numericValue = parseFloat(e.target.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }}
              />
            )}
          />

          {/* Blood Glucose */}
          <Controller
            name="healthMetrics.bloodGlucose"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthMetrics?.bloodGlucose}
                helperText={errors.healthMetrics?.bloodGlucose?.message}
                label="Blood Glucose"
                type="number"
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">mg/dL</InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  const numericValue = parseFloat(e.target.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }}
              />
            )}
          />

          {/* Cholesterol */}
          <Controller
            name="healthMetrics.cholesterol"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthMetrics?.cholesterol}
                helperText={errors.healthMetrics?.cholesterol?.message}
                label="Cholesterol"
                type="number"
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">mg/dL</InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  const numericValue = parseFloat(e.target.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }}
              />
            )}
          />

          {/* Other */}
          <Controller
            name="healthMetrics.other"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthMetrics?.other}
                helperText={errors.healthMetrics?.other?.message}
                label="Other"
                variant="outlined"
              />
            )}
          />

          <Divider />

          {/* Section Title: Health Goals */}
          <Typography variant="h6">Health Goals</Typography>

          <Controller
            name="healthGoals.shortTerm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthGoals?.shortTerm}
                helperText={errors.healthGoals?.shortTerm?.message}
                label="Short Term Health Goals"
                multiline
                rows={3}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="healthGoals.longTerm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.healthGoals?.longTerm}
                helperText={errors.healthGoals?.longTerm?.message}
                label="Long Term Health Goals"
                multiline
                rows={3}
                variant="outlined"
              />
            )}
          />

          <Divider />

          {/* Section Title: Doctors */}
          <Typography variant="h6">Doctors</Typography>
          {doctors.map((doctor, idx) => (
            <Box
              key={doctor.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Controller
                name={`doctors.${idx}.name`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.doctors?.[idx]?.name}
                    helperText={errors?.doctors?.[idx]?.name?.message}
                    label="Doctor's Name"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                )}
              />
              <Controller
                name={`doctors.${idx}.phone`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.doctors?.[idx]?.phone}
                    helperText={errors?.doctors?.[idx]?.phone?.message}
                    label="Doctor's Phone Number"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                )}
              />
              <IconButton onClick={() => deleteDoctor(idx)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={() => addDoctor({ name: "", phone: "" } as Doctor)}
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

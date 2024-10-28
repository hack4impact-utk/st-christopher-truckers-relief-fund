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
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import ControlledTextInput from "@/components/forms/ControlledTextInput";
import {
  Doctor,
  GeneralInformationFormValues,
  generalInformationValidator,
} from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

export default function GeneralInformationSection() {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
      isUsCitizen: true,
      phoneNumber: "",
      address: "",
      referralSource: "",

      hasClassACdl: true,
      cdlNumber: "",
      classBDescription: "",
      employer: {
        name: "",
        contact: "",
      },
      drivesSemiTruckOverRoad: false,
      monthlyHouseholdExpenses: 0,

      isOwnerOperator: false,
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

  const onSubmit = async (data: GeneralInformationFormValues) => {
    // eslint-disable-next-line no-console
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <ControlledTextInput
            control={control}
            name="firstName"
            label="First Name"
            variant="outlined"
            error={errors.firstName}
            sx={{ width: "100%" }}
          />

          <ControlledTextInput
            control={control}
            name="lastName"
            label="Last Name"
            variant="outlined"
            error={errors.lastName}
            sx={{ width: "100%" }}
          />
        </Box>
        {/* Email */}
        <ControlledTextInput
          control={control}
          name="email"
          label="Email"
          variant="outlined"
          error={errors.email}
        />
        {/* Password */}
        <ControlledTextInput
          control={control}
          name="password"
          label="Password"
          variant="outlined"
          error={errors.password}
          type="password"
        />
        <ControlledTextInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          error={errors.confirmPassword}
          type="password"
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
        <ControlledTextInput
          control={control}
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          error={errors.phoneNumber}
          type="tel"
        />
        {/* Address */}
        <ControlledTextInput
          control={control}
          name="address"
          label="Address"
          variant="outlined"
          error={errors.address}
        />
        {/* Referral Source */}
        <ControlledTextInput
          control={control}
          name="referralSource"
          label="Referral Source"
          variant="outlined"
          error={errors.referralSource}
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
          <ControlledTextInput
            control={control}
            name="cdlNumber"
            label="CDL Number"
            variant="outlined"
            error={errors.cdlNumber}
          />
        )}
        {watch("hasClassACdl") === false && (
          <ControlledTextInput
            control={control}
            name="classBDescription"
            label="Class B CDL Description"
            variant="outlined"
            error={errors.classBDescription}
          />
        )}
        {/* Employer */}
        <ControlledTextInput
          control={control}
          name="employer.name"
          label="Employer Name"
          variant="outlined"
          error={errors.employer?.name}
        />
        <ControlledTextInput
          control={control}
          name="employer.contact"
          label="Employer Contact"
          variant="outlined"
          error={errors.employer?.contact}
        />
        {/* Drives Semi Truck Over Road */}
        <FormControl
          error={!!errors.drivesSemiTruckOverRoad}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you drive a semi-truck over the road or did you before an illness
            or injury?
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
            {errors.drivesSemiTruckOverRoad?.message}
          </FormHelperText>
        </FormControl>
        {/* Monthly Household Expenses */}
        <ControlledTextInput
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
            <ControlledTextInput
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
            <ControlledTextInput
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
        {/* Section Title: Health History */}
        <Typography variant="h6">Health History</Typography>
        {/* Health Conditions */}
        <ControlledTextInput
          control={control}
          name="healthConditions"
          label="Health Conditions"
          variant="outlined"
          error={errors.healthConditions}
          multiline
          rows={3}
        />
        {/* Recent Illness or Injury Details */}
        <ControlledTextInput
          control={control}
          name="recentIllnessOrInjuryDetails"
          label="Recent Illness or Injury"
          variant="outlined"
          error={errors.recentIllnessOrInjuryDetails}
          multiline
          rows={3}
        />
        {/* Medical Devices */}
        <ControlledTextInput
          control={control}
          name="devices"
          label="Medical Devices"
          variant="outlined"
          error={errors.devices}
        />
        <Divider />
        {/* Section Title: Health History */}
        <Typography variant="h6">Health Metrics</Typography>
        <Typography>
          Which of the following conditions do you have? <br /> (Check all that
          apply.)
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
        <ControlledTextInput
          control={control}
          name="healthMetrics.weight"
          label="Weight"
          variant="outlined"
          error={errors.healthMetrics?.weight}
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
            },
          }}
          convertToNumber={true}
        />
        {/* Blood Pressure */}
        <ControlledTextInput
          control={control}
          name="healthMetrics.bloodPressure"
          label="Blood Pressure (e.g. 120/80)"
          variant="outlined"
          error={errors.healthMetrics?.bloodPressure}
          type="number"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">mmHg</InputAdornment>
              ),
            },
          }}
        />
        {/* A1C */}
        <ControlledTextInput
          control={control}
          name="healthMetrics.a1c"
          label="A1C"
          variant="outlined"
          error={errors.healthMetrics?.a1c}
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          convertToNumber={true}
        />
        {/* Blood Glucose */}
        <ControlledTextInput
          control={control}
          name="healthMetrics.bloodGlucose"
          label="Blood Glucose"
          variant="outlined"
          error={errors.healthMetrics?.bloodGlucose}
          type="number"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">mg/dL</InputAdornment>
              ),
            },
          }}
          convertToNumber={true}
        />
        {/* Cholesterol */}
        <ControlledTextInput
          control={control}
          name="healthMetrics.cholesterol"
          label="Cholesterol"
          variant="outlined"
          error={errors.healthMetrics?.cholesterol}
          type="number"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">mg/dL</InputAdornment>
              ),
            },
          }}
          convertToNumber={true}
        />

        {/* Other */}
        <ControlledTextInput
          control={control}
          name="healthMetrics.other"
          label="Other"
          variant="outlined"
          error={errors.healthMetrics?.other}
        />

        <Divider />

        {/* Section Title: Health Goals */}
        <Typography variant="h6">Health Goals</Typography>
        <ControlledTextInput
          control={control}
          name="healthGoals.shortTerm"
          label="Short Term Health Goals"
          variant="outlined"
          error={errors.healthGoals?.shortTerm}
          multiline
          rows={3}
        />

        <ControlledTextInput
          control={control}
          name="healthGoals.longTerm"
          label="Long Term Health Goals"
          variant="outlined"
          error={errors.healthGoals?.longTerm}
          multiline
          rows={3}
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
              justifyContent: "flex-start",
              gap: 2,
            }}
          >
            <ControlledTextInput
              control={control}
              name={`doctors.${idx}.name`}
              label="Doctor's Name"
              variant="outlined"
              error={errors?.doctors?.[idx]?.name}
              sx={{ width: "100%" }}
            />

            <ControlledTextInput
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
                render={({ field }) => <Checkbox {...field} />}
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
                render={({ field }) => <Checkbox {...field} />}
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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        <Typography variant="h6" fontWeight="normal" color="red">
          {errors.root?.message}
        </Typography>
      </Box>
    </form>
  );
}

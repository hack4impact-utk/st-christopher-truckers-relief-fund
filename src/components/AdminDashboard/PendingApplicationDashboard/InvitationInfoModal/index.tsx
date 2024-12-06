"use client";

import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { EnrollmentForm } from "@/types/EnrollmentForm";

type InvitationInfoModalProps = {
  enrollmentForm: EnrollmentForm;
};

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
};

export default function InvitationInfoModal({
  enrollmentForm,
}: InvitationInfoModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    generalInformationSection: generalInfo,
    programSelectionSection: programSelection,
    programSpecificQuestionsSection: specificQuestions,
  } = enrollmentForm;

  return (
    <div>
      {/* Button to trigger the modal */}
      <Button variant="contained" onClick={handleOpen}>
        <InfoIcon />
      </Button>

      {/* Modal component containing enrollment information */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h4"
              component="h2"
              gutterBottom
            >
              Enrollment Form Information
            </Typography>

            {/* General Info */}
            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              General Information
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Name:</strong> {generalInfo.firstName}{" "}
              {generalInfo.lastName}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Email:</strong> {generalInfo.email}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Phone:</strong> {generalInfo.phoneNumber}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Date of Birth:</strong> {generalInfo.dateOfBirth}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Address:</strong> {generalInfo.address}
            </Typography>

            {/* Employer Info */}
            {generalInfo.employer?.name && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  <strong>Employer:</strong>
                </Typography>
                <Typography variant="body2">
                  - Name: {generalInfo.employer.name}
                </Typography>
                {generalInfo.employer.contact && (
                  <Typography variant="body2">
                    - Contact: {generalInfo.employer.contact}
                  </Typography>
                )}
              </Box>
            )}

            {/* Doctors */}
            {generalInfo.doctors?.length ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Doctors:</strong>
                </Typography>
                {generalInfo.doctors.map((doctor, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ ml: 2, fontSize: "1rem" }}
                  >
                    - {doctor.name} (Phone: {doctor.phone})
                  </Typography>
                ))}
              </Box>
            ) : null}

            {/* Program Selection */}
            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              Program Selection
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Healthy Habits:</strong>{" "}
              {programSelection.optedInToHealthyHabits ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Diabetes Prevention:</strong>{" "}
              {programSelection.optedInToDiabetesPrevention ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Rigs Without Cigs:</strong>{" "}
              {programSelection.optedInToRigsWithoutCigs ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Vaccine Voucher:</strong>{" "}
              {programSelection.optedInToVaccineVoucher ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Preventative Screenings:</strong>{" "}
              {programSelection.optedInToGetPreventativeScreenings
                ? "Yes"
                : "No"}
            </Typography>

            {/* Healthy Habits & Diabetes Prevention */}
            {(programSelection.optedInToHealthyHabits ||
              programSelection.optedInToDiabetesPrevention) && (
              <>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                  Healthy Habits & Diabetes Prevention
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Weight:</strong>{" "}
                  {specificQuestions.healthyHabitsAndDiabetesPrevention.weight}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>BMI:</strong>{" "}
                  {specificQuestions.healthyHabitsAndDiabetesPrevention.bmi}
                </Typography>
                {programSelection.optedInToHealthyHabits && (
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.1rem", mb: 1 }}
                  >
                    <strong>Healthy Habits Hopeful Learnings:</strong>{" "}
                    {
                      specificQuestions.healthyHabitsAndDiabetesPrevention
                        .healthyHabitsHopefulLearnings
                    }
                  </Typography>
                )}
                {programSelection.optedInToDiabetesPrevention && (
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.1rem", mb: 1 }}
                  >
                    <strong>Diabetes Prevention Hopeful Learnings:</strong>{" "}
                    {
                      specificQuestions.healthyHabitsAndDiabetesPrevention
                        .diabetesPreventionHopefulLearnings
                    }
                  </Typography>
                )}
              </>
            )}

            {/* Rigs Without Cigs */}
            {programSelection.optedInToRigsWithoutCigs && (
              <>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                  Rigs Without Cigs
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Cigarettes Per Day:</strong>{" "}
                  {specificQuestions.rigsWithoutCigs.cigarettesPerDay}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Accountability Person:</strong>{" "}
                  {
                    specificQuestions.rigsWithoutCigs.accountabilityPerson
                      .firstName
                  }{" "}
                  {
                    specificQuestions.rigsWithoutCigs.accountabilityPerson
                      .lastName
                  }
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Accountability Person Phone:</strong>{" "}
                  {
                    specificQuestions.rigsWithoutCigs.accountabilityPerson
                      .phoneNumber
                  }
                </Typography>
              </>
            )}

            {/* Vaccine Voucher */}
            {programSelection.optedInToVaccineVoucher && (
              <>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                  Vaccine Voucher
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Flu Vaccine:</strong>{" "}
                  {specificQuestions.vaccineVoucher.vaccines.wantsFluVaccine
                    ? "Yes"
                    : "No"}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Pneumonia Vaccine:</strong>{" "}
                  {specificQuestions.vaccineVoucher.vaccines
                    .wantsPneumoniaVaccine
                    ? "Yes"
                    : "No"}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Shingles Vaccine:</strong>{" "}
                  {specificQuestions.vaccineVoucher.vaccines
                    .wantsShinglesVaccine
                    ? "Yes"
                    : "No"}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>COVID-19 Vaccine:</strong>{" "}
                  {specificQuestions.vaccineVoucher.vaccines.wantsCovid19Vaccine
                    ? "Yes"
                    : "No"}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Voucher Location:</strong>{" "}
                  {specificQuestions.vaccineVoucher.voucherLocation}
                </Typography>
              </>
            )}

            {/* Preventative Screenings */}
            {programSelection.optedInToGetPreventativeScreenings && (
              <>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                  Preventative Screenings
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                  <strong>Agree to Share Results:</strong>{" "}
                  {specificQuestions.getPreventativeScreenings
                    .agreeToShareResults
                    ? "Yes"
                    : "No"}
                </Typography>
                {specificQuestions.getPreventativeScreenings
                  .prostateScreening && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "1.1rem", mb: 1 }}
                    >
                      <strong>Prostate Screening Not Applicable:</strong>{" "}
                      {specificQuestions.getPreventativeScreenings
                        .prostateScreening.isNotApplicable
                        ? "Yes"
                        : "No"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "1.1rem", mb: 1 }}
                    >
                      <strong>Agree to Get Account Registered:</strong>{" "}
                      {specificQuestions.getPreventativeScreenings
                        .prostateScreening.agreeToGetAccountRegistered
                        ? "Yes"
                        : "No"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "1.1rem", mb: 1 }}
                    >
                      <strong>Agrees to Prostate Screening:</strong>{" "}
                      {specificQuestions.getPreventativeScreenings
                        .prostateScreening.agreesToProstateScreening
                        ? "Yes"
                        : "No"}
                    </Typography>
                  </>
                )}
              </>
            )}

            <Button variant="outlined" onClick={handleClose} sx={{ mt: 3 }}>
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

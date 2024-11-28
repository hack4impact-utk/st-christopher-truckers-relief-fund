"use client";

import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { OldEnrollmentForm } from "@/types";

type InvitationInfoModalProps = {
  enrollmentForm: OldEnrollmentForm;
};

// Define the styling for the modal content
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

// Functional component for the Invitation Info Modal
export default function InvitationInfoModal({
  enrollmentForm,
}: InvitationInfoModalProps) {
  // State to manage the open/closed status of the modal
  const [open, setOpen] = useState(false);

  // Handlers to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Array of key-value pairs to simplify rendering
  const formFields = [
    { label: "ID", value: enrollmentForm._id },
    { label: "Date Created", value: enrollmentForm.dateCreated },
    { label: "First Name", value: enrollmentForm.firstName },
    { label: "Last Name", value: enrollmentForm.lastName },
    { label: "Email", value: enrollmentForm.email },
    { label: "Address", value: enrollmentForm.address },
    { label: "Phone Number", value: enrollmentForm.phoneNumber },
    { label: "Date of Birth", value: enrollmentForm.dateOfBirth },
    { label: "Health Conditions", value: enrollmentForm.healthConditions },
    { label: "Referral Source", value: enrollmentForm.referralSource },
    { label: "Weight", value: enrollmentForm.healthMetrics?.weight },
    {
      label: "Blood Pressure",
      value: enrollmentForm.healthMetrics?.bloodPressure,
    },
    { label: "Cholesterol", value: enrollmentForm.healthMetrics?.cholesterol },
    { label: "A1C", value: enrollmentForm.healthMetrics?.a1c },
    {
      label: "Short Term Health Goal",
      value: enrollmentForm.healthGoals?.shortTerm,
    },
    {
      label: "Long Term Health Goal",
      value: enrollmentForm.healthGoals?.longTerm,
    },
  ];

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
              variant="h5"
              component="h2"
              gutterBottom
            >
              Enrollment Form Information
            </Typography>

            {/* Render fields with values */}
            {formFields
              .filter((field) => field.value) // Display only fields with values
              .map((field, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ fontSize: "1.1rem", mb: 1 }}
                >
                  <strong>{field.label}:</strong> {field.value}
                </Typography>
              ))}

            {/* Render Doctors if available */}
            {enrollmentForm.doctors?.length ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Doctors:</strong>
                </Typography>
                {enrollmentForm.doctors.map((doctor, index) => (
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

            {/* Render Employer if available */}
            {enrollmentForm.employer && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  <strong>Employer:</strong>
                </Typography>
                <Typography variant="body2">
                  - Name: {enrollmentForm.employer.name}
                </Typography>
                <Typography variant="body2">
                  - Contact: {enrollmentForm.employer.contact}
                </Typography>
              </Box>
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

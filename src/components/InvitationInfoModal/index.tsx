"use client";

import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { EnrollmentForm as EnrollmentFormType } from "@/types/EnrollmentForm";

// Define the props interface for the modal component
type InvitationInfoModalProps = {
  enrollment_form: EnrollmentFormType; // The enrollment form object passed as a prop
};

// Define the styling for the modal content
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  maxHeight: "40vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Functional component for the Invitation Info Modal
const InvitationInfoModal: React.FC<InvitationInfoModalProps> = ({
  enrollment_form,
}) => {
  // State to manage the open/closed status of the modal
  const [open, setOpen] = useState(false);

  // Handlers to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Array of key-value pairs to simplify rendering
  const formFields = [
    { label: "ID", value: enrollment_form._id },
    { label: "Date Created", value: enrollment_form.dateCreated },
    { label: "First Name", value: enrollment_form.firstName },
    { label: "Last Name", value: enrollment_form.lastName },
    { label: "Email", value: enrollment_form.email },
    { label: "Address", value: enrollment_form.address },
    { label: "Phone Number", value: enrollment_form.phoneNumber },
    { label: "Date of Birth", value: enrollment_form.dateOfBirth },
    { label: "Health Conditions", value: enrollment_form.healthConditions },
    { label: "Referral Source", value: enrollment_form.referralSource },
    { label: "Weight", value: enrollment_form.healthMetrics?.weight },
    {
      label: "Blood Pressure",
      value: enrollment_form.healthMetrics?.bloodPressure,
    },
    { label: "Cholesterol", value: enrollment_form.healthMetrics?.cholesterol },
    { label: "A1C", value: enrollment_form.healthMetrics?.a1c },
    {
      label: "Short Term Health Goal",
      value: enrollment_form.healthGoals?.shortTerm,
    },
    {
      label: "Long Term Health Goal",
      value: enrollment_form.healthGoals?.longTerm,
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
            {enrollment_form.doctors?.length ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Doctors:</strong>
                </Typography>
                {enrollment_form.doctors.map((doctor, index) => (
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
            {enrollment_form.employer && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  <strong>Employer:</strong>
                </Typography>
                <Typography variant="body2">
                  - Name: {enrollment_form.employer.name}
                </Typography>
                <Typography variant="body2">
                  - Contact: {enrollment_form.employer.contact}
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
};

export default InvitationInfoModal;

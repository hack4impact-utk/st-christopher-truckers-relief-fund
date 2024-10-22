"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { EnrollmentForm as EnrollmentFormType } from "@/types/EnrollmentForm";

// Define the props interface for the modal component
interface InvitationInfoModalProps {
  enrollment_form: EnrollmentFormType; // The enrollment form object passed as a prop
}

// Define the styling for the modal content
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Enrollment Information
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Name: {enrollment_form.firstName} {enrollment_form.lastName}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
              Email: {enrollment_form.email}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
              DOB: {enrollment_form.dateOfBirth}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
              Phone: {enrollment_form.phoneNumber}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
              Address: {enrollment_form.address}
            </Typography>
            <Button variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default InvitationInfoModal;

"use client";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Button, Fade, FormGroup, Modal, Typography } from "@mui/material";
import { useState } from "react";

import ClientProgramManagementFormCheckbox from "@/components/AdminDashboard/ClientManagementDashboard/ClientProgramManagementForm/ClientProgramManagementFormCheckbox";
import { ProgramEnrollment } from "@/types";

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
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

type ClientManagementDashboardProps = {
  programEnrollments: ProgramEnrollment[];
};

export default function ClientProgramManagementForm({
  programEnrollments,
}: ClientManagementDashboardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        <ModeEditIcon />
      </Button>
      <Modal open={open}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4">
              Mange Enrolled Programs
            </Typography>
            <FormGroup>
              {programEnrollments.map((programEnrollment, index) => (
                <ClientProgramManagementFormCheckbox
                  programEnrollment={programEnrollment}
                  key={index}
                />
              ))}
            </FormGroup>
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                fullWidth
              >
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

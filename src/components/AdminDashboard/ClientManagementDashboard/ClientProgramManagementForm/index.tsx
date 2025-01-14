"use client";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  FormGroup,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";

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

type ProgramCheckbox = {
  isDirty: boolean;
  isChecked: boolean;
  programEnrollment: ProgramEnrollment;
};

type ClientManagementDashboardProps = {
  programEnrollments: ProgramEnrollment[];
};

const programEnrollmentToCheckBox = (programEnrollment: ProgramEnrollment) => {
  const checkbox: ProgramCheckbox = {
    isDirty: false,
    isChecked: programEnrollment.status == "accepted",
    programEnrollment,
  };
  return checkbox;
};

export default function ClientProgramManagementForm({
  programEnrollments,
}: ClientManagementDashboardProps) {
  const [open, setOpen] = useState(false);
  const [programCheckboxes, setProgramCheckboxes] = useState(
    programEnrollments.map((programEnrollment) =>
      programEnrollmentToCheckBox(programEnrollment),
    ),
  );
  const initialState = { ...programCheckboxes };

  const handleCheck = (index: number) => {
    setProgramCheckboxes(
      programCheckboxes.map((checkbox, i) => {
        if (index === i) {
          checkbox.isDirty == true;
          checkbox.isChecked = !checkbox.isChecked;
        }

        return checkbox;
      }),
    );
  };

  const handelCancel = () => {
    setOpen(false);
    setProgramCheckboxes(initialState);
  };

  const handelSubmit = () => {
    setOpen(false);
  };

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
              {programCheckboxes.map((programCheckbox, index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={programCheckbox.isChecked}
                      onChange={() => handleCheck(index)}
                    />
                  }
                  label={programCheckbox.programEnrollment.program}
                  key={index}
                />
              ))}
            </FormGroup>
            <Box display="flex" gap={2}>
              <Button variant="outlined" onClick={handelCancel} fullWidth>
                Cancel
              </Button>
              <Button variant="contained" onClick={handelSubmit} fullWidth>
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

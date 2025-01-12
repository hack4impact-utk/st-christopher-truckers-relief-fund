"use client";

import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

import { ProgramEnrollment } from "@/types";

type ClientProgramManagementFormCheckboxProps = {
  programEnrollment: ProgramEnrollment;
};

export default function ClientProgramManagementFormCheckbox({
  programEnrollment,
}: ClientProgramManagementFormCheckboxProps) {
  const [checked, setChecked] = useState(
    programEnrollment.status == "accepted",
  );

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
      }
      label={programEnrollment.program}
    />
  );
}

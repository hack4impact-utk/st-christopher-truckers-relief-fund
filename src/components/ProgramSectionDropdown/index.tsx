import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";

import HealthyHabitsForm from "@/components/HealthyHabitsForm";

export default function ProgramSectionDropdown() {
  const [selectedSection, setSelectedSection] = useState<string>("history");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedSection(event.target.value);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {/* Dropdown */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="section-dropdown-label"
          id="section-dropdown"
          value={selectedSection}
          onChange={handleChange}
        >
          <MenuItem value="history">History</MenuItem>
          <MenuItem value="track">Track</MenuItem>
          <MenuItem value="info">Info</MenuItem>
        </Select>
      </FormControl>

      {/* Content Based on Selection */}
      <Box sx={{ marginTop: 3 }}>
        {selectedSection === "history" && <Typography>History</Typography>}
        {selectedSection === "track" && <HealthyHabitsForm />}
        {selectedSection === "info" && <Typography>Info</Typography>}
      </Box>
    </Box>
  );
}

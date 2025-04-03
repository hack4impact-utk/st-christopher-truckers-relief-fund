"use client";

import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

export default function DataExport(): ReactNode {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (value: string) => (): void => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const listItems = [
    {
      name: "Enrollment Forms",
      key: "enrollmentforms",
    },
    {
      name: "Fagerstrom Tests",
      key: "fagerstromtests",
    },
    {
      name: "Healthy Habits Tracking Forms",
      key: "healthyhabitstrackingforms",
    },
    {
      name: "Program Enrollements",
      key: "programenrollments",
    },
    {
      name: "Scheduled Meetings",
      key: "scheduledmeetings",
    },
    {
      name: "Screening Requests",
      key: "screeningrequests",
    },
    {
      name: "Urgent Meeting Requests",
      key: "urgentmeetingrequests",
    },
    {
      name: "Users",
      key: "users",
    },
    {
      name: "Vaccine Voucher Requests",
      key: "vaccinevoucherrequests",
    },
  ];

  const handleExport = (): void => {
    // eslint-disable-next-line no-console
    console.log("Exporting data for: ", selected);
  };

  return (
    <Box>
      <Typography align="center" variant="h6">
        Data Export
      </Typography>

      <Typography>Select which datasets to export.</Typography>
      <List>
        {listItems.map((item) => (
          <ListItem
            key={item.key}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleSelect(item.key)}
                checked={selected.includes(item.key)}
              />
            }
            disablePadding
          >
            <ListItemButton onClick={handleSelect(item.key)}>
              <ListItemText id={item.key} primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleExport}>Export</Button>
    </Box>
  );
}

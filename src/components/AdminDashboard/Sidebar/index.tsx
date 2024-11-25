"use client";
import { List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export default function Sidebar() {
  const links = [
    { href: "/dashboard/admin/programs", label: "Programs" },
    { href: "/dashboard/admin/clients", label: "Clients" },
    { href: "/dashboard/admin/notifications", label: "Notifications" },
    { href: "/dashboard/admin/applications", label: "Applications" },
  ];

  return (
    <>
      {/* // Shift the dom 200 px right */}
      <Box style={{ width: "200px" }}></Box>
      <Box
        sx={{
          width: "200px",
          boxShadow: "10px 0 10px -5px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: "100px",
          left: 0,
          height: "100vh",
          zIndex: 1200,
        }}
      >
        <List>
          {links.map((link) => (
            <ListItem
              key={link.href}
              component="a"
              href={link.href}
              sx={{ justifyContent: "center", color: "inherit" }}
            >
              <ListItemText
                primary={link.label}
                sx={{ textAlign: "left", color: "inherit" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

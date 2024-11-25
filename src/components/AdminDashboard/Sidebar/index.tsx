"use client";
import { List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const links = [
    { href: "/dashboard/admin/programs", label: "Programs" },
    { href: "/dashboard/admin/clients", label: "Clients" },
    { href: "/dashboard/admin/notifications", label: "Notifications" },
    { href: "/dashboard/admin/applications", label: "Applications" },
  ];

  return (
    <Box
      sx={{
        width: "200px",
        boxShadow: "10px 0 10px -5px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        zIndex: 10,
      }}
    >
      <List sx={{ marginTop: "125px" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem sx={{ justifyContent: "center", color: "inherit" }}>
              <ListItemText
                primary={link.label}
                sx={{ textAlign: "left", color: "inherit" }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}

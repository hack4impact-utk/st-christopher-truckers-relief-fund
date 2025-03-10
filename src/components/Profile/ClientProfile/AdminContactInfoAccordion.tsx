"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

const adminContacts = [
  {
    title: "Executive Director",
    name: "Donna Kennedy, Ph.D, M.S.",
    email: "director@truckersfund.org",
  },
  {
    title: "Front Office",
    email: "contact@truckersfund.org",
  },
  {
    title: "Director of Philanthropy",
    name: "Shannon Currier",
    email: "shannon@truckersfund.org",
  },
  {
    title: "Health & Wellness Manager",
    name: "Lindsey Bryan",
    email: "health@truckersfund.org",
  },
  {
    title: "Media Coordinator",
    name: "Nick Oliver",
    email: "media@truckersfund.org",
  },
];

export default function AdminContactInfoAccordion(): ReactNode {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box>
      <Accordion
        sx={{
          width: "100%",
          boxShadow: "none",
          "&::before": { display: "none" },
          "& .MuiAccordionSummary-root": {
            padding: "0", // Remove default padding on the summary
          },
          "& .MuiAccordionDetails-root": {
            padding: "0", // Remove default padding on the details
          },
        }}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            {expanded ? "Hide" : "Show"} SCF Contact Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography>
              <strong>Phone Number:</strong> 865-202-9428
            </Typography>
            <Typography>
              <strong>Fax:</strong> 865-851-8396
            </Typography>
            <Typography>
              <strong>Hours of Operation:</strong> Mon-Thur 9 a.m.-3 p.m.
            </Typography>

            {adminContacts.map((contact, index) => (
              <Box key={index + contact.title}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {contact.title}:
                </Typography>
                {contact.name && <Typography>{contact.name}</Typography>}
                <Typography>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </Typography>
              </Box>
            ))}

            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Mail:
              </Typography>
              <Typography>
                St. Christopher Fund PO Box 30763 Knoxville, TN 37930
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

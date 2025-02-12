import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

import { User } from "@/types";

import ChangePasswordButton from "../Profile/ChangePasswordButton";
import SignOutButton from "../Profile/SignOutButton";

type ClientProfileProps = {
  user: User;
};

export default function ClientProfile({ user }: ClientProfileProps): ReactNode {
  if (user.role !== "client") {
    return null;
  }

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        maxHeight: "min(90vw, 700px)",
        overflowY: "auto",
        boxShadow: 3,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <Typography variant="h4" textAlign="center">
        Client Profile
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Phone Number:</strong> {user.phoneNumber}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Accepted Programs</Typography>
      <List>
        {user.programEnrollments.map((programEnrollment) =>
          programEnrollment.status === "accepted" ? (
            <ListItem key={programEnrollment._id} disablePadding>
              <Typography>{programEnrollment.program}</Typography>
            </ListItem>
          ) : null,
        )}
      </List>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <ChangePasswordButton />
        <SignOutButton />
      </Box>

      <Accordion
        sx={{
          width: "100%",
          boxShadow: "none",
          mt: 2,
          "&::before": { display: "none" },
          "& .MuiAccordionSummary-root": {
            padding: "0", // Remove default padding on the summary
          },
          "& .MuiAccordionDetails-root": {
            padding: "0", // Remove default padding on the details
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Program Admin Contact</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              textAlign: "left",
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

            {[
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
            ].map((contact, index) => (
              <Box key={index}>
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

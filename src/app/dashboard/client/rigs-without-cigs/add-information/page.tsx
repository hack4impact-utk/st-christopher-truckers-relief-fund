import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { getUserByEmail } from "@/server/api/users/queries";
import getUserSession from "@/utils/getUserSession";

export default async function AddRigsWithoutCigsInformationPage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  if (session.user.role !== "client") {
    redirect("/dashboard");
  }

  const [user, error] = await getUserByEmail(session.user.email, {
    populateEnrollmentForm: true,
  });

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          There was an error fetching your user information.
        </Typography>
      </Box>
    );
  }

  if (user.role !== "client") {
    redirect("/dashboard");
  }

  // if enrollment form information already exists, redirect to normal dashboard

  const hasRigsWithoutCigsEnrollmentInformation =
    user.enrollmentForm.programSpecificQuestionsSection
      .hasOptedInToRigsWithoutCigs;

  if (hasRigsWithoutCigsEnrollmentInformation) {
    redirect("/dashboard/client/rigs-without-cigs");
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Add Rigs Without Cigs Information</Typography>
    </Box>
  );
}

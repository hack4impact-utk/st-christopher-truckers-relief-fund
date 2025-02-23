import { Box } from "@mui/material";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

import { getUserByEmail } from "@/server/api/users/queries";
import { ClientUser, ProgramEnrollment } from "@/types";
import getUserSession from "@/utils/getUserSession";
import isUserEnrolledInProgram from "@/utils/isEnrolledInProgram";

type PageProps = {
  user: ClientUser;
  programEnrollment: ProgramEnrollment;
};

// This generates both the metadata and props for child pages
export async function generateMetadata(): Promise<{ props: PageProps }> {
  const session = await getUserSession();
  if (!session) redirect("/");

  const [user, error] = await getUserByEmail(session.user.email, {
    populateProgramEnrollments: true,
    populateEnrollmentForm: true,
  });

  if (error !== null) {
    throw new Error("Failed to fetch user data");
  }

  if (user.role !== "client") {
    redirect("/dashboard");
  }

  const enrolledInRigsWithoutCigsProgram = isUserEnrolledInProgram(
    user.programEnrollments,
    "Rigs Without Cigs",
  );

  if (!enrolledInRigsWithoutCigsProgram) {
    redirect("/dashboard/client");
  }

  // Get pathname using referer header as a workaround
  const headersList = headers();
  const referer = headersList.get("referer") || ""; // Get previous page URL
  const pathname = new URL(referer, "https://example.com").pathname; // Extract pathname safely
  const isMissingInfoPage = pathname.includes("/missing-info");

  // Check if user has opted into the program
  if (
    !user.enrollmentForm?.programSpecificQuestionsSection
      ?.hasOptedInToRigsWithoutCigs &&
    !isMissingInfoPage
  ) {
    redirect("/dashboard/client/rigs-without-cigs/missing-info");
  }

  const rigsWithoutCigsEnrollment = user.programEnrollments.find(
    (enrollment) => enrollment.program === "Rigs Without Cigs",
  );

  if (!rigsWithoutCigsEnrollment) {
    redirect("/dashboard/client");
  }

  // Make sure we have the enrollment form data
  if (!user.enrollmentForm) {
    throw new Error("Enrollment form data is missing");
  }

  return {
    props: {
      user,
      programEnrollment: rigsWithoutCigsEnrollment,
    },
  };
}

// Layout component
export default async function RigsWithoutCigsLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  // Get the metadata/props we generated
  const { props } = await generateMetadata();

  // Clone children with props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        padding: 1,
      }}
    >
      {childrenWithProps}
    </Box>
  );
}

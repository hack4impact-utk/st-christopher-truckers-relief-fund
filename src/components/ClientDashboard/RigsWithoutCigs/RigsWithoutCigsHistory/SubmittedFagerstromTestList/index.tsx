"use client";

import { Box, List, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { handleFagerstromTestDeletion } from "@/server/api/fagerstrom-tests/public-mutations";
import { FagerstromTest, User } from "@/types";

import FagerstromTestListItem from "./FagerstromTestListItem";

type RigsWithoutCigsFormsProps = {
  user: User;
  fagerstromTests: FagerstromTest[];
  setFagerstromTests: Dispatch<SetStateAction<FagerstromTest[]>>;
};

export default function SubmittedFagerstromTestList({
  user,
  fagerstromTests,
  setFagerstromTests,
}: Readonly<RigsWithoutCigsFormsProps>): ReactNode {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (form: FagerstromTest): Promise<void> => {
    const confirm = window.confirm(
      "Are you sure you want to delete this fagerstrom test?",
    );

    if (!confirm) {
      return;
    }

    if (fagerstromTests.length === 1) {
      enqueueSnackbar("You must have at least one fagerstrom test on record.", {
        variant: "error",
      });
      return;
    }

    setFagerstromTests((prevTests) =>
      prevTests.filter((prevForm) => prevForm._id !== form._id),
    );

    await handleFagerstromTestDeletion(form, user);

    enqueueSnackbar("Fagerstrom test deleted successfully.", {
      variant: "success",
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Previous forms</Typography>
      {fagerstromTests.length === 0 ? (
        <Typography>No previous forms found.</Typography>
      ) : (
        <List>
          {fagerstromTests.map((fagerstromTest) => (
            <FagerstromTestListItem
              key={fagerstromTest._id}
              fagerstromTest={fagerstromTest}
              handleDelete={handleDelete}
            />
          ))}
        </List>
      )}
    </Box>
  );
}

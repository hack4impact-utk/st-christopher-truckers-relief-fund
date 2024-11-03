"use client";

import { Clear as ClearIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function RejectButton({
  height = 40,
  width = 100,
}: {
  height?: number;
  width?: number;
}) {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<{ rejectionReason: string }>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: { rejectionReason: string }) => {
    // add submission logic here later.
    console.log(data.rejectionReason);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<ClearIcon />}
        onClick={handleOpen}
        style={{ height, width }}
      >
        Reject
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Rejection Reason
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="rejectionReason"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Rejection Reason"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </FormControl>
            <Button type="submit" variant="contained" color="error">
              Reject
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

"use client";

import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90vw, 700px)",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

type ModalWrapperProps = {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
};

export default function ModalWrapper({
  trigger,
  title,
  children,
}: ModalWrapperProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <>
      <Box onClick={handleOpen} sx={{ display: "inline-block" }}>
        {trigger}
      </Box>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            {title && (
              <Typography id="modal-title" variant="h4">
                {title}
              </Typography>
            )}

            {children}

            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ width: "50%" }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

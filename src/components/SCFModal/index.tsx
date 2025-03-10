"use client";

import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

const defaultModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90vw, 900px)",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

type SCFModalProps = {
  trigger: ReactNode;
  title?: string;
  width?: string;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function SCFModal({
  trigger,
  title,
  width,
  open,
  setOpen,
  children,
}: Readonly<SCFModalProps>): ReactNode {
  const handleClose = (): void => setOpen(false);

  return (
    <>
      {trigger}

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              ...defaultModalStyle,
              width: width ?? defaultModalStyle.width,
            }}
          >
            {title && (
              <Typography id="modal-title" variant="h5">
                {title}
              </Typography>
            )}

            {children}

            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{ mt: 3 }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

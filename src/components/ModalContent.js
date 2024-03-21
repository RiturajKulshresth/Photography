import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalContent = ({ imageUrl, onClose }) => {
  const handleClose = () => {
    onClose(); // Call the onClose function passed from parent
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "90vh",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "9999", // Ensure it's above the modal content
          backgroundColor: "transparent", // Ensure the button is transparent
        }}
      >
        <CloseIcon fontSize="large" style={{ color: "white" }} />
      </IconButton>
      <img
        src={imageUrl}
        alt="Modal"
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default ModalContent;

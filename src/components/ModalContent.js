import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from '@mui/material';

const ModalContent = React.forwardRef(({ imageUrl, onClose }, ref) => {
  const handleClose = () => {
    onClose(); // Call the onClose function passed from parent
  };
  const isMobileView = useMediaQuery('(max-width:600px)');
  const iconButtonPosition = isMobileView ? { bottom: '30px', right: '50%', transform: 'translateX(50%)' } : { top: '60px', right: '32px' };
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
      tabIndex={-1}
    >
      <IconButton
        onClick={handleClose}
        style={{
          position: "absolute",
          zIndex: "9999", // Ensure it's above the modal content
          backgroundColor: "transparent", // Ensure the button is transparent
          ...iconButtonPosition
        }}
      >
        <CloseIcon fontSize="large" style={{ color: "white" }} />
      </IconButton>
      <img
        src={imageUrl}
        alt="Modal"
        style={{
          maxWidth: "80vw",
          maxHeight: "80vh",
          objectFit: "contain",
        }}
      />
    </Box>
  );
});

export default ModalContent;

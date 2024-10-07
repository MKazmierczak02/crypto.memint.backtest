import React from "react";
import { Box } from "@mui/material";

const BackgroundWrapper = ({ children }) => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        backgroundImage: "url(/static/media/bg3.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        color: "text.primary",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: -1,
        },
        zIndex: 1,
      }}
    >
      <Box sx={{ zIndex: 2, width: "100%" }}>{children}</Box>
    </Box>
  );
};

export default BackgroundWrapper;

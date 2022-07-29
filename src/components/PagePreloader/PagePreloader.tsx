import React, { FC } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const PagePreloader: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default PagePreloader;

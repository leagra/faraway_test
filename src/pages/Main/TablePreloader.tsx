import React, { FC } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const TablePreloader: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(117, 190, 218, 0.5)",
        position: "absolute",
        zIndex: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default TablePreloader;

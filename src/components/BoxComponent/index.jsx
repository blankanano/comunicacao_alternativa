import React from "react";
import { Box } from "@mui/material";

function BoxComponent({ children, ...rest }) {
  return <Box {...rest}>{children}</Box>;
}

export default BoxComponent;

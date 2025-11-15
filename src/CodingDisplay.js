import React from "react";
import { Stack, Box } from "@mui/material";
import EncodeText from "./EncodeText";
import CodingTable from "./CodingTable";

function CodingDisplay() {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        margin: "7px",
      }}
    >
      <Box> <EncodeText /> </Box>
      <Box> <CodingTable /> </Box>
    </Stack>
  )
}

export default CodingDisplay;
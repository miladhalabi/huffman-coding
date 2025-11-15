import React from "react";
import { Stack, Box } from "@mui/material";
import EncodeText from "./EncodeText";
import InputText from "./InputText";
import BinaryCode from "./BinaryCode";
import HuffmanCoding from "./HuffmanCoding";

function TextBoxes() {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        margin: "7px",
      }}
    >
      <Box> <EncodeText /> </Box>
      <Box> <InputText /> </Box>
      <Box> <BinaryCode codingName="Binary Coding" /> </Box>
      <Box> <HuffmanCoding codingName="Huffman Coding" /> </Box>
    </Stack>
  )
}

export default TextBoxes;
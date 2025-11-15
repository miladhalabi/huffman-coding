import React, { useContext } from "react";
import { Typography, TextField } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import "./EncodeText.css";

function EncodeText() {
  const { setText } = useContext(EncodeTextContext);

  function enterText(e) {
    const newText = e.target.value.split("");
    setText(newText);
  }

  return (
    <React.Fragment>
      <Typography
        variant="body2"
      >
        Encode Text: 
      </Typography>
      <TextField
        id="encode-text"
        placeholder="Enter text to encode!"
        onChange={enterText}
        fullWidth
        multiline
        rows={4}
      />
    </React.Fragment>
  );
}

export default EncodeText;

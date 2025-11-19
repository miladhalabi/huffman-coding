import React from "react";
import { Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./ContactInfo.css";

function ContactInfo() {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Typography variant="subtitle1">
        <a
          id="github-link"
          href="https://github.com/miladhalabi/huffman-coding"
        >
          Source Code <GitHubIcon fontSize="small" />
        </a>
      </Typography>
    </Stack>
  );
}

export default ContactInfo;

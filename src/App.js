import React from "react";
import { Grid, ThemeProvider, createTheme, Paper, Box } from "@mui/material";

import AppTitle from "./AppTitle";
import TextBoxes from "./TextBoxes";
import HuffmanCodeTree from "./HuffmanCodeTree";
import ContactInfo from "./ContactInfo";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ backgroundColor: '#212121', padding: '20px', minHeight: '100vh' }}>
        <Grid
          container
          direction="row"
          spacing={3}
          wrap="wrap"
        >
          {/* Top: App Title */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: '20px' }}>
              <AppTitle/>
            </Paper>
          </Grid>
          {/* Middle: Textboxes (on the left) and HuffmanTree Visualizer (on the right) */}
          <Grid item xs={5}>
            <Paper elevation={3} sx={{ padding: '20px' }}>
              <TextBoxes/>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper elevation={3} sx={{ padding: '20px', height: '100%' }} id="huffman-code-tree">
              <HuffmanCodeTree />
            </Paper>
          </Grid>
          {/* Bottom: Source Code / Contact Info */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: '20px' }}>
              <ContactInfo/>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;

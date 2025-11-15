import React, { useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { EncodeTextContext } from './EncodeTextContext';

function CodingTable() {
  const { tableData } = useContext(EncodeTextContext);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ padding: '16px' }}>
        Coding Details
      </Typography>
      {tableData.length === 0 ? (
        <Box sx={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant="body1">
            Enter text above to see coding details.
          </Typography>
        </Box>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Character</TableCell>
              <TableCell align="right">Frequency</TableCell>
              <TableCell align="right">Binary Code</TableCell>
              <TableCell align="right">Huffman Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.char}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.char}
                </TableCell>
                <TableCell align="right">{row.frequency}</TableCell>
                <TableCell align="right">{row.binary}</TableCell>
                <TableCell align="right">{row.huffman}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default CodingTable;
// frontend/src/components/MUITextBox.js
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MUITextBox() {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'row', // Stack TextFields vertically
        gap: 2, // Add spacing between TextFields (2 * 8px = 16px)
        '& > :not(style)': { width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Project Name" variant="outlined" />
      <TextField id="filled-basic" label="Company Name" variant="filled" />
      <TextField id="standard-basic" label="Borrower" variant="standard" />
    </Box>
  );
}
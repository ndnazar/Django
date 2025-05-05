import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 0, width: '25ch' }, // Add margin between fields
        display: 'flex',
        flexDirection: 'row', // Stack fields vertically
        gap: 2, // Add spacing between fields (2 * 8px = 16px)
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-multiline-flexible"
        label="Enter brief company description"
        multiline
        variant="filled"
      />
      <TextField
        id="filled-multiline-flexible"
        label="Products and Services"
        multiline
        variant="filled"
      />
    </Box>
  );
}
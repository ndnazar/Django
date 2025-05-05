import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const options = [
  {
    value: 'LBO',
    label: 'LBO',
  },
  {
    value: 'Recap',
    label: 'Recap',
  },
  {
    value: 'Refinance',
    label: 'Refinance',
  },
  {
    value: 'Add-on / Merger',
    label: 'Add-on / Merger',
  },
];

export default function TransactionTypeDropdown({ value, onChange }) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 0, width: '25ch' },
        display: 'flex',
        justifyContent: 'flex-start', // Align to the left
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="Transaction-Type"
          select
          label="Transaction Type"
          value={value} // Bind the value prop
          onChange={(event) => onChange(event.target.value)} // Call onChange with the selected value
          helperText="Please select a transaction type"
          variant="filled"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
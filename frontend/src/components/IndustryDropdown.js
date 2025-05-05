import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const options = [
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Banking', label: 'Banking' },
  { value: 'Basic Industry', label: 'Basic Industry' },
  { value: 'Capital Goods', label: 'Capital Goods' },
  { value: 'Consumer Goods', label: 'Consumer Goods' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Financial Services', label: 'Financial Services' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Leisure', label: 'Leisure' },
  { value: 'Media', label: 'Media' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Services', label: 'Services' },
  { value: 'Technology & Electronics', label: 'Technology & Electronics' },
  { value: 'Telecommunications', label: 'Telecommunications' },
  { value: 'Transportations', label: 'Transportations' },
  { value: 'Utility', label: 'Utility' },
];

export default function IndustryDropdown({ value, onChange }) {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 0, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="Industry"
          select
          label="Industry"
          value={value} // Bind the value prop
          onChange={(event) => onChange(event.target.value)} // Call onChange with the selected value
          helperText="Please select an industry"
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
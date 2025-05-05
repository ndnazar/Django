import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const industryOptions = [
  { value: 'Pre-Screen', label: 'Pre-Screen' },
  { value: 'Pass', label: 'Pass' },
  { value: 'Underwriting', label: 'Underwriting' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Closed', label: 'Closed' },
];

export default function DealStageDropdown({ value, onChange }) {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 0, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="deal-stage"
          select
          label="Deal Stage"
          value={value} // Bind the value prop
          onChange={(e) => onChange(e.target.value)} // Call onChange with the selected value
          helperText="Please select deal stage"
          variant="filled"
        >
          {industryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div className="vertical-ribbon">
          {industryOptions.map((option) => (
            <div
              key={option.value}
              className={`ribbon-item ${
                value === option.value ? 'active' : ''
              } ${option.value === 'Pass' ? 'red' : 'green'}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}
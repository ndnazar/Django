// frontend/src/components/ProjectedClosingDate.js
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

export default function ProjectedClosingDate({ value, onChange }) {
  const handleDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = newDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      onChange(formattedDate); // Pass formatted date to parent
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Projected Closing Date"
        value={value ? new Date(value) : null} // Convert value to Date object
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        disablePast // Disable past dates
      />
    </LocalizationProvider>
  );
}
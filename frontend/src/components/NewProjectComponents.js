import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const commonStyles = {
  width: "200px",
  fontSize: "14px", // Add font size
  height: "auto",
};

// CompanyDescription Component
export const CompanyDescription = ({ value, onChange }) => (
  <TextField
    id="company-description"
    label="Enter brief company description"
    multiline
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="filled"
    sx={{
      ...commonStyles,
      "& .MuiInputLabel-root": {
        fontSize: commonStyles.fontSize, // Set label font size
      },
      "& .MuiInputBase-input": {
        fontSize: commonStyles.fontSize, // Set input value font size
      },
    }}
  />
);

// ProductsAndServices Component
export const ProductsAndServices = ({ value, onChange }) => (
  <TextField
    id="products-and-services"
    label="Products and Services"
    multiline
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="filled"
    sx={{
      ...commonStyles,
      "& .MuiInputLabel-root": {
        fontSize: commonStyles.fontSize, // Set label font size
      },
      "& .MuiInputBase-input": {
        fontSize: commonStyles.fontSize, // Set input value font size
      },
    }}
  />
);

// ProjectID Component
export const ProjectID = ({ value, onChange }) => {
  return (
    <div id="react-project-ID-container">
      <input
        type="text"
        value={value} // Controlled by parent
        onChange={(e) => onChange(e.target.value)} // Update parent state on input change
        placeholder="Project ID"
      />
    </div>
  );
};

// TransactionTypeDropdown Component
export const TransactionTypeDropdown = ({ value, onChange }) => {
  const options = [
    { value: "LBO", label: "LBO" },
    { value: "Recap", label: "Recap" },
    { value: "Refinance", label: "Refinance" },
    { value: "Add-on / Merger", label: "Add-on / Merger" },
  ];

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        id="transaction-type"
        select
        label="Transaction Type"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        helperText="Please select a transaction type"
        variant="filled"
        sx={{
          ...commonStyles,
          "& .MuiInputLabel-root": {
            fontSize: commonStyles.fontSize, // Set label font size
          },
          "& .MuiInputBase-input": {
            fontSize: commonStyles.fontSize, // Set input value font size
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

// IndustryDropdown Component
export const IndustryDropdown = ({ value, onChange }) => {
  const options = [
    { value: "Automotive", label: "Automotive" },
    { value: "Banking", label: "Banking" },
    { value: "Basic Industry", label: "Basic Industry" },
    { value: "Capital Goods", label: "Capital Goods" },
    { value: "Consumer Goods", label: "Consumer Goods" },
    { value: "Energy", label: "Energy" },
    { value: "Financial Services", label: "Financial Services" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Insurance", label: "Insurance" },
    { value: "Leisure", label: "Leisure" },
    { value: "Media", label: "Media" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Retail", label: "Retail" },
    { value: "Services", label: "Services" },
    { value: "Technology & Electronics", label: "Technology & Electronics" },
    { value: "Telecommunications", label: "Telecommunications" },
    { value: "Transportations", label: "Transportations" },
    { value: "Utility", label: "Utility" },
  ];

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        id="industry"
        select
        label="Industry"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        helperText="Please select an industry"
        variant="filled"
        sx={{
          ...commonStyles,
          "& .MuiInputLabel-root": {
            fontSize: commonStyles.fontSize, // Set label font size
          },
          "& .MuiInputBase-input": {
            fontSize: commonStyles.fontSize, // Set input value font size
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

// DealStageDropdown Component
export const DealStageDropdown = ({ value, onChange }) => {
  const options = [
    { value: "Pre-Screen", label: "Pre-Screen" },
    { value: "Underwriting", label: "Underwriting" },
    { value: "Approved", label: "Approved" },
    { value: "Closed", label: "Closed" },
    { value: "Passed", label: "Passed" },
  ];

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        id="deal-stage"
        select
        label="Deal Stage"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        helperText="Please select a deal stage"
        variant="filled"
        sx={{
          ...commonStyles,
          "& .MuiInputLabel-root": {
            fontSize: commonStyles.fontSize, // Set label font size
          },
          "& .MuiInputBase-input": {
            fontSize: commonStyles.fontSize, // Set input value font size
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

// ProjectedClosingDate Component
export const ProjectedClosingDate = ({ value, onChange }) => {
  const handleDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = newDate.toISOString().split("T")[0];
      onChange(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Projected Closing Date"
        sx={{
          ...commonStyles,
          "& .MuiInputLabel-root": {
            fontSize: commonStyles.fontSize, // Set label font size
          },
          "& .MuiInputBase-input": {
            fontSize: commonStyles.fontSize, // Set input value font size
          },
        }}
        value={value ? new Date(value) : null}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField {...params} variant="filled" />
        )}
        disablePast
      />
    </LocalizationProvider>
  );
};

// ProjectName Component
export const ProjectName = ({ value, onChange }) => (
  <TextField
    id="project-name"
    label="Project Name"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="filled"
    sx={{
      ...commonStyles,
      "& .MuiInputLabel-root": {
        fontSize: commonStyles.fontSize, // Set label font size
      },
      "& .MuiInputBase-input": {
        fontSize: commonStyles.fontSize, // Set input value font size
      },
    }}
  />
);

// CompanyName Component
export const CompanyName = ({ value, onChange }) => (
  <TextField
    id="company-name"
    label="Company Name"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="filled"
    sx={{
      ...commonStyles,
      "& .MuiInputLabel-root": {
        fontSize: commonStyles.fontSize, // Set label font size
      },
      "& .MuiInputBase-input": {
        fontSize: commonStyles.fontSize, // Set input value font size
      },
    }}
  />
);

// Borrower Component
export const Borrower = ({ value, onChange }) => (
  <TextField
    id="borrower"
    label="Borrower"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="filled"
    sx={{
      ...commonStyles,
      "& .MuiInputLabel-root": {
        fontSize: commonStyles.fontSize, // Set label font size
      },
      "& .MuiInputBase-input": {
        fontSize: commonStyles.fontSize, // Set input value font size
      },
    }}
  />
);

// AssetManager Component
export const AssetManager = ({ value, onChange }) => (
  <TextField
    id="asset-manager"
    label="Asset Manager"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="filled"
    sx={{
      ...commonStyles,
      "& .MuiInputLabel-root": {
        fontSize: commonStyles.fontSize, // Set label font size
      },
      "& .MuiInputBase-input": {
        fontSize: commonStyles.fontSize, // Set input value font size
      },
    }}
  />
);

// FYE Component
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const FYE = ({ value, onChange }) => (
  <Box component="form" noValidate autoComplete="off">
    <TextField
      id="fye"
      select
      label="Fiscal Year-End"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      helperText="Please select FYE"
      variant="filled"
      sx={{
        ...commonStyles,
        "& .MuiInputLabel-root": {
          fontSize: commonStyles.fontSize, // Set label font size
        },
        "& .MuiInputBase-input": {
          fontSize: commonStyles.fontSize, // Set input value font size
        },
      }}
    >
      {months.map((month) => (
        <MenuItem key={month} value={month}>
          {month}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

// Commitment Component
export const Commitment = () => {
  const [amount, setAmount] = React.useState("");

  const handleAmountChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers and decimals
    setAmount(inputValue);
  };

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

  return (
    <Box sx={commonStyles}>
      <TextField
        id="commitment-amount"
        label="Proposed Commitment Amount"
        value={formattedAmount}
        onChange={handleAmountChange}
        variant="filled"
        sx={{
          ...commonStyles,
          "& .MuiInputLabel-root": {
            fontSize: commonStyles.fontSize, // Set label font size
          },
          "& .MuiInputBase-input": {
            fontSize: commonStyles.fontSize, // Set input value font size
          },
        }}
      />
    </Box>
  );
};

// TTM Component
export const TTM = ({ value, onChange }) => {
  const handleDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = newDate.toISOString().split("T")[0];
      onChange(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="TTM"
        sx={{
          ...commonStyles,
          "& .MuiInputLabel-root": {
            fontSize: commonStyles.fontSize, // Set label font size
          },
          "& .MuiInputBase-input": {
            fontSize: commonStyles.fontSize, // Set input value font size
          },
        }}
        value={value ? new Date(value) : null}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField {...params} variant="filled" />
        )}
        disablePast
      />
    </LocalizationProvider>
  );
};
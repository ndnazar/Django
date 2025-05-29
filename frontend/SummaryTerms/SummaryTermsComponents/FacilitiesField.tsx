import * as React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Checkbox } from './UIComponents/checkbox';

interface FacilityData {
  type: string;
  amount: string;
  currency: string;
  spread: string;
  term?: string;
}

interface FacilitiesFieldProps {
  facilities: FacilityData[];
  onFacilityTypeToggle: (facilityType: string, checked: boolean) => void;
  onFacilityAmountChange: (facilityType: string, amount: string) => void;
  onFacilityCurrencyChange: (facilityType: string, currency: string) => void;
  onFacilitySpreadChange: (facilityType: string, spread: string) => void;
  onFacilityTermChange: (facilityType: string, term: string) => void;
  onFieldValueChange: (fieldId: string, value: any) => void;
}

const FacilitiesField: React.FC<FacilitiesFieldProps> = ({
  facilities,
  onFacilityTypeToggle,
  onFacilityAmountChange,
  onFacilityCurrencyChange,
  onFacilitySpreadChange,
  onFacilityTermChange,
  onFieldValueChange
}) => {
  const facilityGrid = [
    ['Term Loan A', 'Term Loan B'],
    ['Revolver', 'Delayed Draw Term Loan']
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  const termOptions = ['1 year', '2 years', '3 years', '5 years', '7 years', '10 years'];

  const formatCurrency = (value: string, currency: string = 'USD') => {
    if (!value) return '';
    const numValue = parseFloat(value.replace(/[,$€£A]/g, ''));
    if (isNaN(numValue)) return value;

    const symbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$' };
    const symbol = symbols[currency as keyof typeof symbols] || '$';

    return `${symbol}${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue)}`;
  };

  const calculateTotalFacilitySize = () => {
    const totalBycurrency = facilities.reduce((acc, facility) => {
      if (facility.amount) {
        const numValue = parseFloat(facility.amount.replace(/[,$€£A]/g, ''));
        if (!isNaN(numValue)) {
          acc[facility.currency] = (acc[facility.currency] || 0) + numValue;
        }
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(totalBycurrency).map(([currency, total]: [string, number]) => {
      const symbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$' };
      const symbol = symbols[currency as keyof typeof symbols] || '$';
      return `${symbol}${new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total)}`;
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ p: 0.75, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#fafafa', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', alignItems: 'flex-start' }}>
          {facilityGrid.map((row, rowIndex) => (
            <Box key={rowIndex} sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'flex-start' }}>
              {row.map((facilityType) => {
                const isSelected = facilities.some(f => f.type === facilityType);
                const facilityData = facilities.find(f => f.type === facilityType);

                const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  // Allow only numbers and decimal points
                  if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
                    onFacilityAmountChange(facilityType, value);
                  }
                };

                const handleAmountBlur = (e: React.FocusEvent<HTMLInputElement>) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    const formattedAmount = formatCurrency(value.toString(), facilityData?.currency);
                    onFacilityAmountChange(facilityType, formattedAmount);
                  }
                };

                return (
                  <Box key={facilityType} sx={{
                    p: 0.6,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    bgcolor: 'white',
                    flex: 1,
                    minWidth: '200px',
                    maxWidth: '320px'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: isSelected ? '15px' : 0 }}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => onFacilityTypeToggle(facilityType, checked as boolean)}
                      />
                      <Box sx={{ ml: 0.4, fontWeight: 'medium', fontSize: '14px', lineHeight: 1.2 }}>
                        {facilityType}
                      </Box>
                    </Box>
                    {isSelected && (
                      <Box sx={{ ml: 1.2 }}>
                        {/* Currency and Amount side-by-side with auto height */}
                        <Box sx={{ display: 'flex', gap: 0.2, mb: '15px' }}>
                          <FormControl size="small" variant="filled" sx={{ minWidth: 40 }}>
                            <InputLabel sx={{ fontSize: '14px' }}>Currency</InputLabel>
                            <Select
                              value={facilityData?.currency || 'USD'}
                              onChange={(e) => onFacilityCurrencyChange(facilityType, e.target.value)}
                              label="Currency"
                              sx={{
                                fontSize: '14px'
                              }}
                            >
                              {currencies.map((currency) => (
                                <MenuItem key={currency} value={currency} sx={{ fontSize: '14px' }}>
                                  {currency}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            id="Amount"
                            label="Amount"
                            value={facilityData?.amount || ''}
                            onChange={handleAmountChange}
                            variant="filled"
                            size="small"
                            sx={{
                              width: 128,
                              '& .MuiInputBase-input': { fontSize: '14px' },
                              '& .MuiInputLabel-root': { fontSize: '14px' }
                            }}
                            type="text"
                            inputProps={{
                              pattern: '[0-9]*\\.?[0-9]{0,2}',
                              inputMode: 'decimal'
                            }}
                            onBlur={handleAmountBlur}
                          />
                        </Box>

                        {/* Term and Spread % side-by-side with auto height */}
                        <Box sx={{ display: 'flex', gap: 0.2 }}>
                          <FormControl size="small" variant="filled" sx={{ flex: 1 }}>
                            <InputLabel sx={{ fontSize: '14px' }}>Term</InputLabel>
                            <Select
                              value={facilityData?.term || ''}
                              onChange={(e) => onFacilityTermChange(facilityType, e.target.value)}
                              label="Term"
                              sx={{
                                fontSize: '14px'
                              }}
                            >
                              {termOptions.map((term) => (
                                <MenuItem key={term} value={term} sx={{ fontSize: '14px' }}>
                                  {term}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <TextField
                            label="Spread %"
                            placeholder="e.g., 3.500"
                            value={facilityData?.spread || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow numbers with up to 3 decimal places
                              if (/^\d*\.?\d{0,3}$/.test(value) || value === '') {
                                onFacilitySpreadChange(facilityType, value);
                              }
                            }}
                            variant="filled"
                            size="small"
                            sx={{
                              flex: 1,
                              '& .MuiInputBase-input': { fontSize: '14px' },
                              '& .MuiInputLabel-root': { fontSize: '14px' }
                            }}
                            type="text"
                            inputProps={{
                              pattern: '[0-9]*\\.?[0-9]{0,3}',
                              inputMode: 'decimal'
                            }}
                            onBlur={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                onFacilitySpreadChange(facilityType, value.toFixed(3));
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Total Facility Size Display */}
      {facilities.length > 0 && (
        <Box sx={{ mt: 2, p: 1.5, border: '1px solid #d1d5db', borderRadius: 1, bgcolor: '#f9fafb' }}>
          <Box sx={{ fontWeight: 'semibold', fontSize: '14px', color: '#374151', mb: 0.5 }}>
            Total Facility Size:
          </Box>
          <Box sx={{ fontSize: '14px', color: '#6b7280' }}>
            {calculateTotalFacilitySize().join(' + ') || 'No amounts entered'}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FacilitiesField;
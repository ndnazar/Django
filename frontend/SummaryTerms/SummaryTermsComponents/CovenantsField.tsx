
import * as React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Checkbox } from './UIComponents/checkbox';

interface CovenantData {
  type: string;
  value: string;
  frequency: string;
}

interface CovenantsFieldProps {
  covenants: CovenantData[];
  onCovenantTypeToggle: (covenantType: string, checked: boolean) => void;
  onCovenantValueChange: (covenantType: string, value: string) => void;
  onCovenantFrequencyChange: (covenantType: string, frequency: string) => void;
}

const CovenantsField: React.FC<CovenantsFieldProps> = ({
  covenants,
  onCovenantTypeToggle,
  onCovenantValueChange,
  onCovenantFrequencyChange
}) => {
  const covenantGrid = [
    ['Fixed Charge Coverage', 'Senior Leverage'],
    ['Total Leverage', 'Total Net Leverage'],
    ['First Lien Net Leverage', 'Other'],
    ['Minimum EBITDA', 'Debt Service Coverage'],
    ['Interest Coverage', 'Cash Collateral'],
    ['CapEx Limit', 'Dividend Restriction']
  ];

  const covenantFrequencies = ['Quarterly', 'Annually', 'Monthly'];

  return (
    <Box sx={{ p: 0.75, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#fafafa', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', alignItems: 'flex-start' }}>
        {covenantGrid.map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-start' }}>
            {row.map((covenantType) => {
              const isSelected = covenants.some(c => c.type === covenantType);
              const covenantData = covenants.find(c => c.type === covenantType);

              return (
                <Box key={covenantType} sx={{
                  p: 0.6,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  bgcolor: 'white',
                  flex: 1,
                  minWidth: '200px',
                  maxWidth: '300px'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: isSelected ? 0.4 : 0 }}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => onCovenantTypeToggle(covenantType, checked as boolean)}
                    />
                    <Box sx={{ ml: 0.4, fontWeight: 'medium', fontSize: '14px', lineHeight: 1.2 }}>
                      {covenantType}
                    </Box>
                  </Box>
                  {isSelected && (
                    <Box sx={{ ml: 1.2 }}>
                      <Box sx={{ display: 'flex', gap: 0.2, mb: 0.2 }}>
                        <TextField
                          label="Threshold"
                          placeholder="e.g., 1.25x"
                          value={covenantData?.value || ''}
                          onChange={(e) => onCovenantValueChange(covenantType, e.target.value)}
                          variant="filled"
                          size="small"
                          sx={{
                            flex: 1,
                            '& .MuiInputBase-input': { fontSize: '14px', padding: '6px 8px' },
                            '& .MuiInputLabel-root': { fontSize: '14px' }
                          }}
                        />
                        <FormControl size="small" variant="filled" sx={{ minWidth: 60 }}>
                          <InputLabel sx={{ fontSize: '14px' }}>Frequency</InputLabel>
                          <Select
                            value={covenantData?.frequency || 'Quarterly'}
                            onChange={(e) => onCovenantFrequencyChange(covenantType, e.target.value)}
                            label="Frequency"
                            sx={{ fontSize: '14px' }}
                          >
                            {covenantFrequencies.map((frequency) => (
                              <MenuItem key={frequency} value={frequency} sx={{ fontSize: '14px' }}>
                                {frequency}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
  );
};

export default CovenantsField;
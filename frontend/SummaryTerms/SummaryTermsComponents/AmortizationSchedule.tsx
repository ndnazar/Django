
import * as React from 'react';
import { TextField } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './UIComponents/table';
import { Card, CardContent, CardHeader, CardTitle } from './UIComponents/card';
import { Badge } from './UIComponents/badge';

interface FacilityData {
  type: string;
  amount: string;
  currency: string;
  spread: string;
}

interface FacilitySchedule {
  facilityType: string;
  schedule: number[];
}

interface AmortizationScheduleProps {
  termYears: number;
  facilities: FacilityData[];
  facilitySchedules: FacilitySchedule[];
  onChange: (facilitySchedules: FacilitySchedule[]) => void;
}

const AmortizationSchedule: React.FC<AmortizationScheduleProps> = ({
  termYears,
  facilities,
  facilitySchedules,
  onChange
}) => {
  const handlePercentageChange = (facilityType: string, yearIndex: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    const clampedValue = Math.min(100, Math.max(0, numValue));

    const updatedSchedules = facilitySchedules.map(fs => {
      if (fs.facilityType === facilityType) {
        const newSchedule = [...fs.schedule];
        newSchedule[yearIndex] = clampedValue;
        return { ...fs, schedule: newSchedule };
      }
      return fs;
    });

    onChange(updatedSchedules);
  };

  const getFacilitySchedule = (facilityType: string): number[] => {
    const facilitySchedule = facilitySchedules.find(fs => fs.facilityType === facilityType);
    return facilitySchedule?.schedule || Array(termYears).fill(100 / termYears);
  };

  const getTotalPercentage = (facilityType: string): number => {
    const schedule = getFacilitySchedule(facilityType);
    return schedule.reduce((sum, pct) => sum + pct, 0);
  };

  const isValidSchedule = (facilityType: string): boolean => {
    const total = getTotalPercentage(facilityType);
    return Math.abs(total - 100) < 0.01;
  };

  if (termYears === 0 || facilities.length === 0) {
    return (
      <div className="text-sm text-gray-500 p-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <div className="text-center">
          <div className="text-gray-400 mb-2">📊</div>
          <div>Please select a loan term and add facilities to configure amortization schedules.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Amortization Schedules</h3>
        <p className="text-sm text-gray-600">Configure repayment percentages for each year of the loan term.</p>
      </div>

      {facilities.map((facility) => {
        const isValid = isValidSchedule(facility.type);
        const total = getTotalPercentage(facility.type);

        return (
          <Card key={facility.type} className="w-full border border-gray-200 shadow-sm">
            <CardHeader className="pb-4 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-gray-900 mb-1">
                    {facility.type}
                  </CardTitle>
                  <div className="text-sm text-gray-600">
                    {facility.currency} {facility.amount ? parseFloat(facility.amount).toLocaleString() : '0'}
                    {facility.spread && ` • ${facility.spread}% spread`}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">
                      Total: {total.toFixed(1)}%
                    </div>
                    <Badge
                      variant={isValid ? "default" : "destructive"}
                      className={`text-xs ${isValid ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}
                    >
                      {isValid ? '✓ Valid' : '⚠ Must total 100%'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/30">
                    <TableHead className="text-center font-semibold text-gray-700 py-3">Year</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700 py-3">Amortization %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: termYears }, (_, index) => {
                    const schedule = getFacilitySchedule(facility.type);
                    return (
                      <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                        <TableCell className="text-center font-medium py-4 text-gray-700">
                          Year {index + 1}
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <div className="flex justify-center">
                            <TextField
                              type="number"
                              value={schedule[index] || 0}
                              onChange={(e) => handlePercentageChange(facility.type, index, e.target.value)}
                              variant="outlined"
                              size="small"
                              inputProps={{
                                min: 0,
                                max: 100,
                                step: 0.1,
                                style: {
                                  textAlign: 'center',
                                  fontSize: '0.875rem'
                                }
                              }}
                              className="w-20"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: '#e5e7eb',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#9ca3af',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#3b82f6',
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  padding: '8px 12px',
                                }
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AmortizationSchedule;
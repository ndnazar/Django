import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Card } from './UIComponents/card';
import { Input } from './UIComponents/input';
import { Label } from './UIComponents/label';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ArrangementFeeData } from '../Types/FormTypes';

interface FacilityData {
  type: string;
  amount: string;
  currency: string;
  spread: string;
  term?: string;
}

interface FacilityUpfrontFee {
  facilityType: string;
  bps: string;
  calculatedAmount: string;
}

interface FeesData {
  arrangementFee: ArrangementFeeData;
  facilityFees: FacilityUpfrontFee[];
}

interface UpfrontFeesFieldProps {
  value?: FeesData;
  facilities: FacilityData[];
  onChange: (value: FeesData) => void;
}

const UpfrontFeesField: React.FC<UpfrontFeesFieldProps> = ({
  value,
  facilities,
  onChange
}) => {
  const [arrangementFee, setArrangementFee] = useState<ArrangementFeeData>(
    value?.arrangementFee || { hasArrangementFee: false, amount: '', type: 'fixed' }
  );
  const [facilityFees, setFacilityFees] = useState<FacilityUpfrontFee[]>(
    value?.facilityFees || []
  );

  // Format dollar amount with proper decimals
  const formatDollarAmount = (amount: string) => {
    const numValue = parseFloat(amount.replace(/[,$]/g, '')) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  // Calculate fee amount based on bps and facility amount
  const calculateFeeAmount = (bpsValue: string, facilityAmount: string, currency: string) => {
    const bpsNum = parseFloat(bpsValue) || 0;
    const amount = parseFloat(facilityAmount.replace(/[,$]/g, '')) || 0;
    const feeAmount = (amount * bpsNum) / 10000; // bps to percentage conversion

    if (feeAmount <= 0) return '';

    const symbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$' };
    const symbol = symbols[currency as keyof typeof symbols] || '$';

    return `${symbol}${feeAmount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  // Calculate arrangement fee amount
  const calculateArrangementFeeAmount = () => {
    if (!arrangementFee.hasArrangementFee || !arrangementFee.amount) return 0;
    return parseFloat(arrangementFee.amount.replace(/[,$]/g, '')) || 0;
  };

  // Calculate total fees by currency
  const calculateTotalFees = () => {
    const totalByCurrency = facilityFees.reduce((acc, facilityFee) => {
      const facility = facilities.find(f => f.type === facilityFee.facilityType);
      if (facility && facilityFee.calculatedAmount) {
        const currency = facility.currency;
        const amount = parseFloat(facilityFee.calculatedAmount.replace(/[,$€£A]/g, '')) || 0;
        acc[currency] = (acc[currency] || 0) + amount;
      }
      return acc;
    }, {} as Record<string, number>);

    // Add arrangement fee (assume USD)
    const arrangementFeeAmount = calculateArrangementFeeAmount();
    if (arrangementFeeAmount > 0) {
      totalByCurrency['USD'] = (totalByCurrency['USD'] || 0) + arrangementFeeAmount;
    }

    return Object.entries(totalByCurrency).map(([currency, total]: [string, number]) => {
      const symbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$' };
      const symbol = symbols[currency as keyof typeof symbols] || '$';
      return `${symbol}${total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    });
  };

  // Memoized onChange callback to prevent infinite loops
  const handleDataChange = useCallback(() => {
    onChange({
      arrangementFee,
      facilityFees
    });
  }, [arrangementFee, facilityFees, onChange]);

  // Update facility fees when facilities change
  useEffect(() => {
    const updatedFees = facilities.map(facility => {
      const existingFee = facilityFees.find(ff => ff.facilityType === facility.type);
      const bps = existingFee?.bps || '';
      const calculatedAmount = calculateFeeAmount(bps, facility.amount, facility.currency);

      return {
        facilityType: facility.type,
        bps,
        calculatedAmount
      };
    });

    setFacilityFees(updatedFees);
  }, [facilities]);

  // Update parent component when data changes, but only if it actually changed
  useEffect(() => {
    const currentData = { arrangementFee, facilityFees };
    const hasChanged = JSON.stringify(currentData) !== JSON.stringify(value);

    if (hasChanged) {
      handleDataChange();
    }
  }, [arrangementFee, facilityFees, handleDataChange, value]);

  const handleArrangementFeeToggle = (hasArrangementFee: boolean) => {
    setArrangementFee(prev => ({
      ...prev,
      hasArrangementFee,
      amount: hasArrangementFee ? prev.amount : ''
    }));
  };

  const handleArrangementFeeAmountChange = (amount: string) => {
    setArrangementFee(prev => ({
      ...prev,
      amount
    }));
  };

  const handleArrangementFeeAmountBlur = (amount: string) => {
    const formatted = formatDollarAmount(amount);
    setArrangementFee(prev => ({
      ...prev,
      amount: formatted
    }));
  };

  const handleBpsChange = (facilityType: string, newBps: string) => {
    const facility = facilities.find(f => f.type === facilityType);
    if (!facility) return;

    const calculatedAmount = calculateFeeAmount(newBps, facility.amount, facility.currency);

    const updatedFees = facilityFees.map(ff =>
      ff.facilityType === facilityType
        ? { ...ff, bps: newBps, calculatedAmount }
        : ff
    );

    setFacilityFees(updatedFees);
  };

  // Organize facilities in a 2x2 grid format
  const facilityGrid = [];
  for (let i = 0; i < facilities.length; i += 2) {
    facilityGrid.push(facilities.slice(i, i + 2));
  }

  return (
    <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 w-full">
      {/* Arrangement Fee Section */}
      <div className="mb-4">
        <Card className="p-3 bg-white">
          <h4 className="text-standard font-medium text-gray-700 mb-3">Arrangement Fee</h4>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <FormControl variant="filled" size="small" sx={{ width: '80px' }}>
                <Select
                  value={arrangementFee.hasArrangementFee ? "yes" : "no"}
                  onChange={(e) => handleArrangementFeeToggle(e.target.value === "yes")}
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '14px' },
                    '& .MuiInputLabel-root': { fontSize: '14px' }
                  }}
                  displayEmpty
                >
                  <MenuItem value="no" sx={{ fontSize: '14px' }}>No</MenuItem>
                  <MenuItem value="yes" sx={{ fontSize: '14px' }}>Yes</MenuItem>
                </Select>
              </FormControl>
            </div>

            {arrangementFee.hasArrangementFee && (
              <div className="flex flex-col gap-1">
                <TextField
                  id="Amount"
                  label="Amount"
                  value={arrangementFee.amount}
                  onChange={(e) => handleArrangementFeeAmountChange(e.target.value)}
                  variant="filled"
                  size="small"
                  sx={{
                    width: '128px',
                    '& .MuiInputBase-input': { fontSize: '14px' },
                    '& .MuiInputLabel-root': { fontSize: '14px' }
                  }}
                  onBlur={(e) => handleArrangementFeeAmountBlur(e.target.value)}
                />
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Upfront Fees Section */}
      {facilities.length > 0 && (
        <div className="mb-4">
          <h4 className="text-standard font-medium text-gray-700 mb-3">Upfront Fees by Facility</h4>
          <div className="flex flex-col gap-4 w-full">
            {facilityGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-4 w-full">
                {row.map((facility) => {
                  const facilityFee = facilityFees.find(ff => ff.facilityType === facility.type);
                  const hasAmount = parseFloat(facility.amount.replace(/[,$]/g, '')) > 0;

                  return (
                    <Card key={facility.type} className="p-3 bg-white flex-1 min-w-0 max-w-80">
                      <div className="mb-2">
                        <h4 className="text-standard font-medium text-gray-700">
                          {facility.type}
                        </h4>
                      </div>

                      <div className="flex gap-2 items-end">
                        <div className="flex flex-col gap-1">
                          <Input
                            placeholder=""
                            value={facilityFee?.bps || ''}
                            onChange={(e) => handleBpsChange(facility.type, e.target.value)}
                            className="w-32 text-standard h-8"
                          />
                        </div>
                        <span className="text-standard text-gray-500 whitespace-nowrap pb-2">bps</span>
                      </div>

                      <div className="mt-2">
                        <p className={`text-standard text-right ${hasAmount ? 'text-gray-700' : 'text-orange-500'}`}>
                          {hasAmount
                            ? (facilityFee?.calculatedAmount || 'Enter bps to calculate')
                            : 'Enter facility amount first'
                          }
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {facilities.length === 0 && (
        <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 w-full">
          <p className="text-standard text-gray-500 text-center">
            Select facilities to configure upfront fees
          </p>
        </div>
      )}

      {/* Total Fees Display */}
      {(facilityFees.some(ff => ff.calculatedAmount) || (arrangementFee.hasArrangementFee && arrangementFee.amount)) && (
        <div className="mt-2 p-1.5 border border-gray-300 rounded bg-gray-50" style={{ borderColor: '#d1d5db', backgroundColor: '#f9fafb' }}>
          <div className="font-semibold text-standard text-gray-700 mb-0.5" style={{ color: '#374151' }}>
            Total Fees:
          </div>
          <div className="text-standard text-gray-600" style={{ color: '#6b7280' }}>
            {calculateTotalFees().join(' + ') || 'No fees calculated'}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpfrontFeesField;
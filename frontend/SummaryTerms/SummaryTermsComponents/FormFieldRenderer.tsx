import * as React from 'react';
import { Card, CardContent, CardHeader } from './UIComponents/card';
import { Textarea } from './UIComponents/textarea';
import { Input } from './UIComponents/input';
import { Label } from './UIComponents/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './UIComponents/select';
import { Checkbox } from './UIComponents/checkbox';
import { Calendar } from './UIComponents/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './UIComponents/popover';
import { Button } from './UIComponents/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import FacilitiesField from './FacilitiesField';
import CovenantsField from './CovenantsField';
import UpfrontFeesField from './UpfrontFeesField';

// Local type definitions to match Index.tsx usage
interface FieldData {
  id: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date' | 'facilities' | 'covenants' | 'upfront-fees' | 'borrowers';
  label: string;
  required?: boolean;
  value?: any;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  options?: string[];
}

interface FacilityData {
  type: string;
  amount: string;
  currency: string;
  spread: string;
  term?: string;
}

interface CovenantData {
  type: string;
  value: string;
  frequency: string;
}

interface BorrowersFieldValue {
  primaryBorrower: string;
  coBorrowers: string[];
}

interface FormFieldRendererProps {
  field: FieldData;
  facilities: FacilityData[];
  covenants: CovenantData[];
  onFieldValueChange: (fieldId: string, value: any) => void;
  onFacilityTypeToggle: (facilityType: string, checked: boolean) => void;
  onFacilityAmountChange: (facilityType: string, amount: string) => void;
  onFacilityCurrencyChange: (facilityType: string, currency: string) => void;
  onFacilitySpreadChange: (facilityType: string, spread: string) => void;
  onFacilityTermChange: (facilityType: string, term: string) => void;
  onCovenantTypeToggle: (covenantType: string, checked: boolean) => void;
  onCovenantValueChange: (covenantType: string, value: string) => void;
  onCovenantFrequencyChange: (covenantType: string, frequency: string) => void;
}

const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  facilities,
  covenants,
  onFieldValueChange,
  onFacilityTypeToggle,
  onFacilityAmountChange,
  onFacilityCurrencyChange,
  onFacilitySpreadChange,
  onFacilityTermChange,
  onCovenantTypeToggle,
  onCovenantValueChange,
  onCovenantFrequencyChange,
}) => {
  const borrowersValue = (field.value as BorrowersFieldValue) || { primaryBorrower: '', coBorrowers: [''] };

  const handleBorrowersChange = (fieldKey: string, value: string) => {
    const updatedBorrowers = { ...borrowersValue, [fieldKey]: value };
    onFieldValueChange(field.id, updatedBorrowers);
  };

  const handleCoBorrowerChange = (index: number, value: string) => {
    const updatedCoBorrowers = [...borrowersValue.coBorrowers];
    updatedCoBorrowers[index] = value;
    const updatedBorrowers = { ...borrowersValue, coBorrowers: updatedCoBorrowers };
    onFieldValueChange(field.id, updatedBorrowers);
  };

  const addCoBorrower = () => {
    const updatedCoBorrowers = [...borrowersValue.coBorrowers, ''];
    const updatedBorrowers = { ...borrowersValue, coBorrowers: updatedCoBorrowers };
    onFieldValueChange(field.id, updatedBorrowers);
  };

  const removeCoBorrower = (index: number) => {
    const updatedCoBorrowers = [...borrowersValue.coBorrowers];
    updatedCoBorrowers.splice(index, 1);
    const updatedBorrowers = { ...borrowersValue, coBorrowers: updatedCoBorrowers };
    onFieldValueChange(field.id, updatedBorrowers);
  };

  const renderFieldInput = () => {
    switch (field.type) {
      case 'borrowers':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="primary-borrower" className="text-standard font-medium text-gray-700">
                Primary Borrower
              </Label>
              <Input
                id="primary-borrower"
                value={borrowersValue.primaryBorrower}
                onChange={(e) => handleBorrowersChange('primaryBorrower', e.target.value)}
                placeholder="Enter primary borrower name"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-standard font-medium text-gray-700">
                Co-Borrowers (Optional)
              </Label>
              <div className="space-y-2 mt-1">
                {borrowersValue.coBorrowers.map((coBorrower, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={coBorrower}
                      onChange={(e) => handleCoBorrowerChange(index, e.target.value)}
                      placeholder={`Co-borrower ${index + 1}`}
                      className="flex-1"
                    />
                    {borrowersValue.coBorrowers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCoBorrower(index)}
                        className="px-3"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCoBorrower}
                  className="w-full"
                >
                  + Add Co-Borrower
                </Button>
              </div>
            </div>
          </div>
        );

      case 'facilities':
        return (
          <FacilitiesField
            facilities={facilities}
            onFacilityTypeToggle={onFacilityTypeToggle}
            onFacilityAmountChange={onFacilityAmountChange}
            onFacilityCurrencyChange={onFacilityCurrencyChange}
            onFacilitySpreadChange={onFacilitySpreadChange}
            onFacilityTermChange={onFacilityTermChange}
            onFieldValueChange={onFieldValueChange}
          />
        );

      case 'upfront-fees':
        return (
          <UpfrontFeesField
            value={field.value}
            facilities={facilities}
            onChange={(value) => onFieldValueChange(field.id, value)}
          />
        );

      case 'covenants':
        return (
          <CovenantsField
            covenants={covenants}
            onCovenantTypeToggle={onCovenantTypeToggle}
            onCovenantValueChange={onCovenantValueChange}
            onCovenantFrequencyChange={onCovenantFrequencyChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {field.icon && <field.icon className="h-5 w-5 text-gray-600" />}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </h3>
            {field.placeholder && (
              <p className="text-standard text-gray-600 mt-1">{field.placeholder}</p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {renderFieldInput()}
      </CardContent>
    </Card>
  );
};

export default FormFieldRenderer;
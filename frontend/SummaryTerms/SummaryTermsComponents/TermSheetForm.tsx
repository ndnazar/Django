import * as React from 'react';
import { useState, useCallback } from 'react';
import { User, Building2, Shield, DollarSign } from 'lucide-react';
import FormFieldRenderer from './FormFieldRenderer';
import AmortizationSchedule from './AmortizationSchedule';
import PDFGenerator from './PDFGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './UIComponents/card';
import { FacilityData, CovenantData, FacilitySchedule, FieldData } from '../Types/FormTypes';

interface TermSheetFormProps {
  onDataChange?: (data: any) => void;
  initialData?: any;
  showPDFGenerator?: boolean;
  className?: string;
}

const TermSheetForm: React.FC<TermSheetFormProps> = ({
  onDataChange,
  initialData,
  showPDFGenerator = true,
  className = ""
}) => {
  const [facilities, setFacilities] = useState<FacilityData[]>(initialData?.facilities || []);
  const [covenants, setCovenants] = useState<CovenantData[]>(initialData?.covenants || []);
  const [facilitySchedules, setFacilitySchedules] = useState<FacilitySchedule[]>(initialData?.facilitySchedules || []);
  const [fields, setFields] = useState<FieldData[]>(initialData?.fields || [
    {
      id: 'borrowers',
      type: 'borrowers',
      label: 'Borrower(s)',
      placeholder: 'Enter borrower details',
      required: true,
      value: { primaryBorrower: '', coBorrowers: [''] },
      icon: User,
    },
    {
      id: 'facilities',
      type: 'facilities',
      label: 'Facilities',
      placeholder: 'Select facility types and enter amounts',
      required: true,
      icon: Building2,
    },
    {
      id: 'upfront-fees',
      type: 'upfront-fees',
      label: 'Fees',
      placeholder: 'Configure arrangement fee and upfront fees',
      required: false,
      icon: DollarSign,
    },
    {
      id: 'covenants',
      type: 'covenants',
      label: 'Covenants',
      placeholder: 'Select covenant types and enter thresholds',
      required: true,
      icon: Shield,
    },
  ]);

  const getFormTitle = useCallback(() => {
    const borrowersField = fields.find(f => f.id === 'borrowers');
    const borrowerData = borrowersField?.value;
    if (!borrowerData) return 'Summary Terms';
    const primaryBorrower = borrowerData.primaryBorrower || '';
    const coBorrowers = borrowerData.coBorrowers?.filter((cb: string) => cb.trim() !== '') || [];
    if (primaryBorrower && coBorrowers.length > 0) {
      const coBorrowerText = coBorrowers.length === 1 ? coBorrowers[0] : `${coBorrowers.length} Co-Borrowers`;
      return `${primaryBorrower} & ${coBorrowerText} Summary Terms`;
    } else if (primaryBorrower) {
      return `${primaryBorrower} Summary Terms`;
    }
    return 'Summary Terms';
  }, [fields]);

  const handleDataChangeCallback = useCallback((updatedFields?: FieldData[], updatedFacilities?: FacilityData[], updatedCovenants?: CovenantData[], updatedSchedules?: FacilitySchedule[]) => {
    if (onDataChange) {
      onDataChange({
        fields: updatedFields || fields,
        facilities: updatedFacilities || facilities,
        covenants: updatedCovenants || covenants,
        facilitySchedules: updatedSchedules || facilitySchedules,
        formTitle: getFormTitle()
      });
    }
  }, [onDataChange, fields, facilities, covenants, facilitySchedules, getFormTitle]);

  const handleFieldValueChange = useCallback((fieldId: string, value: any) => {
    const updatedFields = fields.map(field =>
      field.id === fieldId ? { ...field, value } : field
    );
    setFields(updatedFields);
    handleDataChangeCallback(updatedFields);
  }, [fields, handleDataChangeCallback]);

  const handleFacilityTypeToggle = useCallback((facilityType: string, checked: boolean) => {
    let updatedFacilities;
    let updatedSchedules = facilitySchedules;
    if (checked) {
      updatedFacilities = [...facilities, {
        type: facilityType,
        amount: '',
        currency: 'USD',
        spread: '',
        term: ''
      }];
    } else {
      updatedFacilities = facilities.filter(f => f.type !== facilityType);
      updatedSchedules = facilitySchedules.filter(fs => fs.facilityType !== facilityType);
      setFacilitySchedules(updatedSchedules);
    }
    setFacilities(updatedFacilities);
    handleDataChangeCallback(fields, updatedFacilities, covenants, updatedSchedules);
  }, [facilities, facilitySchedules, fields, covenants, handleDataChangeCallback]);

  const handleFacilityAmountChange = useCallback((facilityType: string, amount: string) => {
    const updatedFacilities = facilities.map(f =>
      f.type === facilityType ? { ...f, amount } : f
    );
    setFacilities(updatedFacilities);
    handleDataChangeCallback(fields, updatedFacilities);
  }, [facilities, fields, handleDataChangeCallback]);

  const handleFacilityCurrencyChange = useCallback((facilityType: string, currency: string) => {
    const updatedFacilities = facilities.map(f =>
      f.type === facilityType ? { ...f, currency } : f
    );
    setFacilities(updatedFacilities);
    handleDataChangeCallback(fields, updatedFacilities);
  }, [facilities, fields, handleDataChangeCallback]);

  const handleFacilitySpreadChange = useCallback((facilityType: string, spread: string) => {
    const updatedFacilities = facilities.map(f =>
      f.type === facilityType ? { ...f, spread } : f
    );
    setFacilities(updatedFacilities);
    handleDataChangeCallback(fields, updatedFacilities);
  }, [facilities, fields, handleDataChangeCallback]);

  const handleFacilityTermChange = useCallback((facilityType: string, term: string) => {
    const updatedFacilities = facilities.map(f =>
      f.type === facilityType ? { ...f, term } : f
    );
    setFacilities(updatedFacilities);
    const termYears = parseInt(term.split(' ')[0]);
    const evenPercentage = 100 / termYears;
    let updatedSchedules = facilitySchedules.map(fs =>
      fs.facilityType === facilityType
        ? { facilityType, schedule: Array(termYears).fill(evenPercentage) }
        : fs
    );
    if (!facilitySchedules.find(fs => fs.facilityType === facilityType)) {
      updatedSchedules = [
        ...updatedSchedules,
        { facilityType, schedule: Array(termYears).fill(evenPercentage) }
      ];
    }
    setFacilitySchedules(updatedSchedules);
    handleDataChangeCallback(fields, updatedFacilities, covenants, updatedSchedules);
  }, [facilities, facilitySchedules, fields, covenants, handleDataChangeCallback]);

  const handleCovenantTypeToggle = useCallback((covenantType: string, checked: boolean) => {
    let updatedCovenants;
    if (checked) {
      updatedCovenants = [...covenants, { type: covenantType, value: '', frequency: 'Quarterly' }];
    } else {
      updatedCovenants = covenants.filter(c => c.type !== covenantType);
    }
    setCovenants(updatedCovenants);
    handleDataChangeCallback(fields, facilities, updatedCovenants);
  }, [covenants, fields, facilities, handleDataChangeCallback]);

  const handleCovenantValueChange = useCallback((covenantType: string, value: string) => {
    const updatedCovenants = covenants.map(c =>
      c.type === covenantType ? { ...c, value } : c
    );
    setCovenants(updatedCovenants);
    handleDataChangeCallback(fields, facilities, updatedCovenants);
  }, [covenants, fields, facilities, handleDataChangeCallback]);

  const handleCovenantFrequencyChange = useCallback((covenantType: string, frequency: string) => {
    const updatedCovenants = covenants.map(c =>
      c.type === covenantType ? { ...c, frequency } : c
    );
    setCovenants(updatedCovenants);
    handleDataChangeCallback(fields, facilities, updatedCovenants);
  }, [covenants, fields, facilities, handleDataChangeCallback]);

  const getTermYears = useCallback(() => {
    const termYears = facilities.map(f => {
      if (!f.term) return 0;
      return parseInt(f.term.split(' ')[0]);
    });
    return Math.max(...termYears, 0);
  }, [facilities]);

  const handleFacilitySchedulesChange = useCallback((updatedSchedules: FacilitySchedule[]) => {
    setFacilitySchedules(updatedSchedules);
    handleDataChangeCallback(fields, facilities, covenants, updatedSchedules);
  }, [fields, facilities, covenants, handleDataChangeCallback]);

  const shouldShowAmortizationSchedule = useCallback(() => {
    return facilities.some(f => f.term) && facilities.length > 0;
  }, [facilities]);

  return (
    <div id="terms-root" className={`min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 ${className}`}>
      <Card className="card shadow-sm border-0 bg-white/600 backdrop-blur-sm form-section" id="term-sheet-card">
        <CardHeader className="card-header border-b border-gray-100">
          <div className="header flex justify-between items-center">
            <div>
              <CardTitle className="card-title text-2xl font-bold text-gray-900 title" id="term-sheet-title">
                {getFormTitle()}
              </CardTitle>
              <CardDescription className="card-description text-gray-600">
                Complete all required fields to finalize your term sheet
              </CardDescription>
            </div>
            {showPDFGenerator && (
              <PDFGenerator fields={fields} formTitle={getFormTitle()} facilitySchedules={facilitySchedules} />
            )}
          </div>
        </CardHeader>
        <CardContent className="card-content p-6">
          <div className="grid grid-cols-1 gap-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="field-group form-group"
                id={`field-group-${field.id}`}
              >
                <FormFieldRenderer
                  field={field}
                  facilities={facilities}
                  covenants={covenants}
                  onFieldValueChange={handleFieldValueChange}
                  onFacilityTypeToggle={handleFacilityTypeToggle}
                  onFacilityAmountChange={handleFacilityAmountChange}
                  onFacilityCurrencyChange={handleFacilityCurrencyChange}
                  onFacilitySpreadChange={handleFacilitySpreadChange}
                  onFacilityTermChange={handleFacilityTermChange}
                  onCovenantTypeToggle={handleCovenantTypeToggle}
                  onCovenantValueChange={handleCovenantValueChange}
                  onCovenantFrequencyChange={handleCovenantFrequencyChange}
                />
              </div>
            ))}
            {shouldShowAmortizationSchedule() && (
              <div className="form-group" id="amortization-schedule-section">
                <AmortizationSchedule
                  termYears={getTermYears()}
                  facilities={facilities}
                  facilitySchedules={facilitySchedules}
                  onChange={handleFacilitySchedulesChange}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermSheetForm;


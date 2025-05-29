
import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../SummaryTermsComponents/UIComponents/card';
import PDFGenerator from '../SummaryTermsComponents/PDFGenerator';
import {
  User,
  Building2,
  Shield,
  DollarSign,
} from 'lucide-react';
import AmortizationSchedule from '../SummaryTermsComponents/AmortizationSchedule';
import FormFieldRenderer from '../SummaryTermsComponents/FormFieldRenderer';
import { FacilityData, CovenantData, FacilitySchedule, FieldData } from '../Types/FormTypes';

const Index = () => {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [covenants, setCovenants] = useState<CovenantData[]>([]);
  const [facilitySchedules, setFacilitySchedules] = useState<FacilitySchedule[]>([]);

  const [fields, setFields] = useState<FieldData[]>([
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

  // Get dynamic form title based on borrower name
  const getFormTitle = () => {
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
  };

  const handleFieldValueChange = (fieldId: string, value: any) => {
    setFields(fields.map(field =>
      field.id === fieldId ? { ...field, value } : field
    ));
  };

  const handleFacilityTypeToggle = (facilityType: string, checked: boolean) => {
    if (checked) {
      setFacilities([...facilities, {
        type: facilityType,
        amount: '',
        currency: 'USD',
        spread: '',
        term: ''
      }]);
    } else {
      setFacilities(facilities.filter(f => f.type !== facilityType));

      // Remove amortization schedule for this facility
      setFacilitySchedules(prev => prev.filter(fs => fs.facilityType !== facilityType));
    }
  };

  const handleFacilityAmountChange = (facilityType: string, amount: string) => {
    setFacilities(facilities.map(f =>
      f.type === facilityType ? { ...f, amount } : f
    ));
  };

  const handleFacilityCurrencyChange = (facilityType: string, currency: string) => {
    setFacilities(facilities.map(f =>
      f.type === facilityType ? { ...f, currency } : f
    ));
  };

  const handleFacilitySpreadChange = (facilityType: string, spread: string) => {
    setFacilities(facilities.map(f =>
      f.type === facilityType ? { ...f, spread } : f
    ));
  };

  const handleFacilityTermChange = (facilityType: string, term: string) => {
    setFacilities(facilities.map(f =>
      f.type === facilityType ? { ...f, term } : f
    ));

    // Update amortization schedule for this facility when term changes
    const termYears = parseInt(term.split(' ')[0]);
    const evenPercentage = 100 / termYears;

    setFacilitySchedules(prevSchedules => {
      const existingScheduleIndex = prevSchedules.findIndex(fs => fs.facilityType === facilityType);

      if (existingScheduleIndex >= 0) {
        // Update existing schedule
        const updatedSchedules = [...prevSchedules];
        updatedSchedules[existingScheduleIndex] = {
          facilityType,
          schedule: Array(termYears).fill(evenPercentage)
        };
        return updatedSchedules;
      } else {
        // Add new schedule
        return [
          ...prevSchedules,
          { facilityType, schedule: Array(termYears).fill(evenPercentage) }
        ];
      }
    });
  };

  const handleCovenantTypeToggle = (covenantType: string, checked: boolean) => {
    if (checked) {
      setCovenants([...covenants, { type: covenantType, value: '', frequency: 'Quarterly' }]);
    } else {
      setCovenants(covenants.filter(c => c.type !== covenantType));
    }
  };

  const handleCovenantValueChange = (covenantType: string, value: string) => {
    setCovenants(covenants.map(c =>
      c.type === covenantType ? { ...c, value } : c
    ));
  };

  const handleCovenantFrequencyChange = (covenantType: string, frequency: string) => {
    setCovenants(covenants.map(c =>
      c.type === covenantType ? { ...c, frequency } : c
    ));
  };

  const getTermYears = () => {
    // Get the maximum term years from all facilities
    const termYears = facilities.map(f => {
      if (!f.term) return 0;
      return parseInt(f.term.split(' ')[0]);
    });
    return Math.max(...termYears, 0);
  };

  const handleFacilitySchedulesChange = (updatedSchedules: FacilitySchedule[]) => {
    setFacilitySchedules(updatedSchedules);
  };

  // Check if we should show the amortization schedule (when facilities with terms are selected)
  const shouldShowAmortizationSchedule = () => {
    return facilities.some(f => f.term) && facilities.length > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto py-4 px-4 max-w-4xl">
        {/* Main Grid */}
        <Card className="shadow-sm border-0 bg-white/600 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">{getFormTitle()}</CardTitle>
                <CardDescription className="text-gray-600">
                  Complete all required fields to finalize your term sheet
                </CardDescription>
              </div>
              <PDFGenerator fields={fields} formTitle={getFormTitle()} facilitySchedules={facilitySchedules} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <div className="grid grid-cols-1 gap-4">
                  {fields.map((field) => (
                    <FormFieldRenderer
                      key={field.id}
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
                  ))}

                  {/* Show amortization schedule when facilities with terms are selected */}
                  {shouldShowAmortizationSchedule() && (
                    <div className="w-full">
                      <AmortizationSchedule
                        termYears={getTermYears()}
                        facilities={facilities}
                        facilitySchedules={facilitySchedules}
                        onChange={handleFacilitySchedulesChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
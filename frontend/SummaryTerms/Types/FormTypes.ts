// Types/FormTypes.ts
export type FieldType =
    | 'number'
    | 'facilities'
    | 'covenants'
    | 'text'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'date'
    | 'borrowers';  // Added this type

export interface FieldData {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  value?: any;
  required?: boolean;
}

export interface TermSheetFormProps {
  fields: FieldData[];
  initialData?: any;
  onSubmit: (data: any) => void;
}

export interface FacilityData {
  type: string;
  amount: string;
  currency: string;
  spread: string;
  term?: string;
}

export interface CovenantData {
  type: string;
  value: string;
  frequency: string;
}

export interface FacilitySchedule {
  facilityType: string;
  schedule: number[];
}

export interface ArrangementFeeData {
  hasArrangementFee: boolean;
  amount: string;
  type: 'percentage' | 'fixed';
}

export interface BorrowerData {
  primaryBorrower: string;
  coBorrowers: string[];
}
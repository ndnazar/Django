import * as React from 'react';
import jsPDF from 'jspdf';
import { Button } from './UIComponents/button';
import { Download } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { PDFHeader } from './pdf/PDFHeader';
import { PDFMetadata } from './pdf/PDFMetadata';
import { PDFFieldsTable } from './pdf/PDFFieldsTable';
import { PDFFacilitiesTable } from './pdf/PDFFacilitiesTable';
import { PDFCovenantsTable } from './pdf/PDFCovenantsTable';
import { PDFAmortizationTable } from './pdf/PDFAmortizationTable';
import { PDFFooter } from './pdf/PDFFooter';

// Accept any field data structure that has the minimum required properties
interface PDFGeneratorProps {
  fields: Array<{
    id: string;
    type: string;
    label: string;
    value?: any;
    [key: string]: any; // Allow additional properties
  }>;
  formTitle: string;
  facilitySchedules?: Array<{
    facilityType: string;
    schedule: number[];
  }>;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ fields, formTitle, facilitySchedules = [] }) => {
  const generatePDF = async () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Add header
      yPosition = PDFHeader.render(pdf, formTitle, pageWidth, margin);

      // Add metadata
      yPosition = PDFMetadata.render(pdf, formTitle, pageWidth, pageHeight, margin, yPosition);

      // Add fields table
      yPosition = PDFFieldsTable.render(pdf, fields, pageWidth, pageHeight, margin, yPosition);

      // Add facilities table if present
      const facilitiesField = fields.find(f => f.id === 'facilities');
      if (facilitiesField?.value && Array.isArray(facilitiesField.value) && facilitiesField.value.length > 0) {
        yPosition = PDFFacilitiesTable.render(pdf, facilitiesField.value, pageWidth, pageHeight, margin, yPosition);
      }

      // Add covenants table if present
      const covenantsField = fields.find(f => f.id === 'covenants');
      if (covenantsField?.value && Array.isArray(covenantsField.value) && covenantsField.value.length > 0) {
        yPosition = PDFCovenantsTable.render(pdf, covenantsField.value, pageWidth, pageHeight, margin, yPosition);
      }

      // Add facility-specific amortization schedules if present
      if (facilitySchedules.length > 0) {
        facilitySchedules.forEach((facilitySchedule) => {
          yPosition = PDFAmortizationTable.render(pdf, facilitySchedule.schedule, pageWidth, pageHeight, margin, yPosition, facilitySchedule.facilityType);
        });
      }

      // Add footer
      PDFFooter.render(pdf, pageWidth, pageHeight, margin);

      // Save the PDF
      const fileName = `${formTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.pdf`;
      pdf.save(fileName);

      toast({
        title: "PDF Generated Successfully",
        description: `Your professionally formatted term sheet has been saved as ${fileName}`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error Generating PDF",
        description: "There was an error creating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const hasData = fields.some(field => field.value);

  return (
    <Button
      onClick={generatePDF}
      disabled={!hasData}
      className="flex items-center space-x-2"
      size="lg"
    >
      <Download className="h-4 w-4" />
      <span>Generate PDF</span>
    </Button>
  );
};

export default PDFGenerator;

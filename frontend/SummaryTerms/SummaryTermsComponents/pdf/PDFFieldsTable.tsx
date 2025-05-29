import jsPDF from 'jspdf';

interface FieldData {
  id: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date' | 'facilities' | 'covenants';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  value?: any;
  icon: React.ComponentType<any>;
}

export class PDFFieldsTable {
  static render(pdf: jsPDF, fields: FieldData[], pageWidth: number, pageHeight: number, margin: number, yPosition: number): number {
    const labelColumnWidth = 80;
    const valueColumnWidth = pageWidth - 2 * margin - labelColumnWidth;

    // Table header
    pdf.setFillColor(191, 219, 254); // Light blue background for header
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F');

    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(30, 64, 175); // Blue-800
    pdf.text('Field', margin + 5, yPosition + 10);
    pdf.text('Value', margin + labelColumnWidth + 5, yPosition + 10);

    // Draw header border
    pdf.setDrawColor(147, 197, 253); // Light blue border
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition + 15, pageWidth - margin, yPosition + 15);

    yPosition += 20;

    // Reset text color for content
    pdf.setTextColor(31, 41, 55); // Gray-800

    // Group and process fields
    const processedFields = fields.filter(field => field.value !== undefined && field.value !== '');

    processedFields.forEach((field, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;

        // Redraw table header on new page
        this.drawTableHeader(pdf, pageWidth, margin, yPosition, labelColumnWidth);
        yPosition += 20;
        pdf.setTextColor(31, 41, 55);
      }

      // Alternating row backgrounds
      if (index % 2 === 0) {
        pdf.setFillColor(248, 250, 252); // Very light gray
        pdf.rect(margin, yPosition - 2, pageWidth - 2 * margin, 18, 'F');
      }

      // Field label
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(55, 65, 81); // Gray-700
      const labelText = field.label;
      pdf.text(labelText, margin + 5, yPosition + 10);

      // Field value
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(17, 24, 39); // Gray-900

      const displayValue = this.formatFieldValue(field);

      // Handle text wrapping for values
      const valueStartX = margin + labelColumnWidth + 5;
      const maxValueWidth = valueColumnWidth - 10;
      const lines = pdf.splitTextToSize(displayValue, maxValueWidth);

      pdf.text(lines, valueStartX, yPosition + 10);

      // Row border
      pdf.setDrawColor(229, 231, 235); // Light gray
      pdf.setLineWidth(0.2);
      pdf.line(margin, yPosition + 16, pageWidth - margin, yPosition + 16);

      yPosition += 18;

      // Reset text color
      pdf.setTextColor(17, 24, 39);
    });

    return yPosition;
  }

  private static drawTableHeader(pdf: jsPDF, pageWidth: number, margin: number, yPosition: number, labelColumnWidth: number): void {
    pdf.setFillColor(191, 219, 254);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F');
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(30, 64, 175);
    pdf.text('Field', margin + 5, yPosition + 10);
    pdf.text('Value', margin + labelColumnWidth + 5, yPosition + 10);
    pdf.setDrawColor(147, 197, 253);
    pdf.line(margin, yPosition + 15, pageWidth - margin, yPosition + 15);
  }

  private static formatFieldValue(field: FieldData): string {
    // Handle different field types
    if (field.type === 'checkbox') {
      return field.value ? '✓ Yes' : '✗ No';
    } else if (field.type === 'date' && field.value) {
      return new Date(field.value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else if (field.type === 'number' && field.value) {
      return parseFloat(field.value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
    } else if (field.type === 'facilities' && field.value) {
      return 'See facilities table below';
    } else if (field.type === 'covenants' && field.value) {
      return 'See covenants table below';
    } else {
      return String(field.value || 'Not specified');
    }
  }
}